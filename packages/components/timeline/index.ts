import type { App, Plugin } from 'vue'
import ATimeline from './src/Timeline'
import ATimelineItem from './src/TimelineItem'

export const TimelineItem = ATimelineItem
export const Timeline = Object.assign(ATimeline, {
  Item: ATimelineItem,
  install(app: App) {
    app.component(ATimeline.name, ATimeline)
    app.component(ATimelineItem.name, ATimelineItem)
    return app
  },
})

export default Timeline as typeof Timeline & Plugin & {
  readonly Item: typeof TimelineItem
}

export * from './src/props'
