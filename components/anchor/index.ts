import anchor from './Anchor'
import anchorLink from './AnchorLink'
import type { App, Plugin } from 'vue'

export const AnchorLink = anchorLink

export const Anchor = Object.assign(anchor, {
  Link: AnchorLink,
  install(app: App) {
    app.component(anchor.name, anchor)
    app.component(anchorLink.name, anchorLink)
    return app
  },
})

export default Anchor as typeof Anchor & Plugin & {
  readonly Link: typeof AnchorLink
}

export * from './types'
export * from './props'
