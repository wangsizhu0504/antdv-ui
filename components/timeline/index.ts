import timeline from './Timeline'
import timelineItem from './TimelineItem'
import type { App, Plugin } from 'vue'

export const TimelineItem = timelineItem
export const Timeline = Object.assign(timeline, {
  Item: timelineItem,
  install(app: App) {
    app.component(timeline.name, timeline)
    app.component(timelineItem.name, timelineItem)
    return app
  },
})

export default Timeline as typeof Timeline & Plugin & {
  readonly Item: typeof TimelineItem
}

export * from './props'
