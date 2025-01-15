import type { CSSProperties } from 'vue'
import type { ProgressSize } from './interface'
import { devWarning } from '@antdv/utils'
import { computed, defineComponent } from 'vue'
import { progressLineProps } from './props'
import { getSize, getSuccessPercent, handleGradient, validProgress } from './utils'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ProgressLine',
  inheritAttrs: false,
  props: progressLineProps(),
  setup(props, { slots, attrs }) {
    const backgroundProps = computed<CSSProperties>(() => {
      const { strokeColor, direction } = props
      return strokeColor && typeof strokeColor !== 'string'
        ? handleGradient(strokeColor, direction)
        : {
            backgroundColor: strokeColor as string,
          }
    })
    const borderRadius = computed(() =>
      props.strokeLinecap === 'square' || props.strokeLinecap === 'butt' ? 0 : undefined,
    )

    const trailStyle = computed<CSSProperties>(() =>
      props.trailColor
        ? {
            backgroundColor: props.trailColor,
          }
        : undefined,
    )

    const mergedSize = computed(
      () => props.size ?? [-1, props.strokeWidth || (props.size === 'small' ? 6 : 8)],
    )

    const sizeRef = computed(() =>
      getSize(mergedSize.value as ProgressSize, 'line', { strokeWidth: props.strokeWidth }),
    )

    if (process.env.NODE_ENV !== 'production') {
      devWarning(
        'strokeWidth' in props,
        'Progress',
        '`strokeWidth` is deprecated. Please use `size` instead.',
      )
    }

    const percentStyle = computed<CSSProperties>(() => {
      const { percent } = props
      return {
        width: `${validProgress(percent)}%`,
        height: `${sizeRef.value.height}px`,
        borderRadius: borderRadius.value,
        ...backgroundProps.value,
      }
    })

    const successPercent = computed(() => {
      return getSuccessPercent(props)
    })
    const successPercentStyle = computed<CSSProperties>(() => {
      const { success } = props
      return {
        width: `${validProgress(successPercent.value)}%`,
        height: `${sizeRef.value.height}px`,
        borderRadius: borderRadius.value,
        backgroundColor: success?.strokeColor,
      }
    })

    const outerStyle: CSSProperties = {
      width: sizeRef.value.width < 0 ? '100%' : sizeRef.value.width,
      height: `${sizeRef.value.height}px`,
    }

    return () => (
      <>
        <div
          {...attrs}
          class={[`${props.prefixCls}-outer`, attrs.class]}
          style={[attrs.style as CSSProperties, outerStyle]}
        >
          <div class={`${props.prefixCls}-inner`} style={trailStyle.value}>
            <div class={`${props.prefixCls}-bg`} style={percentStyle.value} />
            {successPercent.value !== undefined
              ? (
                  <div class={`${props.prefixCls}-success-bg`} style={successPercentStyle.value} />
                )
              : null}
          </div>
        </div>
        {slots.default?.()}
      </>
    )
  },
})
