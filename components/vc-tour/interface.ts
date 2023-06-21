import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { VueNode } from '../_util/type'
import { functionType, objectType, someType, stringType } from '../_util/type'
import type { PlacementType } from './placements'

export const tourStepInfo = () => ({
  arrow: someType<boolean | { pointAtCenter: boolean }>([Boolean, Object]),
  target: someType<HTMLElement | (() => HTMLElement) | null | (() => null)>([
    String,
    Function,
    Object,
  ]),
  title: someType<string | VueNode>([String, Object]),
  description: someType<string | VueNode>([String, Object]),
  placement: stringType<PlacementType>(),
  mask: someType<boolean | { style?: CSSProperties; color?: string }>([Object, Boolean], true),
  className: { type: String },
  style: objectType<CSSProperties>(),
  scrollIntoViewOptions: someType<boolean | ScrollIntoViewOptions>([Boolean, Object]),
})

export type TourStepInfo = Partial<ExtractPropTypes<ReturnType<typeof tourStepInfo>>>

export const tourStepProps = () => ({
  ...tourStepInfo(),
  prefixCls: { type: String },
  total: { type: Number },
  current: { type: Number },
  onClose: functionType<(e: MouseEvent) => void>(),
  onFinish: functionType<(e: MouseEvent) => void>(),
  renderPanel: functionType<(step: any, current: number) => VueNode>(),
  onPrev: functionType<(e: MouseEvent) => void>(),
  onNext: functionType<(e: MouseEvent) => void>(),
})

export type TourStepProps = Partial<ExtractPropTypes<ReturnType<typeof tourStepProps>>>
