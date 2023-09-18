import { renderSlot } from 'vue'
import { EXPAND_COLUMN } from '../../vc-table'
import devWarning from '../../vc-util/devWarning'
import { SELECTION_COLUMN } from './useSelection'
import type { Ref } from 'vue'
import type { ContextSlots, TableColumnsType, TransformColumns } from '../types'

function fillSlots<RecordType>(columns: TableColumnsType<RecordType>, contextSlots: Ref<ContextSlots>) {
  const $slots = contextSlots.value
  return columns.map((column) => {
    if (column === SELECTION_COLUMN || column === EXPAND_COLUMN) return column
    const cloneColumn = { ...column }
    const { slots = {} } = cloneColumn
    cloneColumn.__originColumn__ = column
    devWarning(
      !('slots' in cloneColumn),
      'Table',
      '`column.slots` is deprecated. Please use `v-slot:headerCell` `v-slot:bodyCell` instead.',
    )

    Object.keys(slots).forEach((key) => {
      const name = slots[key]
      if (cloneColumn[key] === undefined && $slots[name])
        cloneColumn[key] = $slots[name]
    })

    if (contextSlots.value.headerCell && !column.slots?.title) {
      cloneColumn.title = renderSlot(
        contextSlots.value,
        'headerCell',
        {
          title: column.title,
          column,
        },
        () => [column.title as any],
      )
    }
    if ('children' in cloneColumn && Array.isArray(cloneColumn.children))
      cloneColumn.children = fillSlots(cloneColumn.children, contextSlots)

    return cloneColumn
  })
}

export default function useColumns<RecordType>(
  contextSlots: Ref<ContextSlots>,
): [TransformColumns<RecordType>] {
  const filledColumns = (columns: TableColumnsType<RecordType>) => fillSlots(columns, contextSlots)

  return [filledColumns]
}
