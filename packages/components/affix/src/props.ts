import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue';
import type { AffixEmits, AffixExpose } from './interface';

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}
// Affix
export function affixProps() {
  return {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   */
    offsetTop: Number,
    /** 距离窗口底部达到指定偏移量后触发 */
    offsetBottom: Number,
    /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
    target: {
      type: Function as PropType<() => Window | HTMLElement | null>,
      default: getDefaultTarget,
    },
    prefixCls: String,
    /** 固定状态改变时触发的回调函数 */
    onChange: Function as PropType<AffixEmits['change']>,
    onTestUpdatePosition: Function as PropType<AffixEmits['testUpdatePosition']>,
  };
}

export type AffixProps = Partial<ExtractPropTypes<ReturnType<typeof affixProps>>>;

export type AffixInstance = ComponentPublicInstance<AffixProps, AffixExpose>;
