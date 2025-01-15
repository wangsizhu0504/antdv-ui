import type { Key } from '@antdv/types'
import type { VNode } from 'vue'
import type { HolderProps } from './holder'
import type {
  ConfigOptions,
  HolderRef,
  MessageInstance,
  MessageType,
  NoticeType,
  TypeOpen,
} from './interface'
import type { MessageArgsProps } from './props'
import { classNames, wrapPromiseFn } from '@antdv/utils'
import { shallowRef } from 'vue'
import Holder from './holder'

import { PureContent } from './PurePanel'

// ==============================================================================
// ==                                   Hook                                   ==
// ==============================================================================
let keyIndex = 0

export function useInternalMessage(
  messageConfig?: HolderProps,
): readonly [MessageInstance, () => VNode] {
  const holderRef = shallowRef<HolderRef>(null)
  const holderKey = Symbol('messageHolderKey')
  // ================================ API ================================

  // Wrap with notification content
  // >>> close
  const close = (key: Key) => {
    holderRef.value?.close(key)
  }

  // >>> Open
  const open = (config: MessageArgsProps): MessageType => {
    if (!holderRef.value) {
      const fakeResult: any = () => {}
      fakeResult.then = () => {}
      return fakeResult
    }

    const { open: originOpen, prefixCls, hashId } = holderRef.value
    const noticePrefixCls = `${prefixCls}-notice`
    const { content, icon, type, key, class: className, onClose, ...restConfig } = config

    let mergedKey: Key = key!
    if (mergedKey === undefined || mergedKey === null) {
      keyIndex += 1
      mergedKey = `antd-message-${keyIndex}`
    }

    return wrapPromiseFn((resolve) => {
      originOpen({
        ...restConfig,
        key: mergedKey,
        content: () => (
          <PureContent
            prefixCls={prefixCls}
            type={type}
            icon={typeof icon === 'function' ? icon() : icon}
          >
            {typeof content === 'function' ? content() : content}
          </PureContent>
        ),
        placement: 'top',
        // @ts-expect-error
        class: classNames(type && `${noticePrefixCls}-${type}`, hashId, className),
        onClose: () => {
          onClose?.()
          resolve()
        },
      })

      // Return close function
      return () => {
        close(mergedKey)
      }
    })
  }

  // >>> destroy
  const destroy = (key?: Key) => {
    if (key !== undefined)
      close(key)
    else
      holderRef.value?.destroy()
  }

  const wrapAPI = {
    open,
    destroy,
  } as MessageInstance

  const keys: NoticeType[] = ['info', 'success', 'warning', 'error', 'loading']
  keys.forEach((type) => {
    const typeOpen: TypeOpen = (jointContent, duration, onClose) => {
      let config: MessageArgsProps
      if (jointContent && typeof jointContent === 'object' && 'content' in jointContent) {
        config = jointContent
      } else {
        config = {
          content: jointContent as VNode,
        }
      }

      // Params
      let mergedDuration: number | undefined
      let mergedOnClose: VoidFunction | undefined
      if (typeof duration === 'function') {
        mergedOnClose = duration
      } else {
        mergedDuration = duration
        mergedOnClose = onClose
      }

      const mergedConfig = {
        onClose: mergedOnClose,
        duration: mergedDuration,
        ...config,
        type,
      }

      return open(mergedConfig)
    }

    wrapAPI[type] = typeOpen
  })

  // ============================== Return ===============================
  return [wrapAPI, () => <Holder key={holderKey} {...messageConfig} ref={holderRef} />] as const
}

export default function useMessage(messageConfig?: ConfigOptions) {
  return useInternalMessage(messageConfig)
}
