import type { App, Plugin } from 'vue'
import ACheckableTag from './src/CheckableTag'
import ATag from './src/Tag'

export const CheckableTag = ACheckableTag

export const Tag = Object.assign(ATag, {
  CheckableTag: ACheckableTag,
  install(app: App) {
    app.component(ATag.name, ATag)
    app.component(ACheckableTag.name, ACheckableTag)
    return app
  },

})

export default Tag as typeof Tag & Plugin & {
  readonly CheckableTag: typeof ACheckableTag
}

export * from './src/props'
