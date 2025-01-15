import type { App, Plugin } from 'vue';
import ACountdown from './src/Countdown';
import AStatistic from './src/Statistic';

export const StatisticCountdown = ACountdown;

export const Statistic = Object.assign(AStatistic, {
  Countdown: ACountdown,
  install(app: App) {
    app.component(AStatistic.name, AStatistic);
    app.component(ACountdown.name, ACountdown);
    return app;
  },
});

export default Statistic as typeof Statistic & Plugin & {
  readonly Countdown: typeof ACountdown
};

export * from './src/interface';
export * from './src/props';
