import type { ExtractPropTypes, PropType } from 'vue'
import type { InputStatus, KeyboardEventHandler } from '@antdv/types'
import { PropTypes } from '@antdv/utils'
import { mentionsProps as baseMentionsProps } from './vc-mentions/mentionsProps'
import type { MentionsOptionProps } from './types'

export function mentionsProps() {
  return {
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
  }
}

export type MentionsProps = Partial<ExtractPropTypes<ReturnType<typeof mentionsProps>>>
