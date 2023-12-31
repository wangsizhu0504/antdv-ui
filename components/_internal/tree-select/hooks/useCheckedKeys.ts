import { shallowRef, watchEffect } from 'vue'
import { conductCheck } from '../../tree/utils/conductUtil'
import type { Ref, ShallowRef } from 'vue'
import type { Key } from '../../../_utils/types'
import type { DataEntity } from '../../tree/interface'
import type { LabeledValueType, RawValueType } from '../TreeSelect'

export default (
  rawLabeledValues: ShallowRef<LabeledValueType[]>,
  rawHalfCheckedValues: ShallowRef<LabeledValueType[]>,
  treeConduction: Ref<boolean>,
  keyEntities: Ref<Record<Key, DataEntity>>,
  maxLevel: Ref<number>,
  levelEntities: ShallowRef<Map<number, Set<DataEntity>>>,
) => {
  const newRawCheckedValues = shallowRef<RawValueType[]>([])
  const newRawHalfCheckedValues = shallowRef<RawValueType[]>([])

  watchEffect(() => {
    let checkedKeys: RawValueType[] = rawLabeledValues.value.map(({ value }) => value)
    let halfCheckedKeys: RawValueType[] = rawHalfCheckedValues.value.map(({ value }) => value)

    const missingValues = checkedKeys.filter(key => !keyEntities.value[key])

    if (treeConduction.value) {
      ({ checkedKeys, halfCheckedKeys } = conductCheck(
        checkedKeys,
        true,
        keyEntities.value,
        maxLevel.value,
        levelEntities.value,
      ))
    }
    newRawCheckedValues.value = Array.from(new Set([...missingValues, ...checkedKeys]))
    newRawHalfCheckedValues.value = halfCheckedKeys
  })
  return [newRawCheckedValues, newRawHalfCheckedValues]
}
