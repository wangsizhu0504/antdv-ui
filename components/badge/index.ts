import badge from './Badge'
import badgeRibbon from './Ribbon'
import type { App, Plugin } from 'vue'

export const BadgeRibbon = badgeRibbon

export const Badge = Object.assign(badge, {
  Ribbon: badgeRibbon,
  install(app: App) {
    app.component(badge.name, badge)
    app.component(badgeRibbon.name, badgeRibbon)
    return app
  },
})

export default Badge as typeof Badge & Plugin & {
  readonly Ribbon: typeof BadgeRibbon
}

export * from './props'
export * from './types'
