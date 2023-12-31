import { computed } from 'vue'
import { toPathOptions } from '../utils/treeUtil'
import { toPathKey } from '../utils/commonUtil'

import { isValidElement } from '../../../_utils/is'
import { cloneElement } from '../../../_utils/dom'
import type { BaseCascaderProps } from '../props'
import type {
  DefaultOptionType,
  InternalFieldNames,
  SingleValueType,
} from '../interface'
import type { Ref, VNode } from 'vue'

export default (
  rawValues: Ref<SingleValueType[]>,
  options: Ref<DefaultOptionType[]>,
  fieldNames: Ref<InternalFieldNames>,
  multiple: Ref<boolean>,
  displayRender: Ref<BaseCascaderProps['displayRender']>,
) => {
  return computed(() => {
    const mergedDisplayRender = displayRender.value
      // Default displayRender
      || (({ labels }) => {
        const mergedLabels = multiple.value ? labels.slice(-1) : labels
        const SPLIT = ' / '

        if (mergedLabels.every(label => ['string', 'number'].includes(typeof label)))
          return mergedLabels.join(SPLIT)

        // If exist non-string value, use VueNode instead
        return mergedLabels.reduce((list, label, index) => {
          const keyedLabel = isValidElement(label)
            ? cloneElement(label as unknown as VNode, { key: index })
            : label

          if (index === 0)
            return [keyedLabel]

          return [...list, SPLIT, keyedLabel]
        }, [])
      })

    return rawValues.value.map((valueCells) => {
      const valueOptions = toPathOptions(valueCells, options.value, fieldNames.value)

      const label = mergedDisplayRender({
        labels: valueOptions.map(({ option, value }) => option?.[fieldNames.value.label] ?? value),
        selectedOptions: valueOptions.map(({ option }) => option),
      })
      const value = toPathKey(valueCells)
      return {
        label,
        value,
        key: value,
        valueCells,
      }
    })
  })
}
