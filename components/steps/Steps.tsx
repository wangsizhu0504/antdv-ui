import { computed, defineComponent } from 'vue'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
import VcSteps from '../vc-steps'
import Progress from '../progress'
import omit from '../_util/omit'
import Tooltip from '../tooltip'
import { useToken } from '../theme/internal'
import initDefaultProps from '../_util/props-util/initDefaultProps'
import { useBreakpoint, useConfigInject } from '../hooks'
import classNames from '../_util/classNames'
import useStyle from './style'
import { stepsProps } from './props'
import type { StepProps } from './props'
import type { CustomSlotsType, VueNode } from '../_util/type'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASteps',
  inheritAttrs: false,
  props: initDefaultProps(stepsProps(), {
    current: 0,
    responsive: true,
    labelPlacement: 'horizontal',
  }),
  slots: Object as CustomSlotsType<{
    progressDot: any
    default: any
  }>,

  // emits: ['update:current', 'change'],
  setup(props, { attrs, slots, emit }) {
    const { prefixCls, direction: rtlDirection, configProvider } = useConfigInject('steps', props)
    // style
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const [, token] = useToken()

    const screens = useBreakpoint()
    const direction = computed(() =>
      props.responsive && screens.value.xs ? 'vertical' : props.direction,
    )
    const iconPrefix = computed(() => configProvider.getPrefixCls('', props.iconPrefix))
    const handleChange = (current: number) => {
      emit('update:current', current)
      emit('change', current)
    }
    const isInline = computed(() => props.type === 'inline')
    const mergedPercent = computed(() => (isInline.value ? undefined : props.percent))
    const stepIconRender = ({
      node,
      status,
    }: {
      node: any
      index: number
      status: string
      title: any
      description: any
    }) => {
      if (status === 'process' && props.percent !== undefined) {
        // currently it's hard-coded, since we can't easily read the actually width of icon

        const progressWidth
          = props.size === 'small' ? token.value.controlHeight : token.value.controlHeightLG

        const iconWithProgress = (
          <div class={`${prefixCls.value}-progress-icon`}>
            <Progress
              type="circle"
              percent={mergedPercent.value}
              size={progressWidth}
              strokeWidth={4}
              format={() => null}
            />
            {node}
          </div>
        )
        return iconWithProgress
      }
      return node
    }
    const icons = computed(() => ({
      finish: <CheckOutlined class={`${prefixCls.value}-finish-icon`} />,
      error: <CloseOutlined class={`${prefixCls.value}-error-icon`} />,
    }))
    return () => {
      const stepsClassName = classNames(
        {
          [`${prefixCls.value}-rtl`]: rtlDirection.value === 'rtl',
          [`${prefixCls.value}-with-progress`]: mergedPercent.value !== undefined,
        },
        attrs.class,
        hashId.value,
      )
      const itemRender = (item: StepProps, stepItem: VueNode) =>
        item.description ? <Tooltip title={item.description}>{stepItem}</Tooltip> : stepItem

      return wrapSSR(
        <VcSteps
          icons={icons.value}
          {...attrs}
          {...omit(props, ['percent', 'responsive'])}
          items={props.items}
          direction={direction.value}
          prefixCls={prefixCls.value}
          iconPrefix={iconPrefix.value}
          class={stepsClassName}
          onChange={handleChange}
          isInline={isInline.value}
          itemRender={isInline.value ? itemRender : undefined}
          v-slots={{ stepIcon: stepIconRender, ...slots }}
        />,
      )
    }
  },
})
