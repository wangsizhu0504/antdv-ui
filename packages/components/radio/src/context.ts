import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'
import type { RadioGroupContext, RadioOptionTypeContextProps } from './interface'

const radioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol('radioGroupContextKey')
export function useProvideRadioGroupContext(props: RadioGroupContext) {
  provide(radioGroupContextKey, props)
}

export function useInjectRadioGroupContext() {
  return inject(radioGroupContextKey, undefined)
}

const radioOptionTypeContextKey: InjectionKey<RadioOptionTypeContextProps> = Symbol(
  'radioOptionTypeContextKey',
)
export function useProvideRadioOptionTypeContext(props: RadioOptionTypeContextProps) {
  provide(radioOptionTypeContextKey, props)
}

export function useInjectRadioOptionTypeContext() {
  return inject(radioOptionTypeContextKey, undefined)
}
