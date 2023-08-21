import Card from './Card'
import Meta from './Meta'
import Grid from './Grid'
import type { App, Plugin } from 'vue'

export type { CardProps } from './Card'

const AntdCard = Card
AntdCard.Meta = Meta
AntdCard.Grid = Grid

/* istanbul ignore next */
Card.install = function (app: App) {
  app.component(AntdCard.name, AntdCard)
  app.component(AntdCard.Meta.name, AntdCard.Meta)
  app.component(AntdCard.Grid.name, AntdCard.Grid)
  return app
}

export { Meta as CardMeta, Grid as CardGrid }

export default AntdCard as typeof AntdCard &
Plugin & {
  readonly Meta: typeof Meta
  readonly Grid: typeof Grid
}
