import AutoComplete from './AutoComplete'

import Option from './Option'
import OptGroup from './OptGroup'
import type { App } from 'vue'

export const AutoCompleteOptGroup = OptGroup
export const AutoCompleteOption = Option

const AAutoComplete = Object.assign(AutoComplete, {
  Option,
  OptGroup,
  install(app: App) {
    app.component(AutoComplete.name, AutoComplete)
    app.component(Option.displayName, Option)
    app.component(OptGroup.displayName, OptGroup)
    return app
  },
})

export * from './type'
export * from './props'

export default AAutoComplete
