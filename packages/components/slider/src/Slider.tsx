import { computed, defineComponent, ref } from 'vue'
import { classNames, devWarning } from '@antdv/utils'
import type { SlotsType } from 'vue'
import { VcHandle, VcRange, VcSlider } from '@antdv/vue-components'
import { useInjectFormItemContext } from '../../form/src/FormItemContext'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import useStyle from '../style'
import SliderTooltip from './SliderTooltip'
import { sliderProps } from './props'
import type { HandleGeneratorFn, HandleGeneratorInfo, SliderValue, Visibles } from './interface'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASlider',
  inheritAttrs: false,
  props: sliderProps(),
  // emits: ['update:value', 'change', 'afterChange', 'blur'],
  slots: Object as SlotsType<{
    mark?: any
    default?: any
  }>,
  setup(props, { attrs, slots, emit, expose }) {
    // Warning for deprecated usage
    if (process.env.NODE_ENV !== 'production') {
      [['tooltipVisible', 'tooltipOpen']].forEach(([deprecatedName, newName]) => {
        devWarning(
          props.tooltipVisible === undefined,
          'Slider',
          `\`${deprecatedName}\` is deprecated, please use \`${newName}\` instead.`,
        )
      })
    }
    const { prefixCls, rootPrefixCls, direction, getPopupContainer, configProvider }
      = useConfigInject('slider', props)

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const formItemContext = useInjectFormItemContext()
    const sliderRef = ref()
    const visibles = ref<Visibles>({})
    const toggleTooltipOpen = (index: number, visible: boolean) => {
      visibles.value[index] = visible
    }
    const tooltipPlacement = computed(() => {
      if (props.tooltipPlacement)
        return props.tooltipPlacement

      if (!props.vertical)
        return 'top'

      return direction.value === 'rtl' ? 'left' : 'right'
    })

    const focus = () => {
      sliderRef.value?.focus()
    }
    const blur = () => {
      sliderRef.value?.blur()
    }
    const handleChange = (val: SliderValue) => {
      emit('update:value', val)
      emit('change', val)
      formItemContext.onFieldChange()
    }
    const handleBlur = (e: FocusEvent) => {
      emit('blur', e)
    }
    expose({
      focus,
      blur,
    })
    const handleWithTooltip: HandleGeneratorFn = ({
      tooltipPrefixCls,
      info: { value, dragging, index, ...restProps },
    }) => {
      const { tipFormatter, tooltipOpen = props.tooltipVisible, getTooltipPopupContainer } = props
      const isTipFormatter = tipFormatter ? (visibles.value[index] || dragging) : false
      const open = tooltipOpen || (tooltipOpen === undefined && isTipFormatter)
      return (
        <SliderTooltip
          prefixCls={tooltipPrefixCls}
          title={tipFormatter ? tipFormatter(value) : ''}
          open={open}
          placement={tooltipPlacement.value}
          transitionName={`${rootPrefixCls.value}-zoom-down`}
          key={index}
          overlayClassName={`${prefixCls.value}-tooltip`}
          getPopupContainer={getTooltipPopupContainer || getPopupContainer?.value}
        >
          <VcHandle
            {...restProps}
            value={value}
            onMouseenter={() => toggleTooltipOpen(index, true)}
            onMouseleave={() => toggleTooltipOpen(index, false)}
          />
        </SliderTooltip>
      )
    }
    return () => {
      const {
        tooltipPrefixCls: customizeTooltipPrefixCls,
        range,
        id = formItemContext.id.value,
        ...restProps
      } = props
      const tooltipPrefixCls = configProvider.getPrefixCls('tooltip', customizeTooltipPrefixCls)
      const cls = classNames(
        attrs.class,
        {
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        },
        hashId.value,
      )

      // make reverse default on rtl direction
      if (direction.value === 'rtl' && !restProps.vertical)
        restProps.reverse = !restProps.reverse

      // extrack draggableTrack from range={{ ... }}
      let draggableTrack: boolean | undefined
      if (typeof range === 'object')
        draggableTrack = range.draggableTrack

      if (range) {
        return wrapSSR(
          <VcRange
            {...attrs}
            {...restProps}
            step={restProps.step!}
            draggableTrack={draggableTrack}
            class={cls}
            ref={sliderRef}
            handle={(info: HandleGeneratorInfo) =>
              handleWithTooltip({
                tooltipPrefixCls,
                prefixCls: prefixCls.value,
                info,
              })}
            prefixCls={prefixCls.value}
            onChange={handleChange}
            onBlur={handleBlur}
            v-slots={{ mark: slots.mark }}
          />,
        )
      }
      return wrapSSR(
        <VcSlider
          {...attrs}
          {...restProps}
          id={id}
          step={restProps.step!}
          class={cls}
          ref={sliderRef}
          handle={(info: HandleGeneratorInfo) =>
            handleWithTooltip({
              tooltipPrefixCls,
              prefixCls: prefixCls.value,
              info,
            })}
          prefixCls={prefixCls.value}
          onChange={handleChange}
          onBlur={handleBlur}
          v-slots={{ mark: slots.mark }}
        />,
      )
    }
  },
})
