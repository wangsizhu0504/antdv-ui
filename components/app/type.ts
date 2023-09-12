import type { MessageInstance } from '../message/interface'
import type { NotificationConfig } from '../notification/interface'
import type { NotificationInstance } from '../notification'
import type { ModalStaticFunctions } from '../modal/confirm'
import type { ConfigOptions as MessageConfig } from '../message/'

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
