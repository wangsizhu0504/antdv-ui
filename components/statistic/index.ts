import AStatistic from './src/Statistic'
import ACountdown from './src/Countdown'
import type { App, Plugin } from 'vue'

export const StatisticCountdown = ACountdown

export const Statistic = Object.assign(AStatistic, {
  Countdown: ACountdown,
  install(app: App) {
    app.component(AStatistic.name, AStatistic)
    app.component(ACountdown.name, ACountdown)
    return app
  },
})

export default Statistic as typeof Statistic & Plugin & {
  readonly Countdown: typeof ACountdown
}

export * from './src/props'
export * from './src/types'
