import type { ComputedRef, InjectionKey } from 'vue'

import type { Theme } from '../cssinjs'
import type { AliasToken, GlobalToken, MapToken, OverrideToken, SeedToken } from './interface'
import { objectType } from '@antdv/utils'
import { version } from '@antdv/version'
import {
  computed,
  defineComponent,
  inject,
  provide,
  shallowRef,
  triggerRef,
  unref,
  watch,
} from 'vue'

import { createTheme, useCacheToken } from '../cssinjs'
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
const DesignTokenContextKey: InjectionKey<ComputedRef<DesignTokenContext>> = Symbol('DesignTokenContext')

export const globalDesignTokenApi = shallowRef<DesignTokenContext>()

export function useDesignTokenProvider(value: ComputedRef<DesignTokenContext>) {
  provide(DesignTokenContextKey, value)
  watch(
    value,
    () => {
      globalDesignTokenApi.value = unref(value)
      triggerRef(globalDesignTokenApi)
    },
    { immediate: true, deep: true },
  )
}

export function useDesignTokenInject() {
  return inject(
    DesignTokenContextKey,
    computed(() => globalDesignTokenApi.value || defaultConfig),
  )
}
export const DesignTokenProvider = defineComponent({
  props: {
    value: objectType<DesignTokenContext>(),
  },
  setup(props, { slots }) {
    useDesignTokenProvider(computed(() => props.value))
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
  const designTokenContext = inject<ComputedRef<DesignTokenContext>>(
    DesignTokenContextKey,
    computed(() => globalDesignTokenApi.value || defaultConfig),
  )

  const salt = computed(() => `${version}-${designTokenContext.value.hashed || ''}`)

  const mergedTheme = computed(() => designTokenContext.value.theme || defaultTheme)

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
  )

  return [
    mergedTheme,
    computed(() => cacheToken.value[0]),
    computed(() => (designTokenContext.value.hashed ? cacheToken.value[1] : '')),
  ]
}
