import { computed, defineComponent } from 'vue'
import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons-vue'
import { useConfigInject } from '../hooks'
import PreviewGroup from '../vc-image/src/PreviewGroup'
import { anyType } from '../_util/type'
import useStyle from './style'
import type { ExtractPropTypes } from 'vue'
import type { PreviewGroupPreview } from '../vc-image/src/PreviewGroup'

export const icons = {
  rotateLeft: <RotateLeftOutlined />,
  rotateRight: <RotateRightOutlined />,
  zoomIn: <ZoomInOutlined />,
  zoomOut: <ZoomOutOutlined />,
  close: <CloseOutlined />,
  left: <LeftOutlined />,
  right: <RightOutlined />,
  flipX: <SwapOutlined />,
  flipY: <SwapOutlined rotate={90} />,
}
const previewGroupProps = () => ({
  previewPrefixCls: String,
  preview: anyType<boolean | PreviewGroupPreview>(),
})
export type ImageGroupProps = Partial<ExtractPropTypes<ReturnType<typeof previewGroupProps>>>

const InternalPreviewGroup = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AImagePreviewGroup',
  inheritAttrs: false,
  props: previewGroupProps(),
  setup(props, { attrs, slots }) {
    const { prefixCls } = useConfigInject('image', props)
    const previewPrefixCls = computed(() => `${prefixCls.value}-preview`)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const mergedPreview = computed(() => {
      const { preview } = props
      if (preview === false)
        return preview

      const _preview = typeof preview === 'object' ? preview : {}

      return {
        ..._preview,
        rootClassName: hashId.value,
      }
    })
    return () => {
      return wrapSSR(
        <PreviewGroup
          {...{ ...attrs, ...props }}
          preview={mergedPreview.value}
          icons={icons}
          previewPrefixCls={previewPrefixCls.value}
          v-slots={slots}
        ></PreviewGroup>,
      )
    }
  },
})
export default InternalPreviewGroup
