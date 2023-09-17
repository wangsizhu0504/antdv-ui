import skeleton from './Skeleton'
import button from './Button'
import input from './Input'
import image from './Image'
import avatar from './Avatar'
import title from './Title'
import type { App, Plugin } from 'vue'

export const SkeletonButton = button
export const SkeletonAvatar = avatar
export const SkeletonInput = input
export const SkeletonImage = image
export const SkeletonTitle = title

export const Skeleton = Object.assign(skeleton, {
  Button: SkeletonButton,
  Avatar: SkeletonAvatar,
  Input: SkeletonInput,
  Image: SkeletonImage,
  Title: SkeletonTitle,
  install(app: App) {
    app.component(skeleton.name, skeleton)
    app.component(button.name, button)
    app.component(avatar.name, avatar)
    app.component(input.name, input)
    app.component(image.name, image)
    app.component(title.name, title)
    return app
  },
})

export default Skeleton as typeof Skeleton & Plugin & {
  readonly Button: typeof SkeletonButton
  readonly Avatar: typeof SkeletonAvatar
  readonly Input: typeof SkeletonInput
  readonly Image: typeof SkeletonImage
}

export * from './props'
