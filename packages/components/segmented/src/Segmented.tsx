import { computed, defineComponent, shallowRef } from 'vue'
import { classNames, initDefaultProps } from '@antdv/utils'
import type { ChangeEvent, CustomSlotsType } from '@antdv/types'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import useStyle from '../style'
import MotionThumb from './MotionThumb'
import SegmentedOption from './Options'
import { segmentedProps } from './props'
import type { SegmentedBaseOption, SegmentedOptionType, SegmentedValue } from './interface'

function normalizeOptions(options: Array<SegmentedOptionType | string | number>) {
  return options.map((option) => {
    if (typeof option === 'object' && option !== null)
      return option

    return {
      label: option?.toString(),
      title: option?.toString(),
      value: option as unknown as SegmentedBaseOption['value'],
    }
  })
}

export default defineComponent({
  name: 'ASegmented',
  inheritAttrs: false,
  props: initDefaultProps(segmentedProps(), {
    options: [],
    motionName: 'thumb-motion',
  }),
  slots: Object as CustomSlotsType<{
    label: SegmentedBaseOption
  }>,
  setup(props, { emit, slots, attrs }) {
    const { prefixCls, direction, size } = useConfigInject('segmented', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const rootRef = shallowRef<HTMLDivElement>()
    const thumbShow = shallowRef(false)

    const segmentedOptions = computed(() => normalizeOptions(props.options))
    const handleChange = (_event: ChangeEvent, val: SegmentedValue) => {
      if (props.disabled)
        return

      emit('update:value', val)
      emit('change', val)
    }
    return () => {
      const pre = prefixCls.value
      return wrapSSR(
        <div
          {...attrs}
          class={classNames(
            pre,
            {
              [hashId.value]: true,
              [`${pre}-block`]: props.block,
              [`${pre}-disabled`]: props.disabled,
              [`${pre}-lg`]: size.value === 'large',
              [`${pre}-sm`]: size.value === 'small',
              [`${pre}-rtl`]: direction.value === 'rtl',
            },
            attrs.class,
          )}
          ref={rootRef}
        >
          <div class={`${pre}-group`}>
            <MotionThumb
              containerRef={rootRef}
              prefixCls={pre}
              value={props.value}
              motionName={`${pre}-${props.motionName}`}
              direction={direction.value}
              getValueIndex={val => segmentedOptions.value.findIndex(n => n.value === val)}
              onMotionStart={() => {
                thumbShow.value = true
              }}
              onMotionEnd={() => {
                thumbShow.value = false
              }}
            />
            {segmentedOptions.value.map(segmentedOption => (
              <SegmentedOption
                key={segmentedOption.value}
                prefixCls={pre}
                checked={segmentedOption.value === props.value}
                onChange={handleChange}
                {...segmentedOption}
                className={classNames(segmentedOption.className, `${pre}-item`, {
                  [`${pre}-item-selected`]:
                    segmentedOption.value === props.value && !thumbShow.value,
                })}
                disabled={!!props.disabled || !!segmentedOption.disabled}
                v-slots={slots}
              />
            ))}
          </div>
        </div>,
      )
    }
  },
})
