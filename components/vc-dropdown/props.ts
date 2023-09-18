import PropTypes from '../_util/vue-types'
import type { CSSProperties, PropType } from 'vue'

export const vcDropdownProps = () => ({
  minOverlayWidthMatchTrigger: { type: Boolean, default: undefined },
  arrow: { type: Boolean, default: false },
  prefixCls: PropTypes.string.def('rc-dropdown'),
  transitionName: String,
  overlayClassName: PropTypes.string.def(''),
  openClassName: String,
  animation: PropTypes.any,
  align: PropTypes.object,
  overlayStyle: { type: Object as PropType<CSSProperties>, default: () => ({} as CSSProperties) },
  placement: PropTypes.string.def('bottomLeft'),
  overlay: PropTypes.any,
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).def(
    'hover',
  ),
  alignPoint: { type: Boolean, default: undefined },
  showAction: PropTypes.array,
  hideAction: PropTypes.array,
  getPopupContainer: Function,
  visible: { type: Boolean, default: undefined },
  defaultVisible: { type: Boolean, default: false },
  mouseEnterDelay: PropTypes.number.def(0.15),
  mouseLeaveDelay: PropTypes.number.def(0.1),
})
