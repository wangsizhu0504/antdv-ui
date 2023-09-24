import { LIST_IGNORE } from '../constant'
import AUpload from './src/Upload'
import ADragger from './src/Dragger'
import type { App } from 'vue'

export const Upload = Object.assign(AUpload, {
  Dragger: ADragger,
  LIST_IGNORE,
  install(app: App) {
    app.component(AUpload.name, AUpload)
    app.component(ADragger.name, ADragger)
    return app
  },
})

/* istanbul ignore next */
export const UploadDragger = ADragger

export default Upload

export * from './src/types'
export * from './src/props'
