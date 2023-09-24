import { defineComponent } from 'vue'
import { classNames } from '../../_utils/dom'
import { skeletonElementProps } from './props'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'ASkeletonElement',
  props: skeletonElementProps(),
  setup(props) {
    const { prefixCls, size, shape } = props

    const sizeCls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    })

    const shapeCls = classNames({
      [`${prefixCls}-circle`]: shape === 'circle',
      [`${prefixCls}-square`]: shape === 'square',
      [`${prefixCls}-round`]: shape === 'round',
    })

    const sizeStyle: CSSProperties
      = typeof size === 'number'
        ? {
            width: `${size}px`,
            height: `${size}px`,
            lineHeight: `${size}px`,
          }
        : {}

    return <span class={classNames(prefixCls, sizeCls, shapeCls)} style={sizeStyle} />
  },
})
