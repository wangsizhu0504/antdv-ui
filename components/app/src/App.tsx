import { computed, defineComponent } from 'vue'
import { initDefaultProps } from '../../_utils/vue'
import { classNames } from '../../_utils/dom'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { useMessage } from '../../message'
import { useModal } from '../../modal'
import { useNotification } from '../../notification'
import useStyle from '../style'
import {
  useInjectAppConfigContext,
  useProvideAppConfigContext,
  useProvideAppContext,
} from './context'

import { appProps } from './props'

export default defineComponent({
  name: 'AApp',
  props: initDefaultProps(appProps(), {}),
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('app', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const customClassName = computed(() => {
      return classNames(hashId.value, prefixCls.value, props.rootClassName)
    })

    const appConfig = useInjectAppConfigContext()
    const mergedAppConfig = computed(() => ({
      message: { ...appConfig.message, ...props.message },
      notification: { ...appConfig.notification, ...props.notification },
    }))
    useProvideAppConfigContext(mergedAppConfig.value)

    const [messageApi, messageContextHolder] = useMessage(mergedAppConfig.value.message)
    const [notificationApi, notificationContextHolder] = useNotification(
      mergedAppConfig.value.notification,
    )
    const [ModalApi, ModalContextHolder] = useModal()

    const memoizedContextValue = computed(() => ({
      message: messageApi,
      notification: notificationApi,
      modal: ModalApi,
    }))
    useProvideAppContext(memoizedContextValue.value)

    return () => {
      return wrapSSR(
        <div class={customClassName.value}>
          {ModalContextHolder()}
          {messageContextHolder()}
          {notificationContextHolder()}
          {slots.default?.()}
        </div>,
      )
    }
  },
})
