import type { CheckboxProps } from './props'
import type { InjectionKey, Ref } from 'vue'
import type { VueNode } from '../_util/type'

export type CheckboxValueType = string | number | boolean
export interface CheckboxOptionType {
  label?: VueNode
  value: CheckboxValueType
  disabled?: boolean
  indeterminate?: boolean
  onChange?: (e: CheckboxChangeEvent) => void
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: MouseEvent
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean
}

export interface CheckboxGroupContext {
  cancelValue: (id: symbol) => void
  registerValue: (id: symbol, value: string) => void
  toggleOption: (option: CheckboxOptionType) => void
  name: Ref<string>
  disabled: Ref<boolean>
  mergedValue: Ref<CheckboxValueType[]>
}
export const CheckboxGroupContextKey: InjectionKey<CheckboxGroupContext>
  = Symbol('CheckboxGroupContext')
