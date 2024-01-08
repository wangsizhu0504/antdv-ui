import { PropTypes } from '@antdv/utils'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { AvatarSize } from './types'

export function avatarProps() {
  return {
    prefixCls: String,
    shape: { type: String as PropType<'circle' | 'square'>, default: 'circle' },
    size: {
      type: [Number, String, Object] as PropType<AvatarSize>,
      default: (): AvatarSize => 'default',
    },
    src: String,
    /** Srcset of image avatar */
    srcset: String,
    icon: PropTypes.any,
    alt: String,
    gap: Number,
    draggable: { type: Boolean, default: undefined },
    crossOrigin: String as PropType<'' | 'anonymous' | 'use-credentials'>,
    loadError: {
      type: Function as PropType<() => boolean>,
    },
  }
}

export function groupProps() {
  return {
    prefixCls: String,
    maxCount: Number,
    maxStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) as CSSProperties },
    maxPopoverPlacement: { type: String as PropType<'top' | 'bottom'>, default: 'top' },
    maxPopoverTrigger: String as PropType<'hover' | 'focus' | 'click'>,
    /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
    size: {
      type: [Number, String, Object] as PropType<AvatarSize>,
      default: 'default' as AvatarSize,
    },
    shape: { type: String as PropType<'circle' | 'square'>, default: 'circle' },
  }
}

export type AvatarGroupProps = Partial<ExtractPropTypes<ReturnType<typeof groupProps>>>

export type AvatarProps = Partial<ExtractPropTypes<ReturnType<typeof avatarProps>>>
