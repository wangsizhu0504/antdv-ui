import { cloneVNode, defineComponent, isVNode, onBeforeUnmount, shallowRef, watch } from 'vue'
import { debounce } from 'lodash-es'
import { filterEmpty, getPropsSlot, initDefaultProps } from '../../_utils/vue'
import { useConfigInject } from '../../hooks'
import useStyle from '../style'
import { spinProps } from './props'
import type { VNode } from 'vue'

// Render indicator
let defaultIndicator: () => VNode = null

function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !Number.isNaN(Number(delay))
}

export function setDefaultIndicator(Content: any) {
  const Indicator = Content.indicator
  defaultIndicator = typeof Indicator === 'function' ? Indicator : () => <Indicator />
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASpin',
  inheritAttrs: false,
  props: initDefaultProps(spinProps(), {
    size: 'default',
    spinning: true,
    wrapperClassName: '',
  }),
  setDefaultIndicator,
  setup(props, { attrs, slots }) {
    const { prefixCls, size, direction } = useConfigInject('spin', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const sSpinning = shallowRef(props.spinning && !shouldDelay(props.spinning, props.delay))
    let updateSpinning: any
    watch(
      [() => props.spinning, () => props.delay],
      () => {
        updateSpinning?.cancel()
        updateSpinning = debounce(() => {
          sSpinning.value = props.spinning
        }, props.delay)
        updateSpinning?.()
      },
      {
        immediate: true,
        flush: 'post',
      },
    )
    onBeforeUnmount(() => {
      updateSpinning?.cancel()
    })
    return () => {
      const { class: cls, ...divProps } = attrs
      const { tip = slots.tip?.() } = props
      const children = slots.default?.()
      const spinClassName = {
        [hashId.value]: true,
        [prefixCls.value]: true,
        [`${prefixCls.value}-sm`]: size.value === 'small',
        [`${prefixCls.value}-lg`]: size.value === 'large',
        [`${prefixCls.value}-spinning`]: sSpinning.value,
        [`${prefixCls.value}-show-text`]: !!tip,
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        [cls as string]: !!cls,
      }

      function renderIndicator(prefixCls: string) {
        const dotClassName = `${prefixCls}-dot`
        let indicator = getPropsSlot(slots, props, 'indicator')
        // should not be render default indicator when indicator value is null
        if (indicator === null)
          return null

        if (Array.isArray(indicator))
          indicator = indicator.length === 1 ? indicator[0] : indicator

        if (isVNode(indicator))
          return cloneVNode(indicator, { class: dotClassName })

        if (defaultIndicator && isVNode(defaultIndicator()))
          return cloneVNode(defaultIndicator(), { class: dotClassName })

        return (
          <span class={`${dotClassName} ${prefixCls}-dot-spin`}>
            <i class={`${prefixCls}-dot-item`} />
            <i class={`${prefixCls}-dot-item`} />
            <i class={`${prefixCls}-dot-item`} />
            <i class={`${prefixCls}-dot-item`} />
          </span>
        )
      }
      const spinElement = (
        <div {...divProps} class={spinClassName} aria-live="polite" aria-busy={sSpinning.value}>
          {renderIndicator(prefixCls.value)}
          {tip ? <div class={`${prefixCls.value}-text`}>{tip}</div> : null}
        </div>
      )
      if (children && filterEmpty(children).length) {
        const containerClassName = {
          [`${prefixCls.value}-container`]: true,
          [`${prefixCls.value}-blur`]: sSpinning.value,
        }
        return wrapSSR(
          <div class={[`${prefixCls.value}-nested-loading`, props.wrapperClassName, hashId.value]}>
            {sSpinning.value && <div key="loading">{spinElement}</div>}
            <div class={containerClassName} key="container">
              {children}
            </div>
          </div>,
        )
      }
      return wrapSSR(spinElement)
    }
  },
})
