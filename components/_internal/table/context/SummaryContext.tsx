import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'
import type { ColumnType, StickyOffsets } from '../interface'

export type FlattenColumns<RecordType> = readonly (ColumnType<RecordType> & {
  scrollbar?: boolean
})[]
interface SummaryContextProps {
  stickyOffsets?: StickyOffsets
  scrollColumnIndex?: number
  flattenColumns?: FlattenColumns<any>
}

export const SummaryContextKey: InjectionKey<SummaryContextProps> = Symbol('SummaryContextProps')

export const useProvideSummary = (props: SummaryContextProps) => {
  provide(SummaryContextKey, props)
}

export const useInjectSummary = () => {
  return inject(SummaryContextKey, {} as SummaryContextProps)
}
