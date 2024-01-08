import type { App } from 'vue'
import { Content, Footer, Header, Layout as layout } from './src/Layout'
import Sider from './src/Sider'

/* istanbul ignore next */
export const LayoutHeader = Header
export const LayoutFooter = Footer
export const LayoutSider = Sider
export const LayoutContent = Content

export const Layout = Object.assign(layout, {
  Header,
  Footer,
  Content,
  Sider,
  install: (app: App) => {
    app.component(layout.name, layout)
    app.component(Header.name, Header)
    app.component(Footer.name, Footer)
    app.component(Sider.name, Sider)
    app.component(Content.name, Content)
    return app
  },
})

export default Layout

export * from './src/types'
export * from './src/props'
