import { PropTypes, anyType, arrayType, objectType, tuple } from '../../_utils/vue'

import type { Direction } from '../../config-provider'
import type { filterOption as defaultFilterOption } from './util'
import type { InputStatus, KeyboardEventHandler, VueNode } from '../../_utils/types'
import type { ExtractPropTypes, HTMLAttributes, PropType } from 'vue'

import type { MentionsOptionProps } from './types'

export const PlaceMent = tuple('top', 'bottom')

export const baseMentionsProps = {
  autofocus: { type: Boolean, default: undefined },
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  prefixCls: String,
  value: String,
  disabled: { type: Boolean, default: undefined },
  split: String,
  transitionName: String,
  placement: PropTypes.oneOf(PlaceMent),
  character: PropTypes.any,
  characterRender: Function,
  filterOption: {
    type: [Boolean, Function] as PropType<typeof defaultFilterOption | false>,
  },
  validateSearch: Function,
  getPopupContainer: {
    type: Function as PropType<() => HTMLElement>,
  },
  options: arrayType<MentionOptionProps[]>(),
  loading: { type: Boolean, default: undefined },
  rows: [Number, String],
  direction: { type: String as PropType<Direction> },
}

export const innerMentionsProps = {
  ...baseMentionsProps,
  dropdownClassName: String,
}
export const baseMentionOptionsProps = {
  value: String,
  disabled: Boolean,
  payload: objectType<Record<string, any>>(),
}

export const mentionOptionProps = {
  ...baseMentionOptionsProps,
  label: anyType<VueNode | ((o: BaseOptionsProps) => VueNode)>([]),
}

export const mentionsProps = () => ({
  ...baseMentionsProps,
  'loading': { type: Boolean, default: undefined },
  'onFocus': {
    type: Function as PropType<(e: FocusEvent) => void>,
  },
  'onBlur': {
    type: Function as PropType<(e: FocusEvent) => void>,
  },
  'onSelect': {
    type: Function as PropType<(option: MentionsOptionProps, prefix: string) => void>,
  },
  'onChange': {
    type: Function as PropType<(text: string) => void>,
  },
  'onPressenter': {
    type: Function as PropType<KeyboardEventHandler>,
  },
  'onUpdate:value': {
    type: Function as PropType<(text: string) => void>,
  },
  'notFoundContent': PropTypes.any,
  'defaultValue': String,
  'id': String,
  'status': String as PropType<InputStatus>,
})
export type InnerMentionsProps = Partial<ExtractPropTypes<typeof innerMentionsProps>>

export type BaseOptionsProps = Partial<ExtractPropTypes<typeof baseMentionOptionsProps>> &
Partial<HTMLAttributes>

export type MentionOptionProps = Partial<ExtractPropTypes<typeof mentionOptionProps>> & Partial<HTMLAttributes>

export type MentionsProps = Partial<ExtractPropTypes<ReturnType<typeof mentionsProps>>>
