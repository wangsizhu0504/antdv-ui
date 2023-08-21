import Statistic from './Statistic'
import Countdown from './Countdown'
import type { App, Plugin } from 'vue'

export type { StatisticProps } from './Statistic'

const AntdStatistic = Statistic
AntdStatistic.Countdown = Countdown
/* istanbul ignore next */
AntdStatistic.install = function (app: App) {
  app.component(AntdStatistic.name, AntdStatistic)
  app.component(AntdStatistic.Countdown.name, AntdStatistic.Countdown)
  return app
}

export const StatisticCountdown = AntdStatistic.Countdown

export default AntdStatistic as typeof AntdStatistic &
Plugin & {
  readonly Countdown: typeof Countdown
}
