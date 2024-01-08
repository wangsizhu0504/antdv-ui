// base rc-select 14.1.1

// import type { BaseSelectProps, BaseSelectPropsWithoutPrivate, BaseSelectRef } from './src/BaseSelect'
import type { BaseSelectProps, BaseSelectRef } from './src/BaseSelect'

import type { DefaultOptionType, SelectProps } from './src/Select'

export type { OptionProps } from './src/Option'

export type {
  DefaultOptionType as DefaultVcSelectOptionType,
  BaseSelectProps,
  BaseSelectRef,
  //   BaseSelectPropsWithoutPrivate,
  SelectProps,
}
export { selectProps as vcSelectProps } from './src/Select'

export { default as VcSelect } from './src/Select'
export { default as VcSelectOption } from './src/Option'
export { default as VcSelectOptGroup } from './src/OptGroup'
export { default as VcBaseSelect } from './src/BaseSelect'
export { default as useBaseProps } from './src/hooks/useBaseProps'
