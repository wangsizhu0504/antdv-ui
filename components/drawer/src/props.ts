import { PropTypes, objectType } from '../../_utils/vue'

import { PlacementTypes } from '../../constant'
import type { KeyboardEventHandler, MouseEventHandler, getContainerFunc } from '../../_utils/types'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { ILevelMove, PushState, sizeType } from './types'

export const drawerProps = () => ({
  'autofocus': { type: Boolean, default: undefined },
  'closable': { type: Boolean, default: undefined },
  'closeIcon': PropTypes.any,
  'destroyOnClose': { type: Boolean, default: undefined },
  'forceRender': { type: Boolean, default: undefined },
  'getContainer': {
    type: [String, Function, Boolean, Object] as PropType<
      string | HTMLElement | getContainerFunc | false
    >,
    default: undefined as string | HTMLElement | getContainerFunc | false,
  },
  'maskClosable': { type: Boolean, default: undefined },
  'mask': { type: Boolean, default: undefined },
  'maskStyle': objectType<CSSProperties>(),
  'rootClassName': String,
  'rootStyle': objectType<CSSProperties>(),
  'size': {
    type: String as PropType<sizeType>,
  },
  'drawerStyle': objectType<CSSProperties>(),
  'headerStyle': objectType<CSSProperties>(),
  'bodyStyle': objectType<CSSProperties>(),
  'contentWrapperStyle': {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  'title': PropTypes.any,
  /** @deprecated Please use `open` instead */
  'visible': { type: Boolean, default: undefined },
  'open': { type: Boolean, default: undefined },
  'width': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  'height': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  'zIndex': Number,
  'prefixCls': String,
  'push': PropTypes.oneOfType([PropTypes.looseBool, { type: Object as PropType<PushState> }]),
  'placement': PropTypes.oneOf(PlacementTypes),
  'keyboard': { type: Boolean, default: undefined },
  'extra': PropTypes.any,
  'footer': PropTypes.any,
  'footerStyle': objectType<CSSProperties>(),
  'level': PropTypes.any,
  'lockScroll': { type: Boolean, default: true },
  'levelMove': {
    type: [Number, Array, Function] as PropType<
      ILevelMove | ((e: { target: HTMLElement, open: boolean }) => ILevelMove)
    >,
  },
  'handle': PropTypes.any,
  /** @deprecated Use `@afterVisibleChange` instead */
  'afterVisibleChange': Function as PropType<(visible: boolean) => void>,
  /** @deprecated Please use `@afterOpenChange` instead */
  'onAfterVisibleChange': Function as PropType<(visible: boolean) => void>,
  'onAfterOpenChange': Function as PropType<(open: boolean) => void>,
  /** @deprecated Please use `onUpdate:open` instead */
  'onUpdate:visible': Function as PropType<(visible: boolean) => void>,
  'onUpdate:open': Function as PropType<(open: boolean) => void>,
  'onClose': Function as PropType<MouseEventHandler | KeyboardEventHandler>,
})

export type DrawerProps = Partial<ExtractPropTypes<ReturnType<typeof drawerProps>>>
