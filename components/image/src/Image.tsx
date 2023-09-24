import { computed, defineComponent } from 'vue'
import { EyeOutlined } from '@ant-design/icons-vue'
import defaultLocale from '../../locale/lang/en_US'
import { useConfigInject } from '../../hooks'
import { classNames } from '../../_utils/dom'
import { getTransitionName } from '../../_internal/transition'
import useStyle from '../style'
import ImageRender from './ImageRender'
import { icons } from './PreviewGroup'
import { imageProps } from './props'
import type { ImageProps } from './props'

export default defineComponent<ImageProps>({
  name: 'AImage',
  inheritAttrs: false,
  props: imageProps() as any,
  setup(props, { slots, attrs }) {
    const { prefixCls, rootPrefixCls, configProvider } = useConfigInject('image', props)
    // Style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const mergedPreview = computed(() => {
      const { preview } = props

      if (preview === false)
        return preview

      const _preview = typeof preview === 'object' ? preview : {}

      return {
        icons,
        ..._preview,
        transitionName: getTransitionName(rootPrefixCls.value, 'zoom', _preview.transitionName),
        maskTransitionName: getTransitionName(
          rootPrefixCls.value,
          'fade',
          _preview.maskTransitionName,
        ),
      }
    })

    return () => {
      const imageLocale = configProvider.locale?.value?.Image || defaultLocale.Image
      const defaultPreviewMask = () => (
        <div class={`${prefixCls.value}-mask-info`}>
          <EyeOutlined />
          {imageLocale?.preview}
        </div>
      )
      const { previewMask = slots.previewMask || defaultPreviewMask } = props
      return wrapSSR(
        <ImageRender
          {...{ ...attrs, ...props, prefixCls: prefixCls.value }}
          preview={mergedPreview.value}
          rootClassName={classNames(props.rootClassName, hashId.value)}
          v-slots={{
            ...slots,
            previewMask: typeof previewMask === 'function' ? previewMask : null,
          }}
        ></ImageRender>,
      )
    }
  },
})
