import result from './Result'
import type { App } from 'vue'

export const Result = Object.assign(result, {
  install(app: App) {
    app.component(Result.name, Result)
    return app
  },
})

export default Result

export * from './props'
export * from './types'
