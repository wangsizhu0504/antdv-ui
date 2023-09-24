export interface ContentRef {
  focus: () => void
  changeActive: (next: boolean) => void
}

export type CompatibleDocument = {
  parentWindow?: Window
} & Document
