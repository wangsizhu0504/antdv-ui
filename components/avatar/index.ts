import AAvatar from './src/Avatar'
import AAvatarGroup from './src/Group'
import type { App, Plugin } from 'vue'

export const AvatarGroup = AAvatarGroup

export const Avatar = Object.assign(AAvatar, {
  Group: AAvatarGroup,
  install(app: App) {
    app.component(AAvatar.name, AAvatar)
    app.component(AAvatarGroup.name, AAvatarGroup)
    return app
  },
})

export default Avatar as typeof Avatar & Plugin & {
  readonly Group: typeof AAvatarGroup
}

export * from './src/types'
export * from './src/props'
