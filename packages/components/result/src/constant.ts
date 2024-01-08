import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, WarningFilled } from '@ant-design/icons-vue'
import NotFound from './icons/NotFound'
import ServerError from './icons/ServerError'
import UnAuthorized from './icons/UnAuthorized'

export const IconMap: {
  success: typeof CheckCircleFilled
  error: typeof CloseCircleFilled
  info: typeof ExclamationCircleFilled
  warning: typeof WarningFilled
} = {
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  info: ExclamationCircleFilled,
  warning: WarningFilled,
}

export const ExceptionMap = {
  404: NotFound,
  500: ServerError,
  403: UnAuthorized,
}
