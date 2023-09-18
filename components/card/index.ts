import card from './Card'
import meta from './Meta'
import grid from './Grid'
import type { App, Plugin } from 'vue'

export const CardMeta = meta
export const CardGrid = grid

export const Card = Object.assign(card, {
  Meta: meta,
  Grid: grid,
  install(app: App) {
    app.component(card.name, card)
    app.component(meta.name, meta)
    app.component(grid.name, grid)
    return app
  },
})

export default Card as typeof Card & Plugin & {
  readonly Meta: typeof meta
  readonly Grid: typeof grid
}

export * from './types'
export * from './props'
