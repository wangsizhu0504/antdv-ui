import { computed, inject, provide } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { MenuProps } from './props'

// Used for Dropdown only
export interface OverrideContextProps {
  prefixCls?: ComputedRef<string>
  mode?: ComputedRef<MenuProps['mode']>
  selectable?: ComputedRef<boolean>
  validator?: (menuProps: Pick<MenuProps, 'mode'>) => void
  onClick?: () => void
  expandIcon?: ComputedRef<any>
}
export const OverrideContextKey: InjectionKey<OverrideContextProps> = Symbol('OverrideContextKey')
export function useInjectOverride() {
  return inject(OverrideContextKey, undefined)
}

export function useProvideOverride(props: OverrideContextProps) {
  const { prefixCls, mode, selectable, validator, onClick, expandIcon } = useInjectOverride() || {}
  provide(OverrideContextKey, {
    prefixCls: computed(() => (props.prefixCls?.value ?? prefixCls?.value) as string),
    mode: computed(() => props.mode?.value ?? mode?.value),
    selectable: computed(() => (props.selectable?.value ?? selectable?.value) as boolean),
    validator: props.validator ?? validator,
    onClick: props.onClick ?? onClick,
    expandIcon: props.expandIcon ?? expandIcon?.value,
  })
}
