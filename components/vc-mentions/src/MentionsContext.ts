import type { InjectionKey, Ref } from 'vue'
import type { VcMentionOptionProps } from './props'

export interface MentionsContext {
  activeIndex: Ref<number>
  setActiveIndex?: (index: number) => void
  selectOption?: (option: VcMentionOptionProps) => void
  onFocus?: EventListener
  onBlur?: EventListener
  loading?: Ref<boolean>
}

const MentionsContextKey: InjectionKey<MentionsContext> = Symbol('MentionsContextKey')

export default MentionsContextKey
