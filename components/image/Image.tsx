import { computed, defineComponent } from 'vue'
import { EyeOutlined } from '@ant-design/icons-vue'
import defaultLocale from '../locale/lang/en_US'
import ImageInternal, { vcImageProps } from '../vc-image'
import { useConfigInject } from '../hooks'
import { getTransitionName } from '../_util/components/transition'
import classNames from '../_util/classNames'
import useStyle from './style'
import { icons } from './PreviewGroup'
import type { ImageProps } from './types'

export default defineComponent<ImageProps>({
  name: 'AImage',
  inheritAttrs: false,
  props: vcImageProps() as any,
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
        <ImageInternal
          {...{ ...attrs, ...props, prefixCls: prefixCls.value }}
          preview={mergedPreview.value}
          rootClassName={classNames(props.rootClassName, hashId.value)}
          v-slots={{
            ...slots,
            previewMask: typeof previewMask === 'function' ? previewMask : null,
          }}
        ></ImageInternal>,
      )
    }
  },
})
