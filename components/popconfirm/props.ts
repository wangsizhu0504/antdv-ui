import abstractTooltipProps from '../tooltip/abstractTooltipProps'
import { anyType, objectType, stringType } from '../_util/type'
import type { ExtractPropTypes, HTMLAttributes, PropType } from 'vue'
import type { ButtonProps, LegacyButtonType } from '../button'

export const popconfirmProps = () => ({
  ...abstractTooltipProps(),
  prefixCls: String,
  content: anyType(),
  title: anyType<string | number>(),
  description: anyType<string | number>(),
  okType: stringType<LegacyButtonType>('primary'),
  disabled: { type: Boolean, default: false },
  okText: anyType(),
  cancelText: anyType(),
  icon: anyType(),
  okButtonProps: objectType<ButtonProps & HTMLAttributes>(),
  cancelButtonProps: objectType<ButtonProps & HTMLAttributes>(),
  showCancel: { type: Boolean, default: true },
  onConfirm: Function as PropType<(e: MouseEvent) => void>,
  onCancel: Function as PropType<(e: MouseEvent) => void>,
})

export type PopconfirmProps = Partial<ExtractPropTypes<ReturnType<typeof popconfirmProps>>>
