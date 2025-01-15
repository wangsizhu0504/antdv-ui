import type { InjectionKey } from 'vue'
import type { GetComponent, TransformCellText } from '../interface'
import type { FixedInfo } from '../utils/fixUtil'
import { inject, provide } from 'vue'

export interface TableContextProps {
  // Table context
  prefixCls: string;

  getComponent: GetComponent;

  scrollbarSize: number;

  direction: 'ltr' | 'rtl';

  fixedInfoList: readonly FixedInfo[];

  isSticky: boolean;

  summaryCollect: (uniKey: string, fixed: boolean | string) => void;

  transformCellText: TransformCellText<unknown>;
}

export const TableContextKey: InjectionKey<TableContextProps> = Symbol('TableContextProps')

export function useProvideTable(props: TableContextProps) {
  provide(TableContextKey, props)
}

export function useInjectTable() {
  return inject(TableContextKey, {} as TableContextProps)
}
