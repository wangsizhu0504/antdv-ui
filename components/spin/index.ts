import Spin, { setDefaultIndicator } from './Spin'
import type { App, Plugin } from 'vue'

export type { SpinProps } from './Spin'
export { spinProps } from './Spin'

Spin.setDefaultIndicator = setDefaultIndicator

/* istanbul ignore next */
Spin.install = function (app: App) {
  app.component(Spin.name, Spin)
  return app
}

export default Spin as typeof Spin &
Plugin & {
  readonly setDefaultIndicator: typeof setDefaultIndicator
}
