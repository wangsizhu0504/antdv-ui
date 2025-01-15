import type { FocusEventHandler, KeyboardEventHandler } from '@antdv/types';

import type { ExtractPropTypes, PropType } from 'vue';
import type { Direction } from '../../config-provider';
import { PropTypes } from '@antdv/utils';

export function rateProps() {
  return {
    'prefixCls': String,
    'count': { type: Number, default: 5 },
    'value': { type: Number, default: 0 },
    'allowHalf': { type: Boolean, default: false },
    'allowClear': { type: Boolean, default: true },
    'tooltips': Array as PropType<string[]>,
    'disabled': { type: Boolean, default: undefined },
    'character': PropTypes.any,
    'autofocus': { type: Boolean, default: undefined },
    'tabindex': { type: [Number, String], default: 0 },
    'direction': { type: String as PropType<Direction>, default: 'ltr' },
    'id': String,
    'onChange': Function as PropType<(value: number) => void>,
    'onHoverChange': Function as PropType<(value: number) => void>,
    'onUpdate:value': Function as PropType<(value: number) => void>,
    'onFocus': Function as PropType<FocusEventHandler>,
    'onBlur': Function as PropType<FocusEventHandler>,
    'onKeydown': Function as PropType<KeyboardEventHandler>,
  };
}

export function starProps() {
  return {
    value: Number,
    index: Number,
    prefixCls: String,
    allowHalf: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
    character: PropTypes.any,
    characterRender: Function,
    focused: { type: Boolean, default: undefined },
    count: Number,
    onClick: Function,
    onHover: Function,
  };
}

export type StarProps = Partial<ExtractPropTypes<ReturnType<typeof starProps>>>;

export type RateProps = Partial<ExtractPropTypes<ReturnType<typeof rateProps>>>;
