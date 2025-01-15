import type { CustomSlotsType } from '@antdv/types'
import type { Formatter } from './interface'
import { initDefaultProps } from '@antdv/utils'
import { defineComponent } from 'vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import Skeleton from '../../skeleton'
import useStyle from '../style'
import StatisticNumber from './Number'
import { statisticProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AStatistic',
  inheritAttrs: false,
  props: initDefaultProps(statisticProps(), {
    decimalSeparator: '.',
    groupSeparator: ',',
    loading: false,
  }),
  slots: Object as CustomSlotsType<{
    title?: any
    prefix?: any
    suffix?: any
    formatter?: any
    default?: any
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('statistic', props)

    // Style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    return () => {
      const { value = 0, valueStyle, valueRender } = props
      const pre = prefixCls.value
      const title = props.title ?? slots.title?.()
      const prefix = props.prefix ?? slots.prefix?.()
      const suffix = props.suffix ?? slots.suffix?.()
      const formatter = props.formatter ?? (slots.formatter as unknown as Formatter)
      // data-for-update just for update component
      // https://github.com/vueComponent/ant-design-vue/pull/3170
      let valueNode = (
        <StatisticNumber
          data-for-update={Date.now()}
          {...{ ...props, prefixCls: pre, value, formatter }}
        />
      )
      if (valueRender)
        valueNode = valueRender(valueNode)

      return wrapSSR(
        <div
          {...attrs}
          class={[pre, { [`${pre}-rtl`]: direction.value === 'rtl' }, attrs.class, hashId.value]}
        >
          {title && <div class={`${pre}-title`}>{title}</div>}
          <Skeleton paragraph={false} loading={props.loading}>
            <div style={valueStyle} class={`${pre}-content`}>
              {prefix && <span class={`${pre}-content-prefix`}>{prefix}</span>}
              {valueNode}
              {suffix && <span class={`${pre}-content-suffix`}>{suffix}</span>}
            </div>
          </Skeleton>
        </div>,
      )
    }
  },
})
