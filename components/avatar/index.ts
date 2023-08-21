import Avatar from './Avatar'
import Group from './Group'
import type { App, Plugin } from 'vue'

export { avatarProps } from './Avatar'
export type { AvatarProps, AvatarSize } from './Avatar'
export type { AvatarGroupProps } from './Group'

const AntdAvatar = Avatar
AntdAvatar.Group = Group

/* istanbul ignore next */
AntdAvatar.install = function (app: App) {
  app.component(AntdAvatar.name, AntdAvatar)
  app.component(AntdAvatar.Group.name, AntdAvatar.Group)
  return app
}
export { Group as AvatarGroup }
export default AntdAvatar as typeof AntdAvatar &
Plugin & {
  readonly Group: typeof Group
}
