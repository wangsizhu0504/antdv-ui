import type { Ref } from 'vue'
import { ref, shallowRef, watchEffect } from 'vue'
import { warning } from '@antdv/utils'
import { isNumber } from 'lodash-es'
import type { BaseCascaderProps, ShowSearchType } from '../Cascader'

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
        warning(false, '\'limit\' of showSearch should be positive number or false.')
    }
    mergedShowSearch.value = true
    mergedSearchConfig.value = searchConfig
  })
  return { showSearch: mergedShowSearch, searchConfig: mergedSearchConfig }
}
