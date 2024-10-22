import type { CSSProperties, ExtractPropTypes, ImgHTMLAttributes, PropType } from 'vue'
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { isNumber } from 'lodash-es'
import { PropTypes, classNames, getOffset } from '@antdv/utils'
import { useMergedState } from '@antdv/hooks'
import type { MouseEventHandler } from '@antdv/types'
import Preview from './Preview'

import PreviewGroup from './PreviewGroup'
import { imageContext } from './context'
import type { ImagePreviewType, ImageStatus } from './interface'
import { mergeDefaultValue } from './utils'
import { COMMON_PROPS } from './common'

export function imageProps() {
  return {
    src: String,
    wrapperClassName: String,
    wrapperStyle: { type: Object as PropType<CSSProperties>, default: undefined as CSSProperties },
    rootClassName: String,
    prefixCls: String,
    previewPrefixCls: String,
    width: [Number, String],
    height: [Number, String],
    previewMask: {
      type: [Boolean, Function] as PropType<false | (() => any)>,
      default: undefined,
    },
    placeholder: PropTypes.any,
    fallback: String,
    preview: {
      type: [Boolean, Object] as PropType<boolean | ImagePreviewType>,
      default: true as boolean | ImagePreviewType,
    },
    onClick: {
      type: Function as PropType<MouseEventHandler>,
    },
    onError: {
      type: Function as PropType<HTMLImageElement['onerror']>,
    },
  }
}

export type ImageProps = Partial<
  ExtractPropTypes<ReturnType<typeof imageProps>> &
  Omit<ImgHTMLAttributes, 'placeholder' | 'onClick'>
>

