import { ref, shallowRef, watchEffect } from 'vue'
import { isNumber } from 'lodash-es'
import { warningFn } from '../../../_utils/log'
import type { BaseCascaderProps } from '../props'
import type { ShowSearchType } from '../interface'
import type { Ref } from 'vue'

// Convert `showSearch` to unique config
export default function useSearchConfig(showSearch?: Ref<BaseCascaderProps['showSearch']>) {
  const mergedShowSearch = shallowRef(false)
  const mergedSearchConfig = ref<ShowSearchType>({})
  watchEffect(() => {
    if (!showSearch.value) {
      mergedShowSearch.value = false
      mergedSearchConfig.value = {}
      return
    }

    let searchConfig: ShowSearchType = {
      matchInputWidth: true,
      limit: 50,
    }

    if (showSearch.value && typeof showSearch.value === 'object') {
      searchConfig = {
        ...searchConfig,
        ...showSearch.value,
      }
    }
    if (isNumber(searchConfig.limit) && searchConfig.limit <= 0) {
      delete searchConfig.limit

      if (process.env.NODE_ENV !== 'production')
        warningFn(false, '\'limit\' of showSearch should be positive number or false.')
    }
    mergedShowSearch.value = true
    mergedSearchConfig.value = searchConfig
  })
  return { showSearch: mergedShowSearch, searchConfig: mergedSearchConfig }
}
