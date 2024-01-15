import { computed, inject, provide, ref, shallowRef } from 'vue'
import type { GroupConsumerValue } from './interface'

const previewGroupContext = Symbol('previewGroupContext')

export const imageContext = {
  provide: (val: GroupConsumerValue) => {
    provide(previewGroupContext, val)
  },
  inject: () => {
    return inject<GroupConsumerValue>(previewGroupContext, {
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
  },
}
