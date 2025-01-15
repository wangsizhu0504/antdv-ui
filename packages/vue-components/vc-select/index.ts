import type { BaseSelectProps, BaseSelectPropsWithoutPrivate, BaseSelectRef } from './src/BaseSelect';

// base rc-select 14.1.1
import type { DefaultOptionType, SelectProps } from './src/Select';
import VcBaseSelect from './src/BaseSelect';
import useBaseProps from './src/hooks/useBaseProps';
import VcOptGroup from './src/OptGroup';
import VcOption from './src/Option';
import VcSelect, { selectProps } from './src/Select';

export {
  useBaseProps,
  VcBaseSelect,
  VcOptGroup,
  VcOption,
  VcSelect,
  selectProps as vcSelectProps,
};
export type {
  BaseSelectProps,
  BaseSelectPropsWithoutPrivate,
  BaseSelectRef,
  SelectProps,
  DefaultOptionType as VcSelectDefaultOptionType,
};
