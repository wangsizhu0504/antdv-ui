import { computed, defineComponent } from 'vue'
import { EyeOutlined } from '@ant-design/icons-vue'
import { classNames } from '@antdv/utils'
import { enUS as defaultLocale } from '@antdv/locale'
import { VcImage, getTransitionName, imageProps } from '@antdv/vue-components'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import useStyle from '../style'
import { icons } from './PreviewGroup'

export default defineComponent({
  name: 'AImage',
  inheritAttrs: false,
  props: imageProps(),
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
        <VcImage
          {...{ ...attrs, ...props, prefixCls: prefixCls.value }}
          preview={mergedPreview.value}
          rootClassName={classNames(props.rootClassName, hashId.value)}
          v-slots={{
            ...slots,
            previewMask: typeof previewMask === 'function' ? previewMask : null,
          }}
        >
        </VcImage>,
      )
    }
  },
})
