import { PropTypes, anyType, arrayType, booleanType, functionType, someType, stringType, withUndefined } from '../../_utils/vue'
import type { ProgressDotRender, Status, StepIconRender } from './interface'
import type { MouseEventHandler, VueNode } from '../../_utils/types'
import type { ExtractPropTypes } from 'vue'

export const stepsProps = () => ({
  'prefixCls': String,
  'iconPrefix': String,
  'current': Number,
  'initial': Number,
  'percent': Number,
  'responsive': booleanType(),
  'items': arrayType<StepProps[]>(),
  'labelPlacement': stringType<'horizontal' | 'vertical'>(),
  'status': stringType<Status>(),
  'size': stringType<'default' | 'small'>(),
  'direction': stringType<'horizontal' | 'vertical'>(),
  'progressDot': someType<boolean | ProgressDotRender>([Boolean, Function]),
  'type': stringType<'default' | 'navigation' | 'inline'>(),
  'onChange': functionType<(current: number) => void>(),
  'onUpdate:current': functionType<(current: number) => void>(),
})

export const stepProps = () => ({
  description: anyType(),
  icon: anyType(),
  status: stringType<Status>(),
  disabled: booleanType(),
  title: anyType(),
  subTitle: anyType(),
  onClick: functionType<MouseEventHandler>(),
})

export const stepRenderProps = () => ({
  prefixCls: String,
  itemWidth: String,
  active: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: undefined },
  status: stringType<Status>(),
  iconPrefix: String,
  icon: PropTypes.any,
  adjustMarginRight: String,
  stepNumber: Number,
  stepIndex: Number,
  description: PropTypes.any,
  title: PropTypes.any,
  subTitle: PropTypes.any,
  progressDot: withUndefined(PropTypes.oneOfType([PropTypes.looseBool, PropTypes.func])),
  tailContent: PropTypes.any,
  icons: PropTypes.shape({
    finish: PropTypes.any,
    error: PropTypes.any,
  }).loose,
  onClick: functionType(),
  onStepClick: functionType<(next: number) => void>(),
  stepIcon: functionType<StepIconRender>(),
  itemRender: functionType<(stepItem: VueNode) => VueNode>(),
  __legacy: booleanType(),
})

export type StepRenderProps = Partial<ExtractPropTypes<ReturnType<typeof stepRenderProps>>>

export type StepsProps = Partial<ExtractPropTypes<ReturnType<typeof stepsProps>>>

export type StepProps = Partial<ExtractPropTypes<ReturnType<typeof stepProps>>>
