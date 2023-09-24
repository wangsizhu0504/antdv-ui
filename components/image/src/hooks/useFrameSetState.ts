import { onMounted, reactive, ref } from 'vue'
import { wrapperRaf } from '../../../_utils/vue'

type SetActionType<T> = Partial<T> | ((state: T) => Partial<T>)
export default function useFrameSetState<T extends object>(
  initial: T,
): [Record<string, any>, (newState: SetActionType<T>) => void] {
  const frame = ref<number>(null)
  const state = reactive({ ...initial })
  const queue = ref<SetActionType<T>[]>([])

  const setFrameState = (newState: SetActionType<T>) => {
    if (frame.value === null) {
      queue.value = []
      frame.value = wrapperRaf(() => {
        let memoState: any
        queue.value.forEach((queueState: object) => {
          memoState = { ...memoState, ...queueState }
        })
        Object.assign(state, memoState)
        frame.value = null
      })
    }

    queue.value.push(newState as any)
  }
  onMounted(() => {
    frame.value && wrapperRaf.cancel(frame.value)
  })
  return [state, setFrameState]
}
