import * as components from './components'
import { version } from './version'
import cssinjs from './cssinjs'
import type { App } from 'vue'

export * from './components'
export * from './cssinjs'
export * from './_utils/types/global'
export { useConfigContextInject as useAntdContext } from './config-provider'
export { default as theme } from './theme'
export const install = function (app: App) {
  Object.keys(components).forEach((key) => {
    const component = components[key]
    if (component.install)
      app.use(component)
  })
  app.use(cssinjs.StyleProvider)
  app.config.globalProperties.$message = components.message
  app.config.globalProperties.$notification = components.notification
  app.config.globalProperties.$info = components.Modal.info
  app.config.globalProperties.$success = components.Modal.success
  app.config.globalProperties.$error = components.Modal.error
  app.config.globalProperties.$warning = components.Modal.warning
  app.config.globalProperties.$confirm = components.Modal.confirm
  app.config.globalProperties.$destroyAll = components.Modal.destroyAll
  return app
}

export { version, cssinjs }

export default {
  version,
  install,
}
