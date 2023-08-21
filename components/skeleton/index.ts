import Skeleton from './Skeleton'
import SkeletonButton from './Button'
import SkeletonInput from './Input'
import SkeletonImage from './Image'
import SkeletonAvatar from './Avatar'
import SkeletonTitle from './Title'
import type { App, Plugin } from 'vue'

export type { SkeletonButtonProps } from './Button'
export type { SkeletonInputProps } from './Input'
export type { SkeletonImageProps } from './Image'
export type { SkeletonAvatarProps } from './Avatar'
export type { SkeletonTitleProps } from './Title'

export type { SkeletonProps } from './Skeleton'
export { skeletonProps } from './Skeleton'

const AntdSkeleton = Skeleton
AntdSkeleton.Button = SkeletonButton
AntdSkeleton.Avatar = SkeletonAvatar
AntdSkeleton.Input = SkeletonInput
AntdSkeleton.Image = SkeletonImage
AntdSkeleton.Title = SkeletonTitle

/* istanbul ignore next */
AntdSkeleton.install = function (app: App) {
  app.component(AntdSkeleton.name, AntdSkeleton)
  app.component(AntdSkeleton.Button.name, AntdSkeleton.Button)
  app.component(AntdSkeleton.Avatar.name, AntdSkeleton.Avatar)
  app.component(AntdSkeleton.Input.name, AntdSkeleton.Input)
  app.component(AntdSkeleton.Image.name, AntdSkeleton.Image)
  app.component(AntdSkeleton.Title.name, AntdSkeleton.Title)
  return app
}
export { SkeletonButton, SkeletonAvatar, SkeletonInput, SkeletonImage, SkeletonTitle }
export default AntdSkeleton as typeof AntdSkeleton &
Plugin & {
  readonly Button: typeof SkeletonButton
  readonly Avatar: typeof SkeletonAvatar
  readonly Input: typeof SkeletonInput
  readonly Image: typeof SkeletonImage
}
