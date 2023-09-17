import { LIST_IGNORE } from '../constant'
import upload from './Upload'
import dragger from './Dragger'
import type { App } from 'vue'

export const Upload = Object.assign(upload, {
  Dragger: dragger,
  LIST_IGNORE,
  install(app: App) {
    app.component(upload.name, upload)
    app.component(dragger.name, dragger)
    return app
  },
})

/* istanbul ignore next */
export const UploadDragger = dragger

export default Upload

export * from './types'
export * from './props'
