import steps from './src/Steps'
import step from './src/Step'
import type { App } from 'vue'

export const Steps = Object.assign(steps, {
  Step: step,
  install: (app: App) => {
    app.component(Steps.name, Steps)
    app.component(step.name, step)
    return app
  },
})

export default Steps

export * from './src/props'
