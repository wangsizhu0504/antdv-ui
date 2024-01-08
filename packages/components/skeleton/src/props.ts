import type { ExtractPropTypes, PropType } from 'vue'

export function skeletonElementProps() {
  return {
    prefixCls: String,
    size: [String, Number] as PropType<'large' | 'small' | 'default' | number>,
    shape: String as PropType<'circle' | 'square' | 'round' | 'default'>,
    active: { type: Boolean, default: undefined },
  }
}

export function skeletonAvatarProps() {
  return {
    ...skeletonElementProps(),
    shape: String as PropType<'circle' | 'square'>,
  }
}

export function skeletonButtonProps() {
  return {
    ...skeletonElementProps(),
    size: String as PropType<'large' | 'small' | 'default'>,
    block: Boolean,
  }
}

type widthUnit = number | string
export function skeletonParagraphProps() {
  return {
    prefixCls: String,
    width: { type: [Number, String, Array] as PropType<widthUnit[] | widthUnit> },
    rows: Number,
  }
}
export function skeletonTitleProps() {
  return {
    prefixCls: String,
    width: { type: [Number, String] as PropType<string | number> },
  }
}

export function skeletonProps() {
  return {
    active: { type: Boolean, default: undefined },
    loading: { type: Boolean, default: undefined },
    prefixCls: String,
    avatar: {
      type: [Boolean, Object] as PropType<SkeletonAvatarProps | boolean>,
      default: undefined as SkeletonAvatarProps | boolean,
    },
    title: {
      type: [Boolean, Object] as PropType<SkeletonTitleProps | boolean>,
      default: undefined as SkeletonTitleProps | boolean,
    },
    paragraph: {
      type: [Boolean, Object] as PropType<SkeletonParagraphProps | boolean>,
      default: undefined as SkeletonParagraphProps | boolean,
    },
    round: { type: Boolean, default: undefined },
  }
}

export type SkeletonProps = Partial<ExtractPropTypes<ReturnType<typeof skeletonProps>>>

export type SkeletonTitleProps = Partial<ExtractPropTypes<ReturnType<typeof skeletonTitleProps>>>

export type SkeletonParagraphProps = Partial<ExtractPropTypes<ReturnType<typeof skeletonParagraphProps>>>

export interface SkeletonInputProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {
  size?: 'large' | 'small' | 'default'
  block?: boolean
}

export type SkeletonImageProps = Omit<SkeletonElementProps, 'size' | 'shape' | 'active'>

export type SkeletonElementProps = Partial<ExtractPropTypes<ReturnType<typeof skeletonElementProps>>>

export type SkeletonButtonProps = Partial<ExtractPropTypes<ReturnType<typeof skeletonButtonProps>>>

export type SkeletonAvatarProps = Partial<ExtractPropTypes<ReturnType<typeof skeletonAvatarProps>>>
