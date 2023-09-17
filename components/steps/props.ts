import { anyType, arrayType, booleanType, functionType, someType, stringType } from '../_util/type'
import type { MouseEventHandler } from '../_util/EventInterface'
import type { ProgressDotRender, Status } from '../vc-steps/interface'
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

export type StepsProps = Partial<ExtractPropTypes<ReturnType<typeof stepsProps>>>

export type StepProps = Partial<ExtractPropTypes<ReturnType<typeof stepProps>>>
