import type { ExtractPropTypes, HTMLAttributes, PropType } from 'vue';
import type { ButtonProps, LegacyButtonType } from '../../button';
import { anyType, objectType, stringType } from '@antdv/utils';
import { abstractTooltipProps } from '../../tooltip';

export function popconfirmProps() {
  return {
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
  };
}

export type PopconfirmProps = Partial<ExtractPropTypes<ReturnType<typeof popconfirmProps>>>;
