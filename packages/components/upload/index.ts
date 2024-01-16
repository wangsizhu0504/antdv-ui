import type { App } from 'vue'
import AUpload, { LIST_IGNORE } from './src/Upload'
import ADragger from './src/Dragger'

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

export * from './src/interface'

export default Upload
