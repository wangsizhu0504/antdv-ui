import type { Theme } from '@antdv/cssinjs';
import type { ComputedRef } from 'vue';
import type { AliasToken, GlobalToken, SeedToken } from './interface';
import type { DesignTokenContext } from './internal';
import { useCacheToken } from '@antdv/cssinjs';
import { version } from '@antdv/version';
import { computed, inject } from 'vue';
import { defaultConfig, defaultTheme, DesignTokenContextKey, globalDesignTokenApi } from './internal';
import defaultSeedToken from './themes/seed';
import formatToken from './util/alias';

export const unitless: {
  [key in keyof AliasToken]?: boolean;
} = {
  lineHeight: true,
  lineHeightSM: true,
  lineHeightLG: true,
  lineHeightHeading1: true,
  lineHeightHeading2: true,
  lineHeightHeading3: true,
  lineHeightHeading4: true,
  lineHeightHeading5: true,
  opacityLoading: true,
  fontWeightStrong: true,
  zIndexPopupBase: true,
  zIndexBase: true,
  opacityImage: true,
};

export const ignore: {
  [key in keyof AliasToken]?: boolean;
} = {
  size: true,
  sizeSM: true,
  sizeLG: true,
  sizeMD: true,
  sizeXS: true,
  sizeXXS: true,
  sizeMS: true,
  sizeXL: true,
  sizeXXL: true,
  sizeUnit: true,
  sizeStep: true,
  motionBase: true,
  motionUnit: true,
};

const preserve: {
  [key in keyof AliasToken]?: boolean;
} = {
  screenXS: true,
  screenXSMin: true,
  screenXSMax: true,
  screenSM: true,
  screenSMMin: true,
  screenSMMax: true,
  screenMD: true,
  screenMDMin: true,
  screenMDMax: true,
  screenLG: true,
  screenLGMin: true,
  screenLGMax: true,
  screenXL: true,
  screenXLMin: true,
  screenXLMax: true,
  screenXXL: true,
  screenXXLMin: true,
};

export function getComputedToken(
  originToken: SeedToken,
  overrideToken: DesignTokenContext['components'] & {
    override?: Partial<AliasToken>;
  },
  theme: Theme<any, any>,
) {
  const derivativeToken = theme.getDerivativeToken(originToken);

  const { override, ...components } = overrideToken;

  // Merge with override
  let mergedDerivativeToken = {
    ...derivativeToken,
    override,
  };

  // Format if needed
  mergedDerivativeToken = formatToken(mergedDerivativeToken);

  if (components) {
    Object.entries(components).forEach(([key, value]) => {
      const { theme: componentTheme, ...componentTokens } = value;
      let mergedComponentToken = componentTokens;
      if (componentTheme) {
        mergedComponentToken = getComputedToken(
          {
            ...mergedDerivativeToken,
            ...componentTokens,
          },
          {
            override: componentTokens,
          },
          componentTheme,
        );
      }
      mergedDerivativeToken[key] = mergedComponentToken;
    });
  }

  return mergedDerivativeToken;
}

// ================================== Hook ==================================
export default function useToken(): [
  theme: ComputedRef<Theme<SeedToken, AliasToken>>,
  token: ComputedRef<GlobalToken>,
  hashId: ComputedRef<string>,
  realToken: ComputedRef<GlobalToken>,
  cssVar?: ComputedRef<DesignTokenContext['cssVar']>,
] {
  const designTokenContext = inject<ComputedRef<DesignTokenContext>>(
    DesignTokenContextKey,
    computed(() => globalDesignTokenApi.value || defaultConfig),
  );

  const salt = computed(() => `${version}-${designTokenContext.value.hashed || ''}`);

  const mergedTheme = computed(() => designTokenContext.value.theme || defaultTheme);

  const cacheToken = useCacheToken<GlobalToken, SeedToken>(
    mergedTheme,
    computed(() => [defaultSeedToken, designTokenContext.value.token]),
    computed(() => ({
      salt: salt.value,
      override: designTokenContext.value.override,
      getComputedToken,
      // formatToken will not be consumed after 1.15.0 with getComputedToken.
      // But token will break if @ant-design/cssinjs is under 1.15.0 without it
      formatToken,
      cssVar: designTokenContext.value?.cssVar && {
        prefix: designTokenContext.value.cssVar.prefix,
        key: designTokenContext.value.cssVar.key,
        unitless,
        ignore,
        preserve,
      },
    })),
  );

  return [
    mergedTheme,
    computed(() => cacheToken.value[0]),
    computed(() => (designTokenContext.value.hashed ? cacheToken.value[1] : '')),
    computed(() => cacheToken.value[2]),
    computed(() => designTokenContext.value.cssVar),
  ];
}
