import type { Theme } from '@antdv/cssinjs';

import type { ComputedRef, InjectionKey } from 'vue';
import type { AliasToken, GlobalToken, MapToken, OverrideToken, SeedToken } from './interface';
import { useCacheToken } from '@antdv/cssinjs';
import { objectType } from '@antdv/utils';
import { version } from '@antdv/version';

import {
  computed,
  defineComponent,
  inject,
  provide,
  shallowRef,
  triggerRef,
  unref,
  watch,
} from 'vue';
import defaultTheme from './themes/default/theme';
import defaultSeedToken from './themes/seed';

import formatToken from './util/alias';
export { defaultTheme };
// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const defaultConfig = {
  token: defaultSeedToken,
  override: { override: defaultSeedToken },
  hashed: true,
};

export type ComponentsToken = {
  [key in keyof OverrideToken]?: OverrideToken[key] & {
    theme?: Theme<SeedToken, MapToken>;
  };
};

export interface DesignTokenProviderProps {
  token: Partial<AliasToken>;
  theme?: Theme<SeedToken, MapToken>;
  components?: ComponentsToken;
  /** Just merge `token` & `override` at top to save perf */
  override: { override: Partial<AliasToken> } & ComponentsToken;
  hashed?: string | boolean;
  cssVar?: {
    prefix?: string;
    key?: string;
  };
}

// defaultConfig
const DesignTokenContextKey: InjectionKey<ComputedRef<DesignTokenProviderProps>> = Symbol('DesignTokenContext');

export const globalDesignTokenApi = shallowRef<DesignTokenProviderProps>();

export function useDesignTokenProvider(value: ComputedRef<DesignTokenProviderProps>) {
  provide(DesignTokenContextKey, value);
  watch(
    value,
    () => {
      globalDesignTokenApi.value = unref(value);
      triggerRef(globalDesignTokenApi);
    },
    { immediate: true, deep: true },
  );
}

export function useDesignTokenInject() {
  return inject(
    DesignTokenContextKey,
    computed(() => globalDesignTokenApi.value || defaultConfig as DesignTokenProviderProps),
  );
}
export const DesignTokenProvider = defineComponent({
  props: {
    value: objectType<DesignTokenProviderProps>(),
  },
  setup(props, { slots }) {
    useDesignTokenProvider(computed(() => props.value));
    return () => {
      return slots.default?.();
    };
  },
});
// ================================== Hook ==================================
export function useToken(): [
  ComputedRef<Theme<SeedToken, MapToken>>,
  ComputedRef<GlobalToken>,
  ComputedRef<string>,
] {
  const designTokenContext = inject<ComputedRef<DesignTokenProviderProps>>(
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
      override: {
        override: designTokenContext.value.token,
        ...designTokenContext.value.components,
      },
      formatToken,
    })),
  );

  return [
    mergedTheme,
    computed(() => cacheToken.value[0]),
    computed(() => (designTokenContext.value.hashed ? cacheToken.value[1] : '')),
  ];
}
