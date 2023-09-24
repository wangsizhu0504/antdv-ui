import { computed } from 'vue'
import { VALUE_SPLIT } from '../utils/commonUtil'
import { convertDataToEntities } from '../../../_internal/tree/utils/treeUtil'
import type { DefaultOptionType, InternalFieldNames } from '../interface'
import type { Ref } from 'vue'

/** Lazy parse options data into conduct-able info to avoid perf issue in single mode */
export default (options: Ref<DefaultOptionType[]>, fieldNames: Ref<InternalFieldNames>) => {
  const entities = computed(() => {
    return (
      convertDataToEntities(options.value as any, {
        fieldNames: fieldNames.value,
        initWrapper: wrapper => ({
          ...wrapper,
          pathKeyEntities: {},
        }),
        processEntity: (entity, wrapper: any) => {
          const pathKey = entity.nodes.map(node => node[fieldNames.value.value]).join(VALUE_SPLIT)

          wrapper.pathKeyEntities[pathKey] = entity

          // Overwrite origin key.
          // this is very hack but we need let conduct logic work with connect path
          entity.key = pathKey
        },
      }) as any
    ).pathKeyEntities
  })
  return entities
}
