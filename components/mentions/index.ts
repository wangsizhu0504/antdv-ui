import mentions from './Mentions'
import mentionsOption from './Options'
import { getMentions } from './util'
import type { App } from 'vue'

export const MentionsOption = mentionsOption

export const Mentions = Object.assign(mentions, {
  Option: mentionsOption,
  getMentions,
  install: (app: App) => {
    app.component(mentions.name, mentions)
    app.component(MentionsOption.name, MentionsOption)
    return app
  },
})

export default Mentions

export * from './types'
export * from './props'
