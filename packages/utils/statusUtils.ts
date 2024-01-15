import type { InputStatus, ValidateStatus } from '@antdv/types'

import { classNames } from './dom'

export function getStatusClassNames(
  prefixCls: string,
  status?: ValidateStatus,
  hasFeedback?: boolean,
) {
  return classNames({
    [`${prefixCls}-status-success`]: status === 'success',
    [`${prefixCls}-status-warning`]: status === 'warning',
    [`${prefixCls}-status-error`]: status === 'error',
    [`${prefixCls}-status-validating`]: status === 'validating',
    [`${prefixCls}-has-feedback`]: hasFeedback,
  })
}

export function getMergedStatus(contextStatus?: ValidateStatus, customStatus?: InputStatus) {
  return customStatus || contextStatus
}
