import { shallowRef, watchEffect } from 'vue'
import { convertDataToEntities } from '../../tree/utils/treeUtil'
import { isNil } from '../utils/valueUtil'
import { warningFn } from '../../../_utils/log'
import type { DataEntity } from '../../tree/interface'
import type { FieldNames, RawValueType } from '../TreeSelect'

import type { Ref, ShallowRef } from 'vue'

export default (treeData: ShallowRef<any>, fieldNames: Ref<FieldNames>) => {
  const valueEntities = shallowRef<Map<RawValueType, DataEntity>>(new Map())
  const keyEntities = shallowRef<Record<string, DataEntity>>({})
  watchEffect(() => {
    const fieldNamesValue = fieldNames.value
    const collection = convertDataToEntities(treeData.value, {
      fieldNames: fieldNamesValue,
      initWrapper: wrapper => ({
        ...wrapper,
        valueEntities: new Map(),
      }),
      processEntity: (entity, wrapper: any) => {
        const val = entity.node[fieldNamesValue.value]

        // Check if exist same value
        if (process.env.NODE_ENV !== 'production') {
          const key = entity.node.key

          warningFn(!isNil(val), 'TreeNode `value` is invalidate: undefined')
          warningFn(!wrapper.valueEntities.has(val), `Same \`value\` exist in the tree: ${val}`)
          warningFn(
            !key || String(key) === String(val),
            `\`key\` or \`value\` with TreeNode must be the same or you can remove one of them. key: ${key}, value: ${val}.`,
          )
        }
        wrapper.valueEntities.set(val, entity)
      },
    }) as any
    valueEntities.value = collection.valueEntities
    keyEntities.value = collection.keyEntities
  })
  return { valueEntities, keyEntities }
}
