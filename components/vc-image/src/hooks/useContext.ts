import { type ComputedRef, type InjectionKey, type Ref, computed, ref, shallowRef } from 'vue'
import { createContextFn, useContext } from '../../../hooks'

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
  return useContext<GroupConsumerContext>(key, {
    isPreviewGroup: shallowRef(false),
    previewUrls: computed(() => new Map()),
    setPreviewUrls: () => {},
    current: ref(null),
    setCurrent: () => {},
    setShowPreview: () => {},
    setMousePosition: () => {},
    registerImage: null,
    rootClassName: '',
  })
}
