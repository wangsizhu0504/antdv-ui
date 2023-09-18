import PropTypes from '../../_util/vue-types'
import { arrayType, functionType, objectType } from '../../_util/type'
import type { ILevelMove, IPlacement } from './types'
import type { CSSProperties, PropType, TransitionProps } from 'vue'

const props = () => ({
  prefixCls: String,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  class: String,
  rootClassName: String,
  rootStyle: objectType<CSSProperties>(),
  placement: {
    type: String as PropType<IPlacement>,
  },
  wrapperClassName: String,
  level: { type: [String, Array] as PropType<string | string[]> },
  levelMove: {
    type: [Number, Function, Array] as PropType<
      ILevelMove | ((e: { target: HTMLElement, open: boolean }) => ILevelMove)
    >,
  },
  duration: String,
  ease: String,
  showMask: { type: Boolean, default: undefined },
  maskClosable: { type: Boolean, default: undefined },
  maskStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  afterVisibleChange: Function,
  keyboard: { type: Boolean, default: undefined },
  contentWrapperStyle: arrayType<CSSProperties[]>(),
  autofocus: { type: Boolean, default: undefined },
  open: { type: Boolean, default: undefined },

  // Motion
  motion: functionType<(placement: IPlacement) => TransitionProps>(),
  maskMotion: objectType<TransitionProps>(),
})

export const vcDrawerProps = () => ({
  ...props(),
  forceRender: { type: Boolean, default: undefined },
  getContainer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
    PropTypes.looseBool,
  ]),
})

export const vcDrawerChildProps = () => ({
  ...props(),
  getContainer: Function,
  getOpenCount: Function as PropType<() => number>,
  scrollLocker: PropTypes.any,
  inline: Boolean,
})