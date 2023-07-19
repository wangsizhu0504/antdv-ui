// base rc-select 14.1.1
import Select, { selectProps } from './Select'
import Option from './Option'
import OptGroup from './OptGroup'
import BaseSelect from './BaseSelect'
import useBaseProps from './hooks/useBaseProps'
import type { BaseSelectProps, BaseSelectPropsWithoutPrivate, BaseSelectRef } from './BaseSelect'
import type { SelectProps } from './Select'

export { Option, OptGroup, selectProps, BaseSelect, useBaseProps }
export type { BaseSelectProps, BaseSelectRef, BaseSelectPropsWithoutPrivate, SelectProps }

export default Select
