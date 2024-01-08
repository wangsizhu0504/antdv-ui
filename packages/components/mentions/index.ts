import type { App } from 'vue'
import AMentions from './src/Mentions'
import AMentionsOption from './src/Option'
import { getMentions } from './src/utils'

export const MentionsOption = AMentionsOption

export const Mentions = Object.assign(AMentions, {
  Option: AMentionsOption,
  getMentions,
  install: (app: App) => {
    app.component(AMentions.name, AMentions)
    app.component(MentionsOption.name, MentionsOption)
    return app
  },
})

export default Mentions

export * from './src/types'
export * from './src/props'
