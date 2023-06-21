import type { InjectionKey } from 'vue'
import { inject, provide, reactive, readonly } from 'vue'

interface CreateContextFnOptions {
  /**
   * @description Whether the injected variable is writable or not
   * @default false
   */
  writeable?: boolean
  /**
   * @description Does the data need to be responsive
   * @default true
   */
  reactiveable?: boolean
}

function createContextFn<T>(
  key: InjectionKey<T> = Symbol('InjectionKey'),
  context: any,
  options: CreateContextFnOptions = {},
) {
  const { writeable = false, reactiveable = true } = options

  const reactiveContext = reactive(context)
  let provideData: T
  if (!reactiveable)
    provideData = context
  else
    provideData = !writeable ? readonly(reactiveContext) : reactiveContext

  provide(key, provideData)
}

function useContext<T>(key: InjectionKey<T> = Symbol('InjectionKey'), defaultValue?: any): T {
  return inject(key, defaultValue || {})
}

export { createContextFn, type CreateContextFnOptions, useContext }
