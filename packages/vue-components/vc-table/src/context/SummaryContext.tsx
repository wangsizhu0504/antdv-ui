import type { InjectionKey } from 'vue';
import type { ColumnType, StickyOffsets } from '../interface';
import { inject, provide } from 'vue';

export type FlattenColumns<RecordType> = ReadonlyArray<ColumnType<RecordType> & {
  scrollbar?: boolean;
}>;
interface SummaryContextProps {
  stickyOffsets?: StickyOffsets;
  scrollColumnIndex?: number;
  flattenColumns?: FlattenColumns<any>;
}

export const SummaryContextKey: InjectionKey<SummaryContextProps> = Symbol('SummaryContextProps');

export function useProvideSummary(props: SummaryContextProps) {
  provide(SummaryContextKey, props);
}

export function useInjectSummary() {
  return inject(SummaryContextKey, {} as SummaryContextProps);
}
