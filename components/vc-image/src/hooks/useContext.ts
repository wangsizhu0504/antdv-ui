import { createContextFn, useContext } from '../../../hooks'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface GroupConsumerContext {
  isPreviewGroup?: Ref<boolean | undefined>
  previewUrls: ComputedRef<Map<number, string>>
  setPreviewUrls: (id: number, url: string, canPreview?: boolean) => void
  current: Ref<number>
  setCurrent: (current: number) => void
  setShowPreview: (isShowPreview: boolean) => void
  setMousePosition: (mousePosition: null | { x: number, y: number }) => void
  registerImage: (id: number, url: string, canPreview?: boolean) => () => void
  rootClassName?: string
}

const key: InjectionKey<GroupConsumerContext> = Symbol('PreviewGroupInjectionKey')

export function createGroupProviderContext(context: GroupConsumerContext) {
  return createContextFn<GroupConsumerContext>(key, context)
}

export function useGroupProviderContext() {
  return useContext<GroupConsumerContext>(key)
}
