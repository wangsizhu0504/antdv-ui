import Badge from './Badge'
import Ribbon from './Ribbon'
import type { App, Plugin } from 'vue'

export * from './props'
export * from './type'

Badge.install = function (app: App) {
  app.component(Badge.name, Badge)
  app.component(Ribbon.name, Ribbon)
  return app
}

export { Ribbon as BadgeRibbon }

export default Badge as typeof Badge & Plugin & {
  readonly Ribbon: typeof Ribbon
}
