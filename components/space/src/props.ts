import { PropTypes, booleanType, tuple } from '../../_utils/vue'
import type { SpaceSize } from './types'
import type { ExtractPropTypes, PropType } from 'vue'
import type { SizeType } from '../../config-provider'

export const spaceProps = () => ({
  prefixCls: String,
  size: {
    type: [String, Number, Array] as PropType<SpaceSize | [SpaceSize, SpaceSize]>,
  },
  direction: PropTypes.oneOf(tuple('horizontal', 'vertical')).def('horizontal'),
  align: PropTypes.oneOf(tuple('start', 'end', 'center', 'baseline')),
  wrap: booleanType(),
})

export const spaceCompactItemProps = () => ({
  compactSize: String as PropType<SizeType>,
  compactDirection: PropTypes.oneOf(tuple('horizontal', 'vertical')).def('horizontal'),
  isFirstItem: booleanType(),
  isLastItem: booleanType(),
})

export const spaceCompactProps = () => ({
  prefixCls: String,
  size: {
    type: String as PropType<SizeType>,
  },
  direction: PropTypes.oneOf(tuple('horizontal', 'vertical')).def('horizontal'),
  align: PropTypes.oneOf(tuple('start', 'end', 'center', 'baseline')),
  block: { type: Boolean, default: undefined },
})

export type SpaceProps = Partial<ExtractPropTypes<ReturnType<typeof spaceProps>>>

export type SpaceCompactProps = Partial<ExtractPropTypes<ReturnType<typeof spaceCompactProps>>>

export type SpaceCompactItemProps = Partial<ExtractPropTypes<ReturnType<typeof spaceCompactItemProps>>>
