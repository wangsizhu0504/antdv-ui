import { computed, defineComponent, toRefs } from 'vue'
import VCTour from '../../_internal/tour'
import { classNames } from '../../_utils/dom'
import { useConfigInject } from '../../hooks'
import useStyle from '../style'
import { getPlacements } from '../../_utils/placements'
import TourPanel from './PanelRender'

import useMergedType from './useMergedType'

import { tourProps } from './props'
import type { TourStepProps } from './props'
import type { VueNode } from '../../_utils/types'

export default defineComponent({
  name: 'ATour',
  inheritAttrs: false,
  props: tourProps(),
  setup(props, { attrs, emit, slots }) {
    const { current, type, steps, defaultCurrent } = toRefs(props)
    const { prefixCls, direction } = useConfigInject('tour', props)

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const { currentMergedType, updateInnerCurrent } = useMergedType({
      defaultType: type,
      steps,
      current,
      defaultCurrent,
    })
    return () => {
      const { steps, current, type, rootClassName, ...restProps } = props

      const customClassName = classNames(
        {
          [`${prefixCls.value}-primary`]: currentMergedType.value === 'primary',
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        },
        hashId.value,
        rootClassName,
      )

      const mergedRenderPanel = (stepProps: TourStepProps, stepCurrent: number): VueNode => {
        return (
          <TourPanel
            {...stepProps}
            type={type}
            current={stepCurrent}
            v-slots={{
              indicatorsRender: slots.indicatorsRender,
            }}
          ></TourPanel>
        )
      }

      const onStepChange = (stepCurrent: number) => {
        updateInnerCurrent(stepCurrent)
        emit('update:current', stepCurrent)
        emit('change', stepCurrent)
      }

      const builtinPlacements = computed(() =>
        getPlacements({
          arrowPointAtCenter: true,
          autoAdjustOverflow: true,
        }),
      )

      return wrapSSR(
        <VCTour
          {...attrs}
          {...restProps}
          rootClassName={customClassName}
          prefixCls={prefixCls.value}
          current={current}
          defaultCurrent={props.defaultCurrent}
          animated
          renderPanel={mergedRenderPanel}
          onChange={onStepChange}
          steps={steps}
          builtinPlacements={builtinPlacements.value as any}
        />,
      )
    }
  },
})
