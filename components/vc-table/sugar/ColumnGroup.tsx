import type { FunctionalComponent } from 'vue'
import type { ColumnType } from '../interface'

/* istanbul ignore next */
/**
 * This is a syntactic sugar for `columns` prop.
 * So HOC will not work on this.
 */

export type ColumnGroupProps<RecordType> = ColumnType<RecordType>

const ColumnGroup: { <T>(arg: T): FunctionalComponent<ColumnGroupProps<T>> } = () => null

export default ColumnGroup
