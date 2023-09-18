import autoComplete from './AutoComplete'

import Option from './Option'
import OptGroup from './OptGroup'
import type { App } from 'vue'

export const AutoCompleteOptGroup = OptGroup
export const AutoCompleteOption = Option

export const AutoComplete = Object.assign(autoComplete, {
  Option,
  OptGroup,
  install(app: App) {
    app.component(autoComplete.name, autoComplete)
    app.component(Option.displayName, Option)
    app.component(OptGroup.displayName, OptGroup)
    return app
  },
})

export default AutoComplete

export * from './types'
export * from './props'
