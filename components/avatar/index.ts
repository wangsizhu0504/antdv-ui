import avatar from './Avatar'
import avatarGroup from './Group'
import type { App, Plugin } from 'vue'

export const AvatarGroup = avatarGroup

export const Avatar = Object.assign(avatar, {
  Group: AvatarGroup,
  install(app: App) {
    app.component(avatar.name, avatar)
    app.component(avatarGroup.name, avatarGroup)
    return app
  },
})

export default Avatar as typeof Avatar & Plugin & {
  readonly Group: typeof avatarGroup
}

export * from './types'
export * from './props'
