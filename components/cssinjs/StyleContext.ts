import type { InjectionKey, PropType, Ref, ShallowRef } from 'vue'
import { defineComponent, inject, provide, shallowRef, unref, watch } from 'vue'
import CacheEntity from './Cache'
import type { Linter } from './linters/interface'
import type { Transformer } from './transformers/interface'
import { withInstall } from './util'

export const ATTR_TOKEN = 'data-token-hash'
export const ATTR_MARK = 'data-css-hash'
export const ATTR_DEV_CACHE_PATH = 'data-dev-cache-path'

// Mark css-in-js instance in style element
export const CSS_IN_JS_INSTANCE = '__cssinjs_instance__'
export const CSS_IN_JS_INSTANCE_ID = Math.random().toString(12).slice(2)

export function createCache() {
  if (typeof document !== 'undefined' && document.head && document.body) {
    const styles = document.body.querySelectorAll(`style[${ATTR_MARK}]`) || []
    const { firstChild } = document.head

    Array.from(styles).forEach((style) => {
      (style as any)[CSS_IN_JS_INSTANCE]
        = (style as any)[CSS_IN_JS_INSTANCE] || CSS_IN_JS_INSTANCE_ID

      // Not force move if no head
      document.head.insertBefore(style, firstChild)
    })

    // Deduplicate of moved styles
    const styleHash: Record<string, boolean> = {}
    Array.from(document.querySelectorAll(`style[${ATTR_MARK}]`)).forEach((style) => {
      const hash = style.getAttribute(ATTR_MARK)!
      if (styleHash[hash]) {
        if ((style as any)[CSS_IN_JS_INSTANCE] === CSS_IN_JS_INSTANCE_ID)
          style.parentNode?.removeChild(style)
      } else {
        styleHash[hash] = true
      }
    })
  }

  return new CacheEntity()
}

export type HashPriority = 'low' | 'high'

export interface StyleContextProps {
  autoClear?: boolean
  /** @private Test only. Not work in production. */
  mock?: 'server' | 'client'
  /**
   * Only set when you need ssr to extract style on you own.
   * If not provided, it will auto create <style /> on the end of Provider in server side.
   */
  cache: CacheEntity
  /** Tell children that this context is default generated context */
  defaultCache: boolean
  /** Use `:where` selector to reduce hashId css selector priority */
  hashPriority?: HashPriority
  /** Tell cssinjs where to inject style in */
  container?: Element | ShadowRoot
  /** Component wil render inline  `<style />` for fallback in SSR. Not recommend. */
  ssrInline?: boolean
  /** Transform css before inject in document. Please note that `transformers` do not support dynamic update */
  transformers?: Transformer[]
  /**
   * Linters to lint css before inject in document.
   * Styles will be linted after transforming.
   * Please note that `linters` do not support dynamic update.
   */
  linters?: Linter[]
}

const StyleContextKey: InjectionKey<ShallowRef<Partial<StyleContextProps>>>
  = Symbol('StyleContextKey')

export type UseStyleProviderProps = Partial<StyleContextProps> | Ref<Partial<StyleContextProps>>
const defaultStyleContext: StyleContextProps = {
  cache: createCache(),
  defaultCache: true,
  hashPriority: 'low',
}
export const useStyleInject = () => {
  return inject(StyleContextKey, shallowRef({ ...defaultStyleContext }))
}
export const useStyleProvider = (props: UseStyleProviderProps) => {
  const parentContext = useStyleInject()
  const context = shallowRef<Partial<StyleContextProps>>({ ...defaultStyleContext })
  watch(
    [props, parentContext],
    () => {
      const mergedContext: Partial<StyleContextProps> = {
        ...parentContext.value,
      }
      const propsValue = unref(props)
      Object.keys(propsValue).forEach((key) => {
        const value = propsValue[key]
        if (propsValue[key] !== undefined)
          mergedContext[key] = value
      })

      const { cache } = propsValue
      mergedContext.cache = mergedContext.cache || createCache()
      mergedContext.defaultCache = !cache && parentContext.value.defaultCache
      context.value = mergedContext
    },
    { immediate: true },
  )
  provide(StyleContextKey, context)
  return context
}
export interface StyleProviderProps {
  autoClear?: boolean
  /** @private Test only. Not work in production. */
  mock?: 'server' | 'client'
  /**
   * Only set when you need ssr to extract style on you own.
   * If not provided, it will auto create <style /> on the end of Provider in server side.
   */
  cache?: CacheEntity
  /** Tell children that this context is default generated context */
  defaultCache?: boolean
  /** Use `:where` selector to reduce hashId css selector priority */
  hashPriority?: HashPriority
  /** Tell cssinjs where to inject style in */
  container?: Element | ShadowRoot
  /** Component wil render inline  `<style />` for fallback in SSR. Not recommend. */
  ssrInline?: boolean
  /** Transform css before inject in document. Please note that `transformers` do not support dynamic update */
  transformers?: Transformer[]
  /**
   * Linters to lint css before inject in document.
   * Styles will be linted after transforming.
   * Please note that `linters` do not support dynamic update.
   */
  linters?: Linter[]
}
export const StyleProvider = withInstall(defineComponent({
  name: 'AStyleProvider',
  inheritAttrs: false,
  props: {
    autoClear: Boolean,
    mock: String as PropType<StyleProviderProps['mock']>,
    cache: {
      type: Object as PropType<StyleProviderProps['cache']>,
      default: () => createCache(),
    },
    hashPriority: {
      type: String as PropType<StyleProviderProps['hashPriority']>,
      default: 'low',
    },
    container: Object as PropType<StyleProviderProps['container']>,
    ssrInline: Boolean,
    transformers: Array as PropType<StyleProviderProps['transformers']>,
    linters: Array as PropType<StyleProviderProps['linters']>,
    defaultCache: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    useStyleProvider(props)
    return () => slots.default?.()
  },
}))

export default {
  useStyleInject,
  useStyleProvider,
  StyleProvider,
}
