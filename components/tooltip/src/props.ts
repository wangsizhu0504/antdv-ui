import { PropTypes, objectType } from '../../_utils/vue'
import type { TooltipPlacement, TriggerType } from './types'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { AlignType, BuildInPlacements } from '../../_internal/trigger/interface'

import type { AdjustOverflow, LiteralUnion, PresetColorType } from '../../_utils/types'

export const abstractTooltipProps = () => ({
  'trigger': [String, Array] as PropType<TriggerType | TriggerType[]>,
  'open': { type: Boolean, default: undefined },
  /** @deprecated Please use `open` instead. */
  'visible': { type: Boolean, default: undefined },
  'placement': String as PropType<TooltipPlacement>,
  'color': String as PropType<LiteralUnion<PresetColorType>>,
  'transitionName': String,
  'overlayStyle': objectType<CSSProperties>(),
  'overlayInnerStyle': objectType<CSSProperties>(),
  'overlayClassName': String,
  'openClassName': String,
  'prefixCls': String,
  'mouseEnterDelay': Number,
  'mouseLeaveDelay': Number,
  'getPopupContainer': Function as PropType<(triggerNode: HTMLElement) => HTMLElement>,
  'arrowPointAtCenter': { type: Boolean, default: undefined },
  'autoAdjustOverflow': {
    type: [Boolean, Object] as PropType<boolean | AdjustOverflow>,
    default: undefined as boolean | AdjustOverflow,
  },
  'destroyTooltipOnHide': { type: Boolean, default: undefined },
  'align': objectType<AlignType>(),
  'builtinPlacements': objectType<BuildInPlacements>(),
  'children': Array,
  /** @deprecated Please use `onOpenChange` instead. */
  'onVisibleChange': Function as PropType<(vis: boolean) => void>,
  /** @deprecated Please use `onUpdate:open` instead. */
  'onUpdate:visible': Function as PropType<(vis: boolean) => void>,
  'onOpenChange': Function as PropType<(vis: boolean) => void>,
  'onUpdate:open': Function as PropType<(vis: boolean) => void>,
})
export const tooltipProps = () => ({
  ...abstractTooltipProps(),
  title: PropTypes.any,
})

export const tooltipDefaultProps = () => ({
  trigger: 'hover',
  align: {},
  placement: 'top',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
})

export type TooltipProps = Partial<ExtractPropTypes<ReturnType<typeof tooltipProps>>>
