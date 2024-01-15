// base rc-select 14.1.1
import type { DefaultOptionType, SelectProps } from './src/Select'
import VcSelect, { selectProps } from './src/Select'
import VcOption from './src/Option'
import VcOptGroup from './src/OptGroup'
import VcBaseSelect from './src/BaseSelect'
import type { BaseSelectProps, BaseSelectPropsWithoutPrivate, BaseSelectRef } from './src/BaseSelect'
import useBaseProps from './src/hooks/useBaseProps'

export {
  VcSelect,
  VcOption,
  VcOptGroup,
  selectProps as vcSelectProps,
  VcBaseSelect,
  useBaseProps,
}
export type {
  DefaultOptionType as VcSelectDefaultOptionType,
  BaseSelectProps,
  BaseSelectRef,
  BaseSelectPropsWithoutPrivate,
  SelectProps,
}
