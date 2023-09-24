import AAutoComplete from './src/AutoComplete'

import Option from './src/Option'
import OptGroup from './src/OptGroup'
import type { App } from 'vue'

export const AutoCompleteOptGroup = OptGroup
export const AutoCompleteOption = Option

export const AutoComplete = Object.assign(AAutoComplete, {
  Option,
  OptGroup,
  install(app: App) {
    app.component(AAutoComplete.name, AAutoComplete)
    app.component(Option.displayName, Option)
    app.component(OptGroup.displayName, OptGroup)
    return app
  },
})

export default AutoComplete

export * from './src/types'
export * from './src/props'
