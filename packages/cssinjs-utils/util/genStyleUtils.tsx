import type { AbstractCalculator, CSSInterpolation, CSSObject, TokenType } from '@antdv/cssinjs';

import type { PropType, Ref, VNode } from 'vue';

import type { UseCSP } from '../hooks/useCSP';

import type { UsePrefix } from '../hooks/usePrefix';

import type { UseToken } from '../hooks/useToken';
import type {
  ComponentTokenKey,
  GlobalTokenWithComponent,
  TokenMap,
  TokenMapKey,
  UseComponentStyleResult,
} from '../interface';
import { genCalc, token2CSSVar, useCSSVarRegister, useStyleRegister } from '@antdv/cssinjs';
import { computed, defineComponent } from 'vue';
import useDefaultCSP from '../hooks/useCSP';

import getComponentToken from './getComponentToken';
import getCompVarPrefix from './getCompVarPrefix';
import getDefaultComponentToken from './getDefaultComponentToken';
import genMaxMin from './maxmin';
import statisticToken, { merge as mergeToken } from './statistic';

type LayerConfig = Parameters<typeof useStyleRegister>[0]['value']['layer'];

export interface StyleInfo {
  hashId: string;
  prefixCls: string;
  rootPrefixCls: string;
  iconPrefixCls: string;
}

export interface CSSUtil {
  calc: (number: any) => AbstractCalculator;
  max: (...values: Array<number | string>) => number | string;
  min: (...values: Array<number | string>) => number | string;
}

export type TokenWithCommonCls<T> = T & {
  /** Wrap component class with `.` prefix */
  componentCls: string;
  /** Origin prefix which do not have `.` prefix */
  prefixCls: string;
  /** Wrap icon class with `.` prefix */
  iconCls: string;
  /** Wrap ant prefixCls class with `.` prefix */
  antCls: string;
} & CSSUtil;

export type FullToken<
  CompTokenMap extends TokenMap,
  AliasToken extends TokenType,
  C extends TokenMapKey<CompTokenMap>,
> = TokenWithCommonCls<GlobalTokenWithComponent<CompTokenMap, AliasToken, C>>;

export type GenStyleFn<
  CompTokenMap extends TokenMap,
  AliasToken extends TokenType,
  C extends TokenMapKey<CompTokenMap>,
> = (token: FullToken<CompTokenMap, AliasToken, C>, info: StyleInfo) => CSSInterpolation;

export type GetDefaultTokenFn<
  CompTokenMap extends TokenMap,
  AliasToken extends TokenType,
  C extends TokenMapKey<CompTokenMap>,
> = (token: AliasToken & Partial<CompTokenMap[C]>) => CompTokenMap[C];

export type GetDefaultToken<
  CompTokenMap extends TokenMap,
  AliasToken extends TokenType,
  C extends TokenMapKey<CompTokenMap>,
> = null | CompTokenMap[C] | GetDefaultTokenFn<CompTokenMap, AliasToken, C>;

export interface SubStyleComponentProps {
  prefixCls: string;
  rootCls?: string;
}

export interface CSSVarRegisterProps {
  rootCls: string;
  component: string;
  cssVar: {
    prefix?: string;
    key?: string;
  };
}

interface GetResetStylesConfig {
  prefix: ReturnType<UsePrefix>;
  csp: ReturnType<UseCSP>
}

export type GetResetStyles<AliasToken extends TokenType> = (token: AliasToken, config?: GetResetStylesConfig) => CSSInterpolation;

export type GetCompUnitless<CompTokenMap extends TokenMap, AliasToken extends TokenType> = <
  C extends TokenMapKey<CompTokenMap>,
>(
  component: C | [C, string],
) => Partial<Record<ComponentTokenKey<CompTokenMap, AliasToken, C>, boolean>>;

function genStyleUtils<
  CompTokenMap extends TokenMap,
  AliasToken extends TokenType,
  DesignToken extends TokenType,
