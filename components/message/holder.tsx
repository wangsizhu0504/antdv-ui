import { computed, defineComponent } from 'vue'
import CloseOutlined from '@ant-design/icons-vue'
import { useConfigInject } from '../hooks'
import classNames from '../_util/classNames'
import { getMotion } from '../vc-trigger/utils/motionUtil'
import { useNotification as useVcNotification } from '../vc-notification'
import useStyle from './style'
import type { ConfigOptions } from './interface'

const DEFAULT_OFFSET = 8
const DEFAULT_DURATION = 3

export type HolderProps = ConfigOptions & {
  onAllRemoved?: VoidFunction
}

export const Holder = defineComponent({
  name: 'Holder',
  inheritAttrs: false,
  props: [
    'top',
    'prefixCls',
    'getContainer',
    'maxCount',
    'duration',
    'rtl',
    'transitionName',
    'onAllRemoved',
  ] as any,
  setup(props, { expose }) {
    const { getPrefixCls, getPopupContainer } = useConfigInject('message', props)

    const prefixCls = computed(() => getPrefixCls('message', props.prefixCls))

    const [, hashId] = useStyle(prefixCls)

    // =============================== Style ===============================
    const getStyles = () => {
      const top = props.top ?? DEFAULT_OFFSET
      return {
        left: '50%',
        transform: 'translateX(-50%)',
        top: typeof top === 'number' ? `${top}px` : top,
      }
    }
    const getClassName = () => classNames(hashId.value, props.rtl ? `${prefixCls.value}-rtl` : '')

    // ============================== Motion ===============================
    const getNotificationMotion = () =>
      getMotion({
        prefixCls: prefixCls.value,
        animation: props.animation ?? 'move-up',
        transitionName: props.transitionName,
      })

    // ============================ Close Icon =============================
    const mergedCloseIcon = (
      <span class={`${prefixCls.value}-close-x`}>
        <CloseOutlined class={`${prefixCls.value}-close-icon`} />
      </span>
    )

    // ============================== Origin ===============================
    const [api, holder] = useVcNotification({
      getStyles,
      prefixCls: prefixCls.value,
      getClassName,
      motion: getNotificationMotion,
      closable: false,
      closeIcon: mergedCloseIcon,
      duration: props.duration ?? DEFAULT_DURATION,
      getContainer: () =>
        props.staticGetContainer?.() || getPopupContainer.value?.() || document.body,
      maxCount: props.maxCount,
      onAllRemoved: props.onAllRemoved,
    })

    // ================================ Ref ================================
    expose({
      ...api,
      prefixCls,
      hashId,
    })
    return holder
  },
})
