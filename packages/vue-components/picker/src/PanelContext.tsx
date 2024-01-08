import { inject, provide } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { OnSelect, PanelMode } from './interface'

export interface ContextOperationRefProps {
  onKeydown?: (e: KeyboardEvent) => boolean
  onClose?: () => void
}

export interface PanelContextProps {
  operationRef?: Ref<ContextOperationRefProps | null>
  /** Only work with time panel */
  hideHeader?: Ref<boolean>
  panelRef?: Ref<HTMLDivElement>
  hidePrevBtn?: Ref<boolean>
  hideNextBtn?: Ref<boolean>
  onDateMouseenter?: (date: any) => void
  onDateMouseleave?: (date: any) => void
  onSelect?: OnSelect<any>
  hideRanges?: Ref<boolean>
  open?: Ref<boolean>
  mode?: Ref<PanelMode>

  /** Only used for TimePicker and this is a deprecated prop */
  defaultOpenValue?: Ref<any>
}

const PanelContextKey: InjectionKey<PanelContextProps> = Symbol('PanelContextProps')

export function useProvidePanel(props: PanelContextProps) {
  provide(PanelContextKey, props)
}

export function useInjectPanel() {
  return inject(PanelContextKey, {})
}

export default PanelContextKey
