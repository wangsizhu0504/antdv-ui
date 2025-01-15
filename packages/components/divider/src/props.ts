import type { ExtractPropTypes, PropType } from 'vue';

export function dividerProps() {
  return {
    prefixCls: String,
    type: {
      type: String as PropType<'horizontal' | 'vertical' | ''>,
      default: 'horizontal',
    },
    dashed: {
      type: Boolean,
      default: false,
    },
    orientation: {
      type: String as PropType<'left' | 'right' | 'center'>,
      default: 'center',
    },
    plain: {
      type: Boolean,
      default: false,
    },
    orientationMargin: [String, Number],
  };
}
export type DividerProps = Partial<ExtractPropTypes<ReturnType<typeof dividerProps>>>;
