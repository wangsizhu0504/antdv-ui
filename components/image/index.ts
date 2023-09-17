import Image from './Image'
import PreviewGroup from './PreviewGroup'
import type { App, Plugin } from 'vue'

const AImage = Image
AImage.PreviewGroup = PreviewGroup

AImage.install = function (app: App) {
  app.component(AImage.name, AImage)
  app.component(AImage.PreviewGroup.name, AImage.PreviewGroup)
  return app
}

export { PreviewGroup as ImagePreviewGroup }

export default Image as typeof Image & Plugin & {
  readonly PreviewGroup: typeof PreviewGroup
}

export * from './type'
export * from './props'
