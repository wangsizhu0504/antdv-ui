import type { App } from 'vue';
import AStep from './src/Step';
import ASteps from './src/Steps';

export const Step = AStep;

export const Steps = Object.assign(ASteps, {
  Step: AStep,
  install: (app: App) => {
    app.component(ASteps.name, ASteps);
    app.component(AStep.name, AStep);
    return app;
  },
});

export default Steps;

export * from './src/props';
