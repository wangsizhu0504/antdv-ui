import type { App, Plugin } from 'vue'
import ACard from './src/Card'
import ACardMeta from './src/Meta'
import ACardGrid from './src/Grid'

export const CardMeta = ACardMeta
export const CardGrid = ACardGrid

export const Card = Object.assign(ACard, {
  Meta: ACardMeta,
  Grid: ACardGrid,
  install(app: App) {
    app.component(ACard.name, ACard)
    app.component(ACardMeta.name, ACardMeta)
    app.component(ACardGrid.name, ACardGrid)
    return app
  },
})

export default Card as typeof Card & Plugin & {
  readonly Meta: typeof ACardMeta
  readonly Grid: typeof ACardGrid
}

export * from './src/types'
export * from './src/props'
