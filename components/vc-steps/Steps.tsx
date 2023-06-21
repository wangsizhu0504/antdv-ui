import { defineComponent } from 'vue'
import PropTypes from '../_util/vue-types'
import classNames from '../_util/classNames'
import type { VueNode } from '../_util/type'
import { functionType, stringType } from '../_util/type'
import { filterEmpty } from '../_util/props-util'
import { cloneElement } from '../_util/vnode'
import type { Status, StepIconRender } from './interface'
import Step from './Step'
import type { VCStepProps } from './Step'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Steps',
  props: {
    type: { type: String, default: 'default' },
    prefixCls: { type: String, default: 'vc-steps' },
    iconPrefix: { type: String, default: 'vc' },
    direction: { type: String, default: 'horizontal' },
    labelPlacement: { type: String, default: 'horizontal' },
    status: stringType<Status>('process'),
    size: { type: String, default: '' },
    progressDot: PropTypes.oneOfType([PropTypes.looseBool, PropTypes.func]).def(undefined),
    initial: { type: Number, default: 0 },
    current: { type: Number, default: 0 },
    items: { type: Array, default: () => [] },
    icons: PropTypes.shape({
      finish: PropTypes.any,
      error: PropTypes.any,
    }).loose,
    stepIcon: functionType<StepIconRender>(),
    isInline: PropTypes.looseBool,
    itemRender: functionType<(item: Record<string, any>, stepItem: VueNode) => VueNode>(),
  },
  emits: ['change'],
  setup(props, { slots, emit }) {
    const onStepClick = (next: number) => {
      const { current } = props
      if (current !== next)
        emit('change', next)
    }
    const renderStep = (item: VCStepProps, index: number, legacyRender?: any) => {
      const {
        prefixCls,
        iconPrefix,
        status,
        current,
        initial,
        icons,
        stepIcon = slots.stepIcon,
        isInline,
        itemRender,
        progressDot = slots.progressDot,
      } = props
      const mergedProgressDot = isInline || progressDot
      const mergedItem = { ...item, class: '' }
      const stepNumber = initial + index
      const commonProps = {
        active: stepNumber === current,
        stepNumber: stepNumber + 1,
        stepIndex: stepNumber,
        key: stepNumber,
        prefixCls,
        iconPrefix,
        progressDot: mergedProgressDot,
        stepIcon,
        icons,
        onStepClick,
      }
      // fix tail color
      if (status === 'error' && index === current - 1)
        mergedItem.class = `${prefixCls}-next-error`

      if (!mergedItem.status) {
        if (stepNumber === current)
          mergedItem.status = status
        else if (stepNumber < current)
          mergedItem.status = 'finish'
        else
          mergedItem.status = 'wait'
      }

      if (isInline) {
        mergedItem.icon = undefined
        mergedItem.subTitle = undefined
      }
      if (legacyRender)
        return legacyRender({ ...mergedItem, ...commonProps })

      if (itemRender)
        mergedItem.itemRender = stepItem => itemRender(mergedItem, stepItem)

      return <Step {...mergedItem} {...commonProps} __legacy={false} />
    }
    const renderStepWithNode = (node: any, index: number) => {
      return renderStep({ ...node.props }, index, (stepProps) => {
        const stepNode = cloneElement(node, stepProps)
        return stepNode
      })
    }
    return () => {
      const {
        prefixCls,
        direction,
        type,
        labelPlacement,
        iconPrefix,
        status,
        size,
        current,
        progressDot = slots.progressDot,
        initial,
        icons,
        items,
        isInline,
        itemRender,
        ...restProps
      } = props
      const isNav = type === 'navigation'
      const mergedProgressDot = isInline || progressDot
      const mergedDirection = isInline ? 'horizontal' : direction
      const mergedSize = isInline ? undefined : size

      const adjustedLabelPlacement = mergedProgressDot ? 'vertical' : labelPlacement
      const classString = classNames(prefixCls, `${prefixCls}-${direction}`, {
        [`${prefixCls}-${mergedSize}`]: mergedSize,
        [`${prefixCls}-label-${adjustedLabelPlacement}`]: mergedDirection === 'horizontal',
        [`${prefixCls}-dot`]: !!mergedProgressDot,
        [`${prefixCls}-navigation`]: isNav,
        [`${prefixCls}-inline`]: isInline,
      })

      return (
        <div class={classString} {...restProps}>
          {items.filter(item => item).map((item, index) => renderStep(item, index))}
          {filterEmpty(slots.default?.()).map(renderStepWithNode)}
        </div>
      )
    }
  },
})
