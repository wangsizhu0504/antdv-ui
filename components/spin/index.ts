import Spin, { setDefaultIndicator } from './Spin'
import type { App, Plugin } from 'vue'

export type { SpinProps } from './Spin'
export { spinProps } from './Spin'

const AntdSpin = Spin
AntdSpin.setDefaultIndicator = setDefaultIndicator

/* istanbul ignore next */
AntdSpin.install = function (app: App) {
  app.component(AntdSpin.name, AntdSpin)
  return app
}

export default AntdSpin as typeof AntdSpin &
Plugin & {
  readonly setDefaultIndicator: typeof setDefaultIndicator
}
