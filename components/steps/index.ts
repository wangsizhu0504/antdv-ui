import steps from './Steps'
import step from './Step'
import type { App } from 'vue'

export const Steps = Object.assign(steps, {
  Step: step,
  install: (app: App) => {
    app.component(Steps.name, Steps)
    app.component(step.name, step)
    return app
  },
})