>(config: {
  usePrefix: UsePrefix;
  useToken: UseToken<CompTokenMap, AliasToken, DesignToken>;
  useCSP?: UseCSP;
  getResetStyles?: GetResetStyles<AliasToken>;
  getCommonStyle?: (
    token: AliasToken,
    componentPrefixCls: string,
    rootCls?: string,
    resetFont?: boolean,
  ) => CSSObject;
  getCompUnitless?: GetCompUnitless<CompTokenMap, AliasToken>;
  layer?: LayerConfig;
}) {
  // Dependency inversion for preparing basic config.
  const {
    useCSP = useDefaultCSP,
    useToken,
    usePrefix,
    getResetStyles,
    getCommonStyle,
    getCompUnitless,
  } = config;

  function genStyleHooks<C extends TokenMapKey<CompTokenMap>>(
    component: C | [C, string],
    styleFn: GenStyleFn<CompTokenMap, AliasToken, C>,
    getDefaultToken?: GetDefaultToken<CompTokenMap, AliasToken, C>,
    options?: {
      resetStyle?: boolean;
      resetFont?: boolean;
      deprecatedTokens?: Array<[
        ComponentTokenKey<CompTokenMap, AliasToken, C>,
        ComponentTokenKey<CompTokenMap, AliasToken, C>,
      ]>;
      /**
       * Component tokens that do not need unit.
       */
      unitless?: Partial<Record<ComponentTokenKey<CompTokenMap, AliasToken, C>, boolean>>;
      /**
       * Only use component style in client side. Ignore in SSR.
       */
      clientOnly?: boolean;
      /**
       * Set order of component style.
       * @default -999
       */
      order?: number;
      /**
       * Whether generate styles
       * @default true
       */
      injectStyle?: boolean;
    },
  ) {
    const componentName = Array.isArray(component) ? component[0] : component;

    function prefixToken(key: string) {
      return `${String(componentName)}${key.slice(0, 1).toUpperCase()}${key.slice(1)}`;
    }

    // Fill unitless
    const originUnitless = options?.unitless || {};

    const originCompUnitless
      = typeof getCompUnitless === 'function' ? getCompUnitless(component) : {};

    const compUnitless: any = {
      ...originCompUnitless,
      [prefixToken('zIndexPopup')]: true,
    };
    Object.keys(originUnitless).forEach((key) => {
      compUnitless[prefixToken(key)]
        = originUnitless[key as keyof ComponentTokenKey<CompTokenMap, AliasToken, C>];
    });

    // Options
    const mergedOptions = {
      ...options,
      unitless: compUnitless,
      prefixToken,
    };

    // Hooks
    const useStyle = genComponentStyleHook(component, styleFn, getDefaultToken, mergedOptions);

    const useCSSVar = genCSSVarRegister(componentName, getDefaultToken, mergedOptions);

    return (prefixCls: Ref<string>, rootCls: Ref<string> = prefixCls) => {
      const [, hashId] = useStyle(prefixCls, rootCls);
      const [wrapCSSVar, cssVarCls] = useCSSVar(rootCls);

      return [wrapCSSVar, hashId, cssVarCls] as const;
    };
  }

  function genCSSVarRegister<C extends TokenMapKey<CompTokenMap>>(
    component: C,
    getDefaultToken: GetDefaultToken<CompTokenMap, AliasToken, C> | undefined,
    options: {
      unitless?: Partial<Record<ComponentTokenKey<CompTokenMap, AliasToken, C>, boolean>>;
      ignore?: Partial<Record<keyof AliasToken, boolean>>
      deprecatedTokens?: Array<[
        ComponentTokenKey<CompTokenMap, AliasToken, C>,
        ComponentTokenKey<CompTokenMap, AliasToken, C>,
      ]>;
      injectStyle?: boolean;
      prefixToken: (key: string) => string;
    },
  ) {
    const { unitless: compUnitless, injectStyle = true, prefixToken, ignore } = options;

    const CSSVarRegister = defineComponent({
      name: 'CSSVarRegister',
      props: {
        rootCls: {
          type: String,
          require: true,
        },
        component: {
          type: String,
          require: true,
        },
        cssVar: {
          type: Object as PropType<CSSVarRegisterProps['cssVar']>,
          default: () => ({} as CSSVarRegisterProps['cssVar']),
        },
      },
      setup: (props) => {
        const { realToken } = useToken();
        useCSSVarRegister(
          computed(() => ({
            path: [component],
            prefix: props.cssVar.prefix,
            key: props.cssVar.key!,
            unitless: compUnitless,
            ignore,
            token: realToken.value,
            scope: props.rootCls,
          })),
          () => {
            const defaultToken = getDefaultComponentToken<CompTokenMap, AliasToken, C>(
              component,
              realToken.value,
              getDefaultToken,
            );
            const componentToken = getComponentToken<CompTokenMap, AliasToken, C>(
              component,
              realToken.value,
              defaultToken,
              {
                deprecatedTokens: options?.deprecatedTokens,
              },
            );
            Object.keys(defaultToken).forEach((key) => {
              componentToken[prefixToken(key)] = componentToken[key];
              delete componentToken[key];
            });
            return componentToken;
          },
        );
        return () => null;
      },
    });
    const useCSSVar = (rootCls: Ref<string>) => {
      const { cssVar } = useToken();

      return [
        (node: VNode): VNode =>
          injectStyle && cssVar
            ? (
                <>
                  <CSSVarRegister rootCls={rootCls.value} cssVar={cssVar} component={component} />
                  {node}
                </>
              )
            : (
                node
              ),
        cssVar?.key,
      ] as const;
    };

    return useCSSVar;
  }

  function genComponentStyleHook<C extends TokenMapKey<CompTokenMap>>(
    componentName: C | [C, string],
    styleFn: GenStyleFn<CompTokenMap, AliasToken, C>,
    getDefaultToken?: GetDefaultToken<CompTokenMap, AliasToken, C>,
    options: {
      resetStyle?: boolean;
      resetFont?: boolean;
      // Deprecated token key map [["oldTokenKey", "newTokenKey"], ["oldTokenKey", "newTokenKey"]]
      deprecatedTokens?: Array<[
        ComponentTokenKey<CompTokenMap, AliasToken, C>,
        ComponentTokenKey<CompTokenMap, AliasToken, C>,
      ]>;
      /**
       * Only use component style in client side. Ignore in SSR.
       */
      clientOnly?: boolean;
      /**
       * Set order of component style. Default is -999.
       */
      order?: number;
      injectStyle?: boolean;
      unitless?: Partial<Record<ComponentTokenKey<CompTokenMap, AliasToken, C>, boolean>>;
    } = {},
  ) {
    const cells = (
      Array.isArray(componentName) ? componentName : [componentName, componentName]
    ) as [C, string];

    const [component] = cells;
    const concatComponent = cells.join('-');

    const mergedLayer = config.layer || {
      name: 'antd',
    };

    // Return new style hook
    return (prefixCls: Ref<string>, rootCls: Ref<string> = prefixCls): UseComponentStyleResult => {
      const { theme, realToken, hashId, token, cssVar } = useToken();

      const { rootPrefixCls, iconPrefixCls } = usePrefix();
      const csp = useCSP();

      const type = cssVar ? 'css' : 'js';

      // Use unique memo to share the result across all instances
      const calc = computed(() => {
        const unitlessCssVar = new Set<string>();
        if (cssVar) {
          Object.keys(options.unitless || {}).forEach((key) => {
            // Some component proxy the AliasToken (e.g. Image) and some not (e.g. Modal)
            // We should both pass in `unitlessCssVar` to make sure the CSSVar can be unitless.
            unitlessCssVar.add(token2CSSVar(key, cssVar.prefix));
            unitlessCssVar.add(token2CSSVar(key, getCompVarPrefix(component, cssVar.prefix)));
          });
        }

        return genCalc(type, unitlessCssVar);
      });

      const { max, min } = genMaxMin(type);

      // Shared config
      const sharedConfig = computed((): Omit<Parameters<typeof useStyleRegister>[0]['value'], 'path'> => {
        return {
          theme: theme.value,
          token: token.value,
          hashId: hashId.value,
          nonce: () => csp.nonce!,
          clientOnly: options.clientOnly,
          layer: mergedLayer,

          // antd is always at top of styles
          order: options.order || -999,
        };
      });

      // This if statement is safe, as it will only be used if the generator has the function. It's not dynamic.
      if (typeof getResetStyles === 'function') {
        // Generate style for all need reset tags.
        useStyleRegister(
          computed(() => ({ ...sharedConfig.value, clientOnly: false, path: ['Shared', rootPrefixCls.value] })),
          () => getResetStyles(token.value, { prefix: { rootPrefixCls, iconPrefixCls }, csp }),
        );
      }

      const wrapSSR = useStyleRegister(
        computed(() => ({ ...sharedConfig.value, path: [concatComponent, prefixCls.value, iconPrefixCls.value] })),
        () => {
          if (options.injectStyle === false) {
            return [];
          }

          const { token: proxyToken, flush } = statisticToken(token.value);

          const defaultComponentToken = getDefaultComponentToken<CompTokenMap, AliasToken, C>(
            component,
            realToken.value,
            getDefaultToken,
          );

          const componentCls = `.${prefixCls.value}`;
          const componentToken = getComponentToken<CompTokenMap, AliasToken, C>(
            component,
            realToken.value,
            defaultComponentToken,
            { deprecatedTokens: options.deprecatedTokens },
          );

          if (cssVar && defaultComponentToken && typeof defaultComponentToken === 'object') {
            Object.keys(defaultComponentToken).forEach((key) => {
              defaultComponentToken[key] = `var(${token2CSSVar(
                key,
                getCompVarPrefix(component, cssVar.prefix),
              )})`;
            });
          }
          const mergedToken = mergeToken<any>(
            proxyToken,
            {
              componentCls,
              prefixCls: prefixCls.value,
              iconCls: `.${iconPrefixCls.value}`,
              antCls: `.${rootPrefixCls.value}`,
              calc: calc.value,
              max,
              min,
            },
            cssVar ? defaultComponentToken : componentToken,
          );

          const styleInterpolation = styleFn(mergedToken, {
            hashId: hashId.value,
            prefixCls: prefixCls.value,
            rootPrefixCls: rootPrefixCls.value,
            iconPrefixCls: iconPrefixCls.value,
          });
          flush(component, componentToken);
          const commonStyle
            = typeof getCommonStyle === 'function'
              ? getCommonStyle(mergedToken, prefixCls.value, rootCls.value, options.resetFont)
              : null;
          return [options.resetStyle === false ? null : commonStyle, styleInterpolation];
        },
      );

      return [wrapSSR, hashId];
    };
  }

  function genSubStyleComponent<C extends TokenMapKey<CompTokenMap>>(
    componentName: C | [C, string],
    styleFn: GenStyleFn<CompTokenMap, AliasToken, C>,
    getDefaultToken?: GetDefaultToken<CompTokenMap, AliasToken, C>,
    options: {
      resetStyle?: boolean;
      resetFont?: boolean;
      // Deprecated token key map [["oldTokenKey", "newTokenKey"], ["oldTokenKey", "newTokenKey"]]
      deprecatedTokens?: Array<[
        ComponentTokenKey<CompTokenMap, AliasToken, C>,
        ComponentTokenKey<CompTokenMap, AliasToken, C>,
      ]>;
      /**
       * Only use component style in client side. Ignore in SSR.
       */
      clientOnly?: boolean;
      /**
       * Set order of component style. Default is -999.
       */
      order?: number;
      injectStyle?: boolean;
      unitless?: Partial<Record<ComponentTokenKey<CompTokenMap, AliasToken, C>, boolean>>;
    } = {},
  ) {
    const useStyle = genComponentStyleHook(componentName, styleFn, getDefaultToken, {
      resetStyle: false,

      // Sub Style should default after root one
      order: -998,
      ...options,
    });

    const StyledComponent = defineComponent({
      name: 'StyledComponent',
      props: {
        prefixCls: {
          type: String,
          required: true,
        },
        rootCls: String,
      },
      setup(props) {
        useStyle(computed(() => props.prefixCls), computed(() => props.rootCls ?? props.prefixCls));
        return () => null;
      },
    });

    if (process.env.NODE_ENV !== 'production') {
      StyledComponent.displayName = `SubStyle_${String(
        Array.isArray(componentName) ? componentName.join('.') : componentName,
      )}`;
    }

    return StyledComponent;
  }

  return { genStyleHooks, genSubStyleComponent, genComponentStyleHook };
}

export default genStyleUtils;
