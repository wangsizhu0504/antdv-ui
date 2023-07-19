import Statistic from './Statistic'
import Countdown from './Countdown'
import type { App, Plugin } from 'vue'

export type { StatisticProps } from './Statistic'

Statistic.Countdown = Countdown
/* istanbul ignore next */
Statistic.install = function (app: App) {
  app.component(Statistic.name, Statistic)
  app.component(Statistic.Countdown.name, Statistic.Countdown)
  return app
}

export const StatisticCountdown = Statistic.Countdown

export default Statistic as typeof Statistic &
Plugin & {
  readonly Countdown: typeof Countdown
}
