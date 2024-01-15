import type { CSSProperties, PropType, TransitionProps } from 'vue'
import { PropTypes, arrayType, functionType, objectType } from '@antdv/utils'

export type IPlacement = 'left' | 'top' | 'right' | 'bottom'
type ILevelMove = number | [number, number]
function props() {
  return {
    prefixCls: String,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: { type: Object as PropType<CSSProperties>, default: undefined as CSSProperties },
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
      ILevelMove | ((e: { target: HTMLElement; open: boolean }) => ILevelMove)
    >,
    },
    duration: String,
    ease: String,
    showMask: { type: Boolean, default: undefined },
    maskClosable: { type: Boolean, default: undefined },
    maskStyle: { type: Object as PropType<CSSProperties>, default: undefined as CSSProperties },
    afterVisibleChange: Function,
    keyboard: { type: Boolean, default: undefined },
    contentWrapperStyle: arrayType<CSSProperties[]>(),
    autofocus: { type: Boolean, default: undefined },
    open: { type: Boolean, default: undefined },

    // Motion
    motion: functionType<(placement: IPlacement) => TransitionProps>(),
    maskMotion: objectType<TransitionProps>(),
  }
}

function drawerProps() {
  return {
    ...props(),
    forceRender: { type: Boolean, default: undefined },
    getContainer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object,
      PropTypes.looseBool,
    ]),
  }
}

function drawerChildProps() {
  return {
    ...props(),
    getContainer: Function,
    getOpenCount: Function as PropType<() => number>,
    scrollLocker: PropTypes.any,
    inline: Boolean,
  }
}
export { drawerProps, drawerChildProps }
