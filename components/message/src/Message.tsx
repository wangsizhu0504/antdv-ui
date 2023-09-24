import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled, LoadingOutlined } from '@ant-design/icons-vue'
import Notification from '../../_internal/notification'
import { classNames } from '../../_utils/dom'

import useStyle from '../style'
import type { MessageArgsProps } from './props'
import type {
  ConfigDuration,
  ConfigOnClose,
  ConfigOptions,
  JointContent,
  MessageApi,
  MessageType,
  NoticeType,
  ThenableArgument,
} from './types'
import type { NotificationInstance } from '../../_internal/notification/type'
import type { Key } from '../../_utils/types'

let defaultDuration = 3
let defaultTop: string
let messageInstance: NotificationInstance
let key = 1
let localPrefixCls = ''
let transitionName = 'move-up'
let hasTransitionName = false
let getContainer = () => document.body
let maxCount: number
let rtl = false

export function getKeyThenIncreaseKey() {
  return key++
}

function setMessageConfig(options: ConfigOptions & { top: string }) {
  if (options.top !== undefined) {
    defaultTop = options.top
    messageInstance = null // delete messageInstance for new defaultTop
  }
  if (options.duration !== undefined)
    defaultDuration = options.duration

  if (options.prefixCls !== undefined)
    localPrefixCls = options.prefixCls

  if (options.getContainer !== undefined) {
    getContainer = options.getContainer
    messageInstance = null // delete messageInstance for new getContainer
  }
  if (options.transitionName !== undefined) {
    transitionName = options.transitionName
    messageInstance = null // delete messageInstance for new transitionName
    hasTransitionName = true
  }
  if (options.maxCount !== undefined) {
    maxCount = options.maxCount
    messageInstance = null
  }
  if (options.rtl !== undefined)
    rtl = options.rtl
}

function getMessageInstance(args: MessageArgsProps, callback: (i: NotificationInstance) => void) {
  if (messageInstance) {
    callback(messageInstance)
    return
  }

  Notification.newInstance(
    {
      appContext: args.appContext,
      prefixCls: args.prefixCls || localPrefixCls,
      rootPrefixCls: args.rootPrefixCls,
      transitionName,
      hasTransitionName,
      style: { top: defaultTop }, // 覆盖原来的样式
      getContainer: getContainer || args.getPopupContainer,
      maxCount,
      name: 'message',
      useStyle,
    },
    (instance: any) => {
      if (messageInstance) {
        callback(messageInstance)
        return
      }
      messageInstance = instance
      callback(instance)
    },
  )
}

const typeToIcon = {
  info: InfoCircleFilled,
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
  warn: ExclamationCircleFilled,
  loading: LoadingOutlined,
}

export const typeList = Object.keys(typeToIcon) as NoticeType[]

function notice(args: MessageArgsProps): MessageType {
  const duration = args.duration !== undefined ? args.duration : defaultDuration

  const target = args.key || getKeyThenIncreaseKey()
  const closePromise = new Promise((resolve) => {
    const callback = () => {
      if (typeof args.onClose === 'function')
        args.onClose()

      return resolve(true)
    }
    getMessageInstance(args, (instance) => {
      instance.notice({
        key: target,
        duration,
        style: args.style || {},
        class: args.class,
        content: ({ prefixCls }) => {
          const Icon = typeToIcon[args.type]
          const iconNode = Icon ? <Icon /> : ''
          const messageClass = classNames(`${prefixCls}-custom-content`, {
            [`${prefixCls}-${args.type}`]: args.type,
            [`${prefixCls}-rtl`]: rtl === true,
          })
          return (
            <div class={messageClass}>
              {typeof args.icon === 'function' ? args.icon() : args.icon || iconNode}
              <span>{typeof args.content === 'function' ? args.content() : args.content}</span>
            </div>
          )
        },
        onClose: callback,
        onClick: args.onClick,
      })
    })
  })
  const result: any = () => {
    if (messageInstance)
      messageInstance.removeNotice(target)
  }
  result.then = (filled: ThenableArgument, rejected: ThenableArgument) =>
    closePromise.then(filled, rejected)
  result.promise = closePromise
  return result
}

function isArgsProps(content: JointContent): content is MessageArgsProps {
  return (
    Object.prototype.toString.call(content) === '[object Object]'
    && !!(content as MessageArgsProps).content
  )
}

const api: any = {
  open: notice,
  config: setMessageConfig,
  destroy(messageKey?: Key) {
    if (messageInstance) {
      if (messageKey) {
        const { removeNotice } = messageInstance
        removeNotice(messageKey)
      } else {
        const { destroy } = messageInstance
        destroy()
        messageInstance = null
      }
    }
  },
}

export function attachTypeApi(originalApi: MessageApi, type: NoticeType) {
  originalApi[type] = (
    content: JointContent,
    duration?: ConfigDuration,
    onClose?: ConfigOnClose,
  ) => {
    if (isArgsProps(content))
      return originalApi.open({ ...content, type })

    if (typeof duration === 'function') {
      onClose = duration
      duration = undefined
    }

    return originalApi.open({ content, duration, type, onClose })
  }
}

typeList.forEach(type => attachTypeApi(api, type))

/** @private test Only function. Not work on production */
export const getInstance = () => (process.env.NODE_ENV === 'test' ? messageInstance : null)

export default api as MessageApi
