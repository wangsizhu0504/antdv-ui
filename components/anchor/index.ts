import Anchor from './Anchor'
import AnchorLink from './AnchorLink'
import type { App, Plugin } from 'vue'

const AntdAnchor = Anchor
AntdAnchor.Link = AnchorLink

/* istanbul ignore next */
AntdAnchor.install = function (app: App) {
  app.component(AntdAnchor.name, AntdAnchor)
  app.component(AntdAnchor.Link.name, AntdAnchor.Link)
  return app
}

export * from './type'
export * from './props'

export { AnchorLink, AnchorLink as Link }

export default AntdAnchor as typeof Anchor &
Plugin & {
  readonly Link: typeof AnchorLink
}
