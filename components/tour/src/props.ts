import { tourProps as VCTourProps, tourStepProps as VCTourStepProps } from '../../_internal/tour'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { VueNode } from '../../_utils/types'

export const tourProps = () => ({
  ...VCTourProps(),
  'steps': { type: Array as PropType<TourStepProps[]> },
  'prefixCls': { type: String },
  'current': { type: Number },
  'type': { type: String as PropType<'default' | 'primary'> }, // default类型，影响底色与文字颜色
  'onUpdate:current': Function as PropType<(val: number) => void>,
})

export type TourProps = Partial<ExtractPropTypes<ReturnType<typeof tourProps>>>

export interface TourBtnProps {
  children?: () => VueNode
  onClick?: () => void
  className?: string
  style?: CSSProperties
}

export const tourStepProps = () => ({
  ...VCTourStepProps(),
  cover: { type: Object as PropType<VueNode> }, // 展示的图片或者视频
  nextButtonProps: {
    type: Object as PropType<TourBtnProps>,
  },
  prevButtonProps: {
    type: Object as PropType<TourBtnProps>,
  },
  current: { type: Number },
  type: { type: String as PropType<'default' | 'primary'> }, // default类型，影响底色与文字颜色
})

export type TourStepProps = Partial<ExtractPropTypes<ReturnType<typeof tourStepProps>>>
