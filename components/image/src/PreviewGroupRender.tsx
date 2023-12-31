import {
  computed,
  defineComponent,
  reactive,
  ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue'
import { useMergedState } from '../../hooks'
import { mergeDefaultValue } from './utils'
import Preview from './Preview'
import { createGroupProviderContext } from './hooks/useContext'

import { imageGroupProps } from './props'
import type { PreviewGroupPreview, VcPreviewUrl } from './types'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PreviewGroup',
  inheritAttrs: false,
  props: imageGroupProps(),
  setup(props, { slots }) {
    const preview = computed<PreviewGroupPreview>(() => {
      const defaultValues = {
        visible: undefined,
        onVisibleChange: () => {},
        getContainer: undefined,
        current: 0,
      }
      return typeof props.preview === 'object'
        ? mergeDefaultValue(props.preview, defaultValues)
        : defaultValues
    })
    const previewUrls = reactive<Map<number, VcPreviewUrl>>(new Map())
    const current = ref<number>()

    const previewVisible = computed(() => preview.value.visible)
    const getPreviewContainer = computed(() => preview.value.getContainer)
    const onPreviewVisibleChange = (val, preval) => {
      preview.value.onVisibleChange?.(val, preval)
    }
    const [isShowPreview, setShowPreview] = useMergedState(!!previewVisible.value, {
      value: previewVisible,
      onChange: onPreviewVisibleChange,
    })

    const mousePosition = ref<{ x: number, y: number }>(null)
    const isControlled = computed(() => previewVisible.value !== undefined)
    const previewUrlsKeys = computed(() => Array.from(previewUrls.keys()))
    const currentControlledKey = computed(() => previewUrlsKeys.value[preview.value.current])
    const canPreviewUrls = computed(
      () =>
        new Map<number, string>(
          Array.from(previewUrls)
            .filter(([, { canPreview }]) => !!canPreview)
            .map(([id, { url }]) => [id, url]),
        ),
    )

    const setPreviewUrls = (id: number, url: string, canPreview = true) => {
      previewUrls.set(id, {
        url,
        canPreview,
      })
    }
    const setCurrent = (val: number) => {
      current.value = val
    }
    const setMousePosition = (val: null | { x: number, y: number }) => {
      mousePosition.value = val
    }

    const registerImage = (id: number, url: string, canPreview = true) => {
      const unRegister = () => {
        previewUrls.delete(id)
      }
      previewUrls.set(id, {
        url,
        canPreview,
      })
      return unRegister
    }

    const onPreviewClose = (e: any) => {
      e?.stopPropagation()
      setShowPreview(false)
      setMousePosition(null)
    }

    watch(
      currentControlledKey,
      (val) => {
        setCurrent(val)
      },
      {
        immediate: true,
        flush: 'post',
      },
    )
    watchEffect(
      () => {
        if (isShowPreview.value && isControlled.value)
          setCurrent(currentControlledKey.value)
      },
      {
        flush: 'post',
      },
    )
    createGroupProviderContext({
      isPreviewGroup: shallowRef(true),
      previewUrls: canPreviewUrls,
      setPreviewUrls,
      current,
      setCurrent,
      setShowPreview,
      setMousePosition,
      registerImage,
    })

    return () => {
      const { ...dialogProps } = preview.value
      return (
        <>
          {slots.default && slots.default()}
          <Preview
            {...dialogProps}
            ria-hidden={!isShowPreview.value}
            visible={isShowPreview.value}
            prefixCls={props.previewPrefixCls}
            onClose={onPreviewClose}
            mousePosition={mousePosition.value}
            src={canPreviewUrls.value.get(current.value)}
            icons={props.icons}
            getContainer={getPreviewContainer.value}
            v-slots={{ closeIcon: slots.closeIcon, toolbarRender: slots.toolbarRender }}
          />
        </>
      )
    }
  },
})
