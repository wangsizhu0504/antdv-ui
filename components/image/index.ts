import image from './Image'
import previewGroup from './PreviewGroup'
import type { App, Plugin } from 'vue'

export const ImagePreviewGroup = previewGroup

export const Image = Object.assign(image, {
  PreviewGroup: previewGroup,
  install(app: App) {
    app.component(image.name, image)
    app.component(previewGroup.name, previewGroup)
    return app
  },
})

export default Image as typeof Image & Plugin & {
  readonly PreviewGroup: typeof previewGroup
}

export * from './types'
export * from './props'
