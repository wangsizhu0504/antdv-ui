export type BeforeUploadFileType = File | Blob | boolean | string

export type Action = string | ((file: RcFile) => string | PromiseLike<string>)

export interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number
}

export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch'

export type UploadRequestHeader = Record<string, string>

export interface UploadRequestError extends Error {
  status?: number
  method?: UploadRequestMethod
  url?: string
}

export interface UploadRequestOption<T = any> {
  onProgress?: (event: UploadProgressEvent) => void
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void
  data?: Record<string, unknown>
  filename?: string
  file: Exclude<BeforeUploadFileType, File | boolean> | RcFile
  withCredentials?: boolean
  action: string
  headers?: UploadRequestHeader
  method: UploadRequestMethod
}

export interface RcFile extends File {
  uid: string
}
