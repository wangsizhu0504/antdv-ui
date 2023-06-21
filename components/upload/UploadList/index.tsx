import { FileTwoTone, LoadingOutlined, PaperClipOutlined, PictureTwoTone } from '@ant-design/icons-vue'
import type { HTMLAttributes } from 'vue'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  shallowRef,
  watchEffect,
} from 'vue'
import { isImageUrl, previewImage } from '../utils'
import { uploadListProps } from '../interface'
import type { InternalUploadFile, UploadFile } from '../interface'
import Button from '../../button'
import type { ButtonProps } from '../../button'
import { filterEmpty, initDefaultProps, isValidElement } from '../../_util/props-util'
import type { VueNode } from '../../_util/type'
import { useConfigInject } from '../../hooks'
import { TransitionGroup, getTransitionGroupProps } from '../../_util/components/transition'
import collapseMotion from '../../_util/components/collapseMotion'
import ListItem from './ListItem'

const HackSlot = (_, { slots }) => {
  return filterEmpty(slots.default?.())[0]
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AUploadList',
  props: initDefaultProps(uploadListProps(), {
    listType: 'text', // or picture
    progress: {
      strokeWidth: 2,
      showInfo: false,
    },
    showRemoveIcon: true,
    showDownloadIcon: false,
    showPreviewIcon: true,
    previewFile: previewImage,
    isImageUrl,
    items: [],
    appendActionVisible: true,
  }),
  setup(props, { slots, expose }) {
    const motionAppear = shallowRef(false)
    const instance = getCurrentInstance()
    onMounted(() => {
      motionAppear.value = true
    })
    watchEffect(() => {
      if (props.listType !== 'picture' && props.listType !== 'picture-card')
        return;

      (props.items || []).forEach((file: InternalUploadFile) => {
        if (
          typeof document === 'undefined'
          || typeof window === 'undefined'
          || !(window as any).FileReader
          || !(window as any).File
          || !(file.originFileObj instanceof File || (file.originFileObj as any) instanceof Blob)
          || file.thumbUrl !== undefined
        )
          return

        file.thumbUrl = ''
        if (props.previewFile) {
          props.previewFile(file.originFileObj).then((previewDataUrl: string) => {
            // Need append '' to avoid dead loop
            file.thumbUrl = previewDataUrl || ''
            instance.update()
          })
        }
      })
    })

    // ============================= Events =============================
    const onInternalPreview = (file: UploadFile, e?: Event) => {
      if (!props.onPreview)
        return

      e?.preventDefault()
      return props.onPreview(file)
    }

    const onInternalDownload = (file: UploadFile) => {
      if (typeof props.onDownload === 'function')
        props.onDownload(file)
      else if (file.url)
        window.open(file.url)
    }

    const onInternalClose = (file: UploadFile) => {
      props.onRemove?.(file)
    }

    const internalIconRender = ({ file }: { file: UploadFile }) => {
      const iconRender = props.iconRender || slots.iconRender
      if (iconRender)
        return iconRender({ file, listType: props.listType })

      const isLoading = file.status === 'uploading'
      const fileIcon
        = (props.isImageUrl && props.isImageUrl(file)) ? <PictureTwoTone /> : <FileTwoTone />
      let icon: VueNode = isLoading ? <LoadingOutlined /> : <PaperClipOutlined />
      if (props.listType === 'picture')
        icon = isLoading ? <LoadingOutlined /> : fileIcon
      else if (props.listType === 'picture-card')
        icon = isLoading ? props.locale.uploading : fileIcon

      return icon
    }

    const actionIconRender = (opt: {
      customIcon: VueNode
      callback: () => void
      prefixCls: string
      title?: string
    }) => {
      const { customIcon, callback, prefixCls, title } = opt
      const btnProps: ButtonProps & HTMLAttributes = {
        type: 'text',
        size: 'small',
        title,
        onClick: () => {
          callback()
        },
        class: `${prefixCls}-list-item-action`,
      }
      if (isValidElement(customIcon))
        return <Button {...btnProps} v-slots={{ icon: () => customIcon }} />

      return (
        <Button {...btnProps}>
          <span>{customIcon}</span>
        </Button>
      )
    }

    expose({
      handlePreview: onInternalPreview,
      handleDownload: onInternalDownload,
    })

    const { prefixCls, rootPrefixCls } = useConfigInject('upload', props)

    const listClassNames = computed(() => ({
      [`${prefixCls.value}-list`]: true,
      [`${prefixCls.value}-list-${props.listType}`]: true,
    }))
    const transitionGroupProps = computed(() => {
      const motion = {
        ...collapseMotion(`${rootPrefixCls.value}-motion-collapse`),
      }
      delete motion.onAfterAppear
      delete motion.onAfterEnter
      delete motion.onAfterLeave
      const motionConfig = {
        ...getTransitionGroupProps(
          `${prefixCls.value}-${props.listType === 'picture-card' ? 'animate-inline' : 'animate'}`,
        ),
        class: listClassNames.value,
        appear: motionAppear.value,
      }
      return props.listType !== 'picture-card'
        ? {
            ...motion,
            ...motionConfig,
          }
        : motionConfig
    })
    return () => {
      const {
        listType,
        locale,
        isImageUrl: isImgUrl,
        items = [],
        showPreviewIcon,
        showRemoveIcon,
        showDownloadIcon,
        removeIcon,
        previewIcon,
        downloadIcon,
        progress,
        appendAction,
        itemRender,
        appendActionVisible,
      } = props
      const appendActionDom = appendAction?.()
      return (
        <TransitionGroup {...transitionGroupProps.value} tag="div">
          {items.map((file) => {
            const { uid: key } = file
            return (
              <ListItem
                key={key}
                locale={locale}
                prefixCls={prefixCls.value}
                file={file}
                items={items}
                progress={progress}
                listType={listType}
                isImgUrl={isImgUrl}
                showPreviewIcon={showPreviewIcon}
                showRemoveIcon={showRemoveIcon}
                showDownloadIcon={showDownloadIcon}
                onPreview={onInternalPreview}
                onDownload={onInternalDownload}
                onClose={onInternalClose}
                removeIcon={removeIcon}
                previewIcon={previewIcon}
                downloadIcon={downloadIcon}
                itemRender={itemRender}
                v-slots={{
                  ...slots,
                  iconRender: internalIconRender,
                  actionIconRender,
                }}
              />
            )
          })}
          {appendAction
            ? (
            <HackSlot
              key="__ant_upload_appendAction"
              v-show={!!appendActionVisible}
              v-slots={{ default: () => appendActionDom }}
            ></HackSlot>
              )
            : null}
        </TransitionGroup>
      )
    }
  },
})
