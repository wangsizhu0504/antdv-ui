import { computed, defineComponent } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { classNames } from '@antdv/utils'

import { getMotion } from '@antdv/vue-components/vc-trigger/src/utils/motionUtil'
import useVcNotification from '@antdv/vue-components/vc-notification/src/useNotification'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'

import useStyle from '../style'
import type { ConfigOptions } from './interface'

const DEFAULT_OFFSET = 8
const DEFAULT_DURATION = 3

export type HolderProps = ConfigOptions & {
  onAllRemoved?: VoidFunction
}

export default defineComponent({
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
    'animation',
    'staticGetContainer',
  ],
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
      getContainer: props.staticGetContainer ?? getPopupContainer.value,
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
