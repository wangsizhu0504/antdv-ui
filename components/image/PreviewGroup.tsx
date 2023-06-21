import { computed, defineComponent } from 'vue'

import RotateLeftOutlined, { CloseOutlined, LeftOutlined, RightOutlined, RotateRightOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons-vue'
import type { ExtractPropTypes } from 'vue'
import { useConfigInject } from '../hooks'
import PreviewGroup, { imageGroupProps } from '../vc-image/src/PreviewGroup'
import useStyle from './style'

export const icons = {
  rotateLeft: <RotateLeftOutlined />,
  rotateRight: <RotateRightOutlined />,
  zoomIn: <ZoomInOutlined />,
  zoomOut: <ZoomOutOutlined />,
  close: <CloseOutlined />,
  left: <LeftOutlined />,
  right: <RightOutlined />,
}
export type ImageGroupProps = Partial<ExtractPropTypes<ReturnType<typeof imageGroupProps>>>

const InternalPreviewGroup = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AImagePreviewGroup',
  inheritAttrs: false,
  props: imageGroupProps(),
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
