import type { BaseSelectRef } from '@antdv/vue-components/vc-select/src/BaseSelect';
import type Option from '@antdv/vue-components/vc-select/src/Option';
import type { OptionProps } from '@antdv/vue-components/vc-select/src/Option';
import type { BaseOptionType, DefaultOptionType } from '@antdv/vue-components/vc-select/src/Select';

export type OptionType = typeof Option;

export type { BaseOptionType as BaseSelectOption, DefaultOptionType as DefaultSelectOption, OptionProps, BaseSelectRef as RefSelectProps };
