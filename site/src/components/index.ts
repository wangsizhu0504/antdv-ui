import type { App } from 'vue'
import { Transition, TransitionGroup } from 'vue'
import demoBox from './DemoBox.vue'
import demoContainer from './demoContainer.vue'
import demoSort from './demoSort.jsx'

export function registGlobalComponents(app: App) {
  app.component('Transition', Transition)
  app.component('TransitionGroup', TransitionGroup)
  app.component('DemoBox', demoBox)
  app.component('DemoContainer', demoContainer)
  app.component('DemoSort', demoSort)
  app.component('VNodes', (_, { attrs: { value } }) => {
    return value
  })
}
