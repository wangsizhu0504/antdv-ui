import { defineComponent } from 'vue'
import { skeletonTitleProps } from './props'

const SkeletonTitle = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'SkeletonTitle',
  props: skeletonTitleProps(),
  setup(props) {
    return () => {
      const { prefixCls, width } = props
      const zWidth = typeof width === 'number' ? `${width}px` : width
      return <h3 class={prefixCls} style={{ width: zWidth }} />
    }
  },
})

export default SkeletonTitle
