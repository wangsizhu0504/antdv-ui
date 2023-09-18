import statistic from './Statistic'
import countdown from './Countdown'
import type { App, Plugin } from 'vue'

export const StatisticCountdown = countdown

export const Statistic = Object.assign(statistic, {
  Countdown: countdown,
  install(app: App) {
    app.component(statistic.name, statistic)
    app.component(countdown.name, countdown)
    return app
  },
})

export default Statistic as typeof Statistic & Plugin & {
  readonly Countdown: typeof countdown
}

export * from './props'
export * from './types'
