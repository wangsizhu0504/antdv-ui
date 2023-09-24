import type { ConfigOptions as MessageConfig, MessageInstance } from '../../message'
import type { NotificationConfig, NotificationInstance } from '../../notification'
import type { ModalStaticFunctions } from '../../modal'

export interface AppConfig {
  message?: MessageConfig
  notification?: NotificationConfig
}
export interface useAppProps {
  message: MessageInstance
  notification: NotificationInstance
  modal: ModalType
}

export type ModalType = Omit<ModalStaticFunctions, 'warn'>
