import type { ConfigOptions as MessageConfig, MessageInstance } from '../../message'
import type { ModalStaticFunctions } from '../../modal'
import type { NotificationConfig, NotificationInstance } from '../../notification'

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
