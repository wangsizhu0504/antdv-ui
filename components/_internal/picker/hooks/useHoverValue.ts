import { onBeforeUnmount, ref, watch } from 'vue'
import { wrapperRaf } from '../../../_utils/vue'
import useValueTexts from './useValueTexts'
import type { ValueTextConfig } from './useValueTexts'
import type { ComputedRef, Ref, UnwrapRef } from 'vue'

export default function useHoverValue<DateType>(
  valueText: Ref<string>,
  { formatList, generateConfig, locale }: ValueTextConfig<DateType>,
): [ComputedRef<string>, (date: DateType) => void, (immediately?: boolean) => void] {
  const innerValue = ref<DateType>(null)
  let rafId: number

  function setValue(val: DateType, immediately = false) {
    wrapperRaf.cancel(rafId)
    if (immediately) {
      innerValue.value = val as UnwrapRef<DateType>
      return
    }
    rafId = wrapperRaf(() => {
      innerValue.value = val as UnwrapRef<DateType>
    })
  }

  const [, firstText] = useValueTexts(innerValue as Ref<DateType>, {
    formatList,
    generateConfig,
    locale,
  })
  function onEnter(date: DateType) {
    setValue(date)
  }

  function onLeave(immediately = false) {
    setValue(null, immediately)
  }

  watch(valueText, () => {
    onLeave(true)
  })
  onBeforeUnmount(() => {
    wrapperRaf.cancel(rafId)
  })

  return [firstText, onEnter, onLeave]
}
