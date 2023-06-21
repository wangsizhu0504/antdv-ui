import type { ComputedRef, InjectionKey } from 'vue'
import { computed, defineComponent, inject, provide, ref, watchEffect } from 'vue'

import { toReactive } from '@vueuse/core'
import { createTheme, useCacheToken } from '../cssinjs'
import type { Theme } from '../cssinjs'
import { version } from '../version'
import { objectType } from '../_util/type'
import type {
  AliasToken,
  GlobalToken,
  MapToken,
  OverrideToken,
  SeedToken,
} from './interface'

import defaultDerivative from './themes/default'
import defaultSeedToken from './themes/seed'
import formatToken from './util/alias'

const defaultTheme = createTheme(defaultDerivative)

// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const defaultConfig = {
  token: defaultSeedToken,
  hashed: true,
}

export interface DesignTokenContext {
  token: Partial<AliasToken>
  theme?: Theme<SeedToken, MapToken>
  components?: OverrideToken
  hashed?: string | boolean
}
// defaultConfig
const DesignTokenContextKey: InjectionKey<DesignTokenContext> = Symbol('DesignTokenContext')

export const globalDesignTokenApi = ref<DesignTokenContext>()

export const useDesignTokenProvider = (value: DesignTokenContext) => {
  provide(DesignTokenContextKey, value)
  watchEffect(() => {
    globalDesignTokenApi.value = value
  })
}

export const useDesignTokenInject = () => {
  return inject(DesignTokenContextKey, globalDesignTokenApi.value || defaultConfig)
}
export const DesignTokenProvider = defineComponent({
  props: {
    value: objectType<DesignTokenContext>(),
  },
  setup(props, { slots }) {
    useDesignTokenProvider(toReactive(computed(() => props.value)))
    return () => {
      return slots.default?.()
    }
  },
})
// ================================== Hook ==================================
export function useToken(): [
  ComputedRef<Theme<SeedToken, MapToken>>,
  ComputedRef<GlobalToken>,
  ComputedRef<string>,
] {
  const designTokenContext = inject<DesignTokenContext>(
    DesignTokenContextKey,
    globalDesignTokenApi.value || defaultConfig,
  )

  const salt = computed(() => `${version}-${designTokenContext.hashed || ''}`)

  const mergedTheme = computed(() => designTokenContext.theme || defaultTheme)

  const cacheToken = useCacheToken<GlobalToken, SeedToken>(
    mergedTheme,
    computed(() => [defaultSeedToken, designTokenContext.token]),
    computed(() => ({
      salt: salt.value,
      override: { override: designTokenContext.token, ...designTokenContext.components },
      formatToken,
    })),
  )

  return [
    mergedTheme,
    computed(() => cacheToken.value[0]),
    computed(() => (designTokenContext.hashed ? cacheToken.value[1] : '')),
  ]
}
