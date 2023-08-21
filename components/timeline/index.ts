import Timeline, { timelineProps } from './Timeline'
import TimelineItem, { timelineItemProps } from './TimelineItem'
import type { App, Plugin } from 'vue'

export type { TimelineProps } from './Timeline'
export type { TimelineItemProps } from './TimelineItem'

const AntdTimeline = Timeline
AntdTimeline.Item = TimelineItem

/* istanbul ignore next */
AntdTimeline.install = function (app: App) {
  app.component(AntdTimeline.name, AntdTimeline)
  app.component(AntdTimeline.Item.name, TimelineItem)
  return app
}
export { TimelineItem, timelineProps, timelineItemProps }
export default AntdTimeline as typeof AntdTimeline &
Plugin & {
  readonly Item: typeof TimelineItem
}
