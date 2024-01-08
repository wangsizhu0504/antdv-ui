import { anyType, booleanType, someType, stringType } from '@antdv/utils'
import type { CSSProperties, ExtractPropTypes } from 'vue'
import type { SizeType } from '../../config-provider'

export function flexProps() {
  return {
    prefixCls: stringType(),
    vertical: booleanType(),
    wrap: stringType<CSSProperties['flex-wrap']>(),
    justify: stringType<CSSProperties['justify-content']>(),
    align: stringType<CSSProperties['align-items']>(),
    flex: someType<CSSProperties['flex']>([Number, String]),
    gap: someType<CSSProperties['gap'] | SizeType>([Number, String]),
    component: anyType(),
  }
}

export type FlexProps = Partial<ExtractPropTypes<ReturnType<typeof flexProps>> & HTMLElement>