let uuid = 0
const ImageInternal = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'VcImage',
  inheritAttrs: false,
  props: imageProps(),
  emits: ['click', 'error'],
  setup(props, { attrs, slots, emit }) {
    const prefixCls = computed(() => props.prefixCls)
    const previewPrefixCls = computed(() => `${prefixCls.value}-preview`)
    const preview = computed<ImagePreviewType>(() => {
      const defaultValues = {
        visible: undefined,
        onVisibleChange: () => {},
        getContainer: undefined,
      }
      return typeof props.preview === 'object'
        ? mergeDefaultValue(props.preview, defaultValues)
        : defaultValues
    })
    const src = computed(() => preview.value.src ?? props.src)
    const isCustomPlaceholder = computed(
      () => (props.placeholder && props.placeholder !== true) || slots.placeholder,
    )
    const previewVisible = computed(() => preview.value.visible)
    const getPreviewContainer = computed(() => preview.value.getContainer)
    const isControlled = computed(() => previewVisible.value !== undefined)
    const imgCommonProps = computed<ImgHTMLAttributes>(() => {
      const commonProps = {}
      COMMON_PROPS.forEach((key) => {
        if (attrs[key])
          commonProps[key] = attrs[key]
      })
      return commonProps
    })

    const onPreviewVisibleChange = (val, preval) => {
      preview.value.onVisibleChange?.(val, preval)
    }
    const [isShowPreview, setShowPreview] = useMergedState(!!previewVisible.value, {
      value: previewVisible,
      onChange: onPreviewVisibleChange,
    })

    const status = ref<ImageStatus>(isCustomPlaceholder.value ? 'loading' : 'normal')
    watch(
      () => props.src,
      () => {
        status.value = isCustomPlaceholder.value ? 'loading' : 'normal'
      },
    )
    const mousePosition = ref<null | { x: number; y: number }>(null)
    const isError = computed(() => status.value === 'error')
    const groupContext = imageContext.inject()
    const {
      isPreviewGroup,
      setCurrent,
      setShowPreview: setGroupShowPreview,
      setMousePosition: setGroupMousePosition,
      registerImage,
    } = groupContext
    const currentId = ref(uuid++)
    const canPreview = computed(() => props.preview && !isError.value)
    const onLoad = () => {
      status.value = 'normal'
    }
    const onError = (e: Event) => {
      status.value = 'error'
      emit('error', e)
    }

    const onPreview: MouseEventHandler = (e) => {
      if (!isControlled.value) {
        const { left, top } = getOffset(e.target)

        if (isPreviewGroup.value) {
          setCurrent(currentId.value)
          setGroupMousePosition({
            x: left,
            y: top,
          })
        } else {
          mousePosition.value = {
            x: left,
            y: top,
          }
        }
      }
      if (isPreviewGroup.value)
        setGroupShowPreview(true)
      else
        setShowPreview(true)

      emit('click', e)
    }

    const onPreviewClose = () => {
      setShowPreview(false)
      if (!isControlled.value)
        mousePosition.value = null
    }

    const img = ref<HTMLImageElement>(null)
    watch(
      () => img,
      () => {
        if (status.value !== 'loading') return
        if (img.value.complete && (img.value.naturalWidth || img.value.naturalHeight))
          onLoad()
      },
    )
    let unRegister = () => {}
    onMounted(() => {
      watch(
        [src, canPreview],
        () => {
          unRegister()
          if (!isPreviewGroup.value)
            return () => {}

          unRegister = registerImage(
            currentId.value,
            src.value,
            canPreview.value,
            imgCommonProps.value,
          )

          if (!canPreview.value)
            unRegister()
        },
        { flush: 'post', immediate: true },
      )
    })
    onUnmounted(() => {
      unRegister()
    })
    const toSizePx = (l: number | string) => {
      if (isNumber(l)) return `${l}px`
      return l
    }
    return () => {
      const {
        prefixCls,
        wrapperClassName,
        fallback,
        src: imgSrc,
        placeholder,
        wrapperStyle,
        rootClassName,
      } = props
      const { width, height, class: cls, style, alt } = attrs as ImgHTMLAttributes
      const { icons, maskClassName, ...dialogProps } = preview.value

      const wrappperClass = classNames(prefixCls, wrapperClassName, rootClassName, {
        [`${prefixCls}-error`]: isError.value,
      })
      const mergedSrc = isError.value && fallback ? fallback : src.value
      const commonProps = {
        ...imgCommonProps.value,
        width,
        height,
        class: classNames(
          `${prefixCls}-img`,
          {
            [`${prefixCls}-img-placeholder`]: placeholder === true,
          },
          cls,
        ),
        style: {
          height: toSizePx(height),
          ...(style as CSSProperties),
        },
      }

      return (
        <>
          <div
            class={wrappperClass}
            onClick={
              canPreview.value
                ? onPreview
                : e => emit('click', e)
            }
            style={{
              width: toSizePx(width),
              height: toSizePx(height),
              ...wrapperStyle,
            }}
          >
            <img
              {...commonProps}
              {...(isError.value && fallback
                ? {
                    src: fallback,
                  }
                : { onLoad, onError, src: imgSrc })}
              ref={img}
            />

            {status.value === 'loading' && (
              <div aria-hidden="true" class={`${prefixCls}-placeholder`}>
                {placeholder || (slots.placeholder && slots.placeholder())}
              </div>
            )}
            {/* Preview Click Mask */}
            {slots.previewMask && canPreview.value && (
              <div class={[`${prefixCls}-mask`, maskClassName]}>{slots.previewMask()}</div>
            )}
          </div>
          {!isPreviewGroup.value && canPreview.value && (
            <Preview
              {...dialogProps}
              aria-hidden={!isShowPreview.value}
              visible={isShowPreview.value}
              prefixCls={previewPrefixCls.value}
              onClose={onPreviewClose}
              mousePosition={mousePosition.value}
              src={mergedSrc}
              alt={alt}
              getContainer={getPreviewContainer.value}
              icons={icons}
              rootClassName={rootClassName}
              imgCommonProps={imgCommonProps.value}
            />
          )}
        </>
      )
    }
  },
})
ImageInternal.PreviewGroup = PreviewGroup

export default ImageInternal as typeof ImageInternal & {
  readonly PreviewGroup: typeof PreviewGroup;
}
