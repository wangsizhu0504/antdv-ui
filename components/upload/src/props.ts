import {
  arrayType,
  booleanType,
  functionType,
  objectType,
  someType,
  stringType,
} from '../../_utils/vue'
import type { BeforeUploadValueType, FileType, HttpRequestHeader, ItemRender, PreviewFileHandler, ShowUploadListInterface, TransformFileHandler, UploadChangeParam, UploadFile, UploadListProgressProps, UploadListType, UploadType } from './types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { UploadLocale } from '../../locale'
import type { Action, BeforeUploadFileType, UploadRequestOption as RcCustomRequestOptions, RcFile, UploadProgressEvent, UploadRequestHeader, UploadRequestMethod, UploadRequestOption } from './interface'
import type { VueNode } from '../../_utils/types'

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

export const uploadListItemProps = () => {
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

export const uploadRenderProps = () => {
  return {
    capture: [Boolean, String] as PropType<boolean | 'user' | 'environment'>,
    multipart: { type: Boolean, default: undefined },
    name: String,
    disabled: { type: Boolean, default: undefined },
    componentTag: String as PropType<any>,
    action: [String, Function] as PropType<Action>,
    method: String as PropType<UploadRequestMethod>,
    directory: { type: Boolean, default: undefined },
    data: [Object, Function] as PropType<
      Record<string, unknown> | ((file: RcFile | string | Blob) => Record<string, unknown>)
    >,
    headers: Object as PropType<UploadRequestHeader>,
    accept: String,
    multiple: { type: Boolean, default: undefined },
    onBatchStart: Function as PropType<
      (fileList: { file: RcFile, parsedFile: Exclude<BeforeUploadFileType, boolean> }[]) => void
    >,
    onReject: Function as PropType<(fileList: RcFile[]) => void>,
    onStart: Function as PropType<(file: RcFile) => void>,
    onError: Function as PropType<
      (error: Error, ret: Record<string, unknown>, file: RcFile) => void
    >,
    onSuccess: Function as PropType<
      (response: Record<string, unknown>, file: RcFile, xhr: XMLHttpRequest) => void
    >,
    onProgress: Function as PropType<(event: UploadProgressEvent, file: RcFile) => void>,
    beforeUpload: Function as PropType<
      (
        file: RcFile,
        FileList: RcFile[],
      ) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>
    >,
    customRequest: Function as PropType<(option: UploadRequestOption) => void>,
    withCredentials: { type: Boolean, default: undefined },
    openFileDialogOnClick: { type: Boolean, default: undefined },
    prefixCls: String,
    id: String,
    onMouseenter: Function as PropType<(e: MouseEvent) => void>,
    onMouseleave: Function as PropType<(e: MouseEvent) => void>,
    onClick: Function as PropType<(e: MouseEvent | KeyboardEvent) => void>,
  }
}

export type UploadRenderProps = Partial<ExtractPropTypes<ReturnType<typeof uploadRenderProps>>>

export type UploadListProps = Partial<ExtractPropTypes<ReturnType<typeof uploadListProps>>>

export type UploadListItemProps = Partial<ExtractPropTypes<ReturnType<typeof uploadListItemProps>>>

export type UploadProps = Partial<ExtractPropTypes<ReturnType<typeof uploadProps>>>
