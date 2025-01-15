import type { App, Plugin } from 'vue'
import AAvatar from './src/Avatar'
import AButton from './src/Button'
import AImage from './src/Image'
import AInput from './src/Input'
import ASkeleton from './src/Skeleton'
import ATitle from './src/Title'

export const SkeletonButton = AButton
export const SkeletonAvatar = AAvatar
export const SkeletonInput = AInput
export const SkeletonImage = AImage
export const SkeletonTitle = ATitle

export const Skeleton = Object.assign(ASkeleton, {
  Button: SkeletonButton,
  Avatar: SkeletonAvatar,
  Input: SkeletonInput,
  Image: SkeletonImage,
  Title: SkeletonTitle,
  install(app: App) {
    app.component(ASkeleton.name, ASkeleton)
    app.component(AButton.name, AButton)
    app.component(AAvatar.name, AAvatar)
    app.component(AInput.name, AInput)
    app.component(AImage.name, AImage)
    app.component(ATitle.name, ATitle)
    return app
  },
})

export default Skeleton as typeof Skeleton & Plugin & {
  readonly Button: typeof SkeletonButton
  readonly Avatar: typeof SkeletonAvatar
  readonly Input: typeof SkeletonInput
  readonly Image: typeof SkeletonImage
}

export * from './src/props'
