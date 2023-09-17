import { computed } from 'vue'
import { isEmpty } from 'lodash-es'
import { createContext } from '../hooks'
import classNames from '../_util/classNames'

import type { spaceCompactItemProps } from './props'
import type { ExtractPropTypes, Ref } from 'vue'
import type { DirectionType } from '../config-provider'

export type SpaceCompactItemContextType = Partial<ExtractPropTypes<ReturnType<typeof spaceCompactItemProps>>>

export const SpaceCompactItemContext = createContext<SpaceCompactItemContextType | null>(null)

export const useCompactItemContext = (prefixCls: Ref<string>, direction: Ref<DirectionType>) => {
  const compactItemContext = SpaceCompactItemContext.useInject()

  const compactItemClassnames = computed(() => {
    if (!compactItemContext || isEmpty(compactItemContext)) return ''

    const { compactDirection, isFirstItem, isLastItem } = compactItemContext
    const separator = compactDirection === 'vertical' ? '-vertical-' : '-'

    return classNames({
      [`${prefixCls.value}-compact${separator}item`]: true,
      [`${prefixCls.value}-compact${separator}first-item`]: isFirstItem,
      [`${prefixCls.value}-compact${separator}last-item`]: isLastItem,
      [`${prefixCls.value}-compact${separator}item-rtl`]: direction.value === 'rtl',
    })
  })

  return {
    compactSize: computed(() => compactItemContext?.compactSize),
    compactDirection: computed(() => compactItemContext?.compactDirection),
    compactItemClassnames,
  }
}
