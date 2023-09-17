import {
  arrayType,
  booleanType,
  functionType,
  objectType,
  someType,
  stringType,
} from '../_util/type'
import type { BeforeUploadValueType, FileType, HttpRequestHeader, ItemRender, PreviewFileHandler, ShowUploadListInterface, TransformFileHandler, UploadChangeParam, UploadFile, UploadListProgressProps, UploadListType, UploadType } from './types'
import type { ExtractPropTypes } from 'vue'
import type { UploadLocale } from '../locale'
import type {
  UploadRequestOption as RcCustomRequestOptions,
} from '../vc-upload/interface'
import type { VueNode } from '../_util/type'

export function uploadProps<T = any>() {
  return {
    'capture': someType<boolean | 'user' | 'environment'>([Boolean, String]),
    'type': stringType<UploadType>(),
    'name': String,
    'defaultFileList': arrayType<Array<UploadFile<T>>>(),
    'fileList': arrayType<Array<UploadFile<T>>>(),
    'action': someType<
      string | ((file: FileType) => string) | ((file: FileType) => PromiseLike<string>)
        >([String, Function]),
    'directory': booleanType(),
    'data': someType<
      | Record<string, unknown>
      | ((file: UploadFile<T>) => Record<string, unknown> | Promise<Record<string, unknown>>)
        >([Object, Function]),
    'method': stringType<'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch'>(),
    'headers': objectType<HttpRequestHeader>(),
    'showUploadList': someType<boolean | ShowUploadListInterface>([Boolean, Object]),
    'multiple': booleanType(),
    'accept': String,
    'beforeUpload':
      functionType<
        (
          file: FileType,
          FileList: FileType[],
        ) => BeforeUploadValueType | Promise<BeforeUploadValueType>
      >(),
    'onChange': functionType<(info: UploadChangeParam<UploadFile<T>>) => void>(),
    'onUpdate:fileList':
      functionType<(fileList: UploadChangeParam<UploadFile<T>>['fileList']) => void>(),
    'onDrop': functionType<(event: DragEvent) => void>(),
    'listType': stringType<UploadListType>(),
    'onPreview': functionType<(file: UploadFile<T>) => void>(),
    'onDownload': functionType<(file: UploadFile<T>) => void>(),
    'onReject': functionType<(fileList: FileType[]) => void>(),
    'onRemove': functionType<(file: UploadFile<T>) => void | boolean | Promise<void | boolean>>(),
    /** @deprecated Please use `onRemove` directly */
    'remove': functionType<(file: UploadFile<T>) => void | boolean | Promise<void | boolean>>(),
    'supportServerRender': booleanType(),
    'disabled': booleanType(),
    'prefixCls': String,
    'customRequest': functionType<(options: RcCustomRequestOptions) => void>(),
    'withCredentials': booleanType(),
    'openFileDialogOnClick': booleanType(),
    'locale': objectType<UploadLocale>(),
    'id': String,
    'previewFile': functionType<PreviewFileHandler>(),
    /** @deprecated Please use `beforeUpload` directly */
    'transformFile': functionType<TransformFileHandler>(),
    'iconRender':
      functionType<(opt: { file: UploadFile<T>, listType?: UploadListType }) => VueNode>(),
    'isImageUrl': functionType<(file: UploadFile) => boolean>(),
    'progress': objectType<UploadListProgressProps>(),
    'itemRender': functionType<ItemRender<T>>(),
    /** Config max count of `fileList`. Will replace current one when `maxCount` is 1 */
    'maxCount': Number,
    'height': someType([Number, String]),
    'removeIcon': functionType<(opt: { file: UploadFile }) => VueNode>(),
    'downloadIcon': functionType<(opt: { file: UploadFile }) => VueNode>(),
    'previewIcon': functionType<(opt: { file: UploadFile }) => VueNode>(),
  }
}

export function uploadListProps<T = any>() {
  return {
    listType: stringType<UploadListType>(),
    onPreview: functionType<(file: UploadFile<T>) => void>(),
    onDownload: functionType<(file: UploadFile<T>) => void>(),
    onRemove: functionType<(file: UploadFile<T>) => void | boolean>(),
    items: arrayType<Array<UploadFile<T>>>(),
    progress: objectType<UploadListProgressProps>(),
    prefixCls: stringType<string>(),
    showRemoveIcon: booleanType(),
    showDownloadIcon: booleanType(),
    showPreviewIcon: booleanType(),
    removeIcon: functionType<(opt: { file: UploadFile }) => VueNode>(),
    downloadIcon: functionType<(opt: { file: UploadFile }) => VueNode>(),
    previewIcon: functionType<(opt: { file: UploadFile }) => VueNode>(),
    locale: objectType<UploadLocale>(undefined as UploadLocale),
    previewFile: functionType<PreviewFileHandler>(),
    iconRender:
      functionType<(opt: { file: UploadFile<T>, listType?: UploadListType }) => VueNode>(),
    isImageUrl: functionType<(file: UploadFile) => boolean>(),
    appendAction: functionType<() => VueNode>(),
    appendActionVisible: booleanType(),
    itemRender: functionType<ItemRender<T>>(),
  }
}

export const listItemProps = () => {
  return {
    prefixCls: String,
    locale: objectType<UploadLocale>(undefined as UploadLocale),
    file: objectType<UploadFile>(),
    items: arrayType<UploadFile[]>(),
    listType: stringType<UploadListType>(),
    isImgUrl: functionType<(file: UploadFile) => boolean>(),

    showRemoveIcon: booleanType(),
    showDownloadIcon: booleanType(),
    showPreviewIcon: booleanType(),
    removeIcon: functionType<(opt: { file: UploadFile }) => VueNode>(),
    downloadIcon: functionType<(opt: { file: UploadFile }) => VueNode>(),
    previewIcon: functionType<(opt: { file: UploadFile }) => VueNode>(),

    iconRender: functionType<(opt: { file: UploadFile }) => VueNode>(),
    actionIconRender:
      functionType<
        (opt: {
          customIcon: VueNode
          callback: () => void
          prefixCls: string
          title?: string | undefined
        }) => VueNode
      >(),
    itemRender: functionType<ItemRender>(),
    onPreview: functionType<(file: UploadFile, e: Event) => void>(),
    onClose: functionType<(file: UploadFile) => void>(),
    onDownload: functionType<(file: UploadFile) => void>(),
    progress: objectType<UploadListProgressProps>(),
  }
}

export type ListItemProps = Partial<ExtractPropTypes<ReturnType<typeof listItemProps>>>
export type UploadListProps = Partial<ExtractPropTypes<ReturnType<typeof uploadListProps>>>

export type UploadProps = Partial<ExtractPropTypes<ReturnType<typeof uploadProps>>>
