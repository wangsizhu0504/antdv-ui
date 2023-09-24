import { objectType } from '../../../_utils/vue'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ButtonProps, LegacyButtonType } from '../../../button'

export const actionButtonProps = {
  type: {
    type: String as PropType<LegacyButtonType>,
  },
  actionFn: Function as PropType<(...args: any[]) => any | PromiseLike<any>>,
  close: Function,
  autofocus: Boolean,
  prefixCls: String,
  buttonProps: objectType<ButtonProps>(),
  emitEvent: Boolean,
  quitOnNullishReturnValue: Boolean,
}

export type ActionButtonProps = ExtractPropTypes<typeof actionButtonProps>
