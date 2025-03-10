import type { Ref } from 'vue';
import type { TokenWithCSSVar } from '../util/css-variables';
import type { ExtractStyle } from './useGlobalCache';
import { removeCSS, updateCSS } from '@antdv/utils';
import { computed } from 'vue';
import {
  ATTR_MARK,
  ATTR_TOKEN,
  CSS_IN_JS_INSTANCE,
  useStyleInject,
} from '../StyleContext';
import { isClientSide, toStyleStr } from '../util';
import { transformToken } from '../util/css-variables';
import useGlobalCache from './useGlobalCache';
import { uniqueHash } from './useStyleRegister';

export const CSS_VAR_PREFIX = 'cssVar';

type CSSVarCacheValue<V, T extends Record<string, V> = Record<string, V>> = [
  cssVarToken: TokenWithCSSVar<V, T>,
  cssVarStr: string,
  styleId: string,
  cssVarKey: string,
];

function useCSSVarRegister<V, T extends Record<string, V>>(config: Ref<{
  path: string[];
  key: string;
  prefix?: string;
  unitless?: Record<string, boolean>;
  ignore?: Record<string, boolean>;
  scope?: string;
  token: any;
}>, fn: () => T) {
  // const { key, prefix, unitless, ignore, token, scope = '' } = config;
  const styleContext = useStyleInject();
  const tokenKey = computed(() => config.value.token._tokenKey as string);

  const stylePath = computed(() => [
    ...config.value.path,
    config.value.key,
    config.value.scope || '',
    tokenKey.value,
  ]);

  const cache = useGlobalCache<CSSVarCacheValue<V, T>>(
    CSS_VAR_PREFIX,
    stylePath,
    () => {
      const { key, prefix, unitless, ignore, scope = '' } = config.value;
      const originToken = fn();
      const [mergedToken, cssVarsStr] = transformToken<V, T>(originToken, config.value.key, {
        prefix,
        unitless,
        ignore,
        scope,
      });
      const styleId = uniqueHash(stylePath.value, cssVarsStr);
      if (cssVarsStr) {
        const style = updateCSS(cssVarsStr, styleId, {
          mark: ATTR_MARK,
          prepend: 'queue',
          attachTo: styleContext.value?.container,
          priority: -999,
        });

        (style as any)[CSS_IN_JS_INSTANCE] = styleContext.value?.cache.instanceId;

        // Used for `useCacheToken` to remove on batch when token removed
        style.setAttribute(ATTR_TOKEN, key);
      }

      return [mergedToken, cssVarsStr, styleId, key];
    },
    ([, , styleId]) => {
      if (isClientSide) {
        removeCSS(styleId, { mark: ATTR_MARK, attachTo: styleContext.value.container });
      }
    },
  );

  return cache;
}
export const extract: ExtractStyle<CSSVarCacheValue<any>> = (
  cache,
  _effectStyles,
  options,
) => {
  const [, styleStr, styleId, cssVarKey] = cache;
  const { plain } = options || {};

  if (!styleStr) {
    return null;
  }

  const order = -999;

  // ====================== Style ======================
  const sharedAttrs = {
    'data-vc-order': 'prependQueue',
    'data-vc-priority': `${order}`,
  };

  const styleText = toStyleStr(
    styleStr,
    cssVarKey,
    styleId,
    sharedAttrs,
    plain,
  );

  return [order, styleId, styleText];
};

export default useCSSVarRegister;
