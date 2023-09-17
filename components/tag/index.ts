import checkableTag from './CheckableTag'
import tag from './Tag'
import type { App, Plugin } from 'vue'

export const CheckableTag = checkableTag

export const Tag = Object.assign(tag, {
  CheckableTag,
  install(app: App) {
    app.component(Tag.name, Tag)
    app.component(CheckableTag.name, CheckableTag)
    return app
  },

})

export default Tag as typeof Tag & Plugin & {
  readonly CheckableTag: typeof CheckableTag
}

export * from './props'
