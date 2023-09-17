import type { CSSProperties, ImgHTMLAttributes } from 'vue'
import type { ProgressProps } from '../progress'
import type {
  RcFile as OriRcFile,
} from '../vc-upload/interface'
import type { VueNode } from '../_util/type'

export interface FileType extends OriRcFile {
  readonly lastModifiedDate: Date
}

export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed'

export interface HttpRequestHeader {
  [key: string]: string
}

export interface UploadFile<T = any> {
  uid: string
  size?: number
  name: string
  fileName?: string
  lastModified?: number
  lastModifiedDate?: Date
  url?: string
  status?: UploadFileStatus
  percent?: number
  thumbUrl?: string
  crossOrigin?: ImgHTMLAttributes['crossorigin']
  originFileObj?: FileType
  response?: T
  error?: any
  linkProps?: any
  type?: string
  xhr?: T
  preview?: string
}

export interface InternalUploadFile<T = any> extends UploadFile<T> {
  originFileObj: FileType
}

export interface ShowUploadListInterface {
  showRemoveIcon?: boolean
  showPreviewIcon?: boolean
  showDownloadIcon?: boolean
}

export interface UploadChangeParam<T = UploadFile> {
  // https://github.com/ant-design/ant-design/issues/14420
  file: T
  fileList: T[]
  event?: { percent: number }
}

export type UploadType = 'drag' | 'select'
export type UploadListType = 'text' | 'picture' | 'picture-card'
export type UploadListProgressProps = Omit<ProgressProps, 'percent' | 'type'> & {
  class?: string
  style?: CSSProperties
}

export type ItemRender<T = any> = (opt: {
  originNode: VueNode
  file: UploadFile
  fileList: Array<UploadFile<T>>
  actions: {
    download: () => void
    preview: () => void
    remove: () => void
  }
}) => VueNode

export type PreviewFileHandler = (file: FileType | Blob) => PromiseLike<string>
export type TransformFileHandler = (
  file: FileType,
) => string | Blob | FileType | PromiseLike<string | Blob | FileType>
export type BeforeUploadValueType = void | boolean | string | Blob | FileType

export interface UploadState<T = any> {
  fileList: UploadFile<T>[]
  dragState: string
}
