import type { FocusEventHandler } from '@antdv/types';
import type { ExtractPropTypes, PropType } from 'vue';
import type { CheckedType } from './interface';
import { PropTypes, tuple } from '@antdv/utils';

export const SwitchSizes = tuple('small', 'default');

export function switchProps() {
  return {
    'id': String,
    'prefixCls': String,
    'size': PropTypes.oneOf(SwitchSizes),
    'disabled': { type: Boolean, default: undefined },
    'checkedChildren': PropTypes.any,
    'unCheckedChildren': PropTypes.any,
    'tabindex': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    'autofocus': { type: Boolean, default: undefined },
    'loading': { type: Boolean, default: undefined },
    'checked': PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.looseBool]),
    'checkedValue': PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.looseBool]).def(
      true,
    ),
    'unCheckedValue': PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.looseBool,
    ]).def(false),
    'onChange': {
      type: Function as PropType<(checked: CheckedType, e: Event) => void>,
    },
    'onClick': {
      type: Function as PropType<(checked: CheckedType, e: Event) => void>,
    },
    'onKeydown': {
      type: Function as PropType<(e: Event) => void>,
    },
    'onMouseup': {
      type: Function as PropType<(e: Event) => void>,
    },
    'onUpdate:checked': {
      type: Function as PropType<(checked: CheckedType) => void>,
    },
    'onBlur': Function as PropType<FocusEventHandler>,
    'onFocus': Function as PropType<FocusEventHandler>,
  };
}

export type SwitchProps = Partial<ExtractPropTypes<ReturnType<typeof switchProps>>>;
