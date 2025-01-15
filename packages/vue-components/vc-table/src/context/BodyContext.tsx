import type { InjectionKey } from 'vue'
import type {
  ColumnsType,
  ColumnType,
  DefaultRecordType,
  ExpandableType,
  ExpandedRowRender,
  RenderExpandIcon,
  RowClassName,
  TableLayout,
  TriggerEventHandler,
} from '../interface'
import { inject, provide } from 'vue'

export interface BodyContextProps<RecordType = DefaultRecordType> {
  rowClassName: string | RowClassName<RecordType>;
  expandedRowClassName: RowClassName<RecordType>;

  columns: ColumnsType<RecordType>;
  flattenColumns: ReadonlyArray<ColumnType<RecordType>>;

  tableLayout: TableLayout;

  indentSize: number;
  expandableType: ExpandableType;
  expandRowByClick: boolean;
  expandedRowRender: ExpandedRowRender<RecordType>;
  expandIcon: RenderExpandIcon<RecordType>;
  onTriggerExpand: TriggerEventHandler<RecordType>;
  expandIconColumnIndex: number;
}
export const BodyContextKey: InjectionKey<BodyContextProps> = Symbol('BodyContextProps')

export function useProvideBody(props: BodyContextProps) {
  provide(BodyContextKey, props)
}

export function useInjectBody() {
  return inject(BodyContextKey, {} as BodyContextProps)
}
