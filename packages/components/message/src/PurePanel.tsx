import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  LoadingOutlined,
} from '@ant-design/icons-vue'
import { computed, defineComponent } from 'vue'
import { classNames } from '@antdv/utils'
import VcNotice from '../../notification/src/vc-notification/Notice'
import { useConfigContextInject } from '../../config-provider/src/context'
import useStyle from '../style'
import type { MessagePureContentProps, MessagePurePanelProps } from './props'

export const TypeIcon = {
  info: <InfoCircleFilled />,
  success: <CheckCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
  loading: <LoadingOutlined />,
}

export const PureContent = defineComponent<MessagePureContentProps>({
  name: 'PureContent',
  inheritAttrs: false,
  props: ['prefixCls', 'type', 'icon'] as any,

  setup(props, { slots }) {
    return () => (
      <div
        class={classNames(`${props.prefixCls}-custom-content`, `${props.prefixCls}-${props.type}`)}
      >
        {props.icon || TypeIcon[props.type!]}
        <span>{slots.default?.()}</span>
      </div>
    )
  },
})

/** @private Internal Component. Do not use in your production. */

export default defineComponent<MessagePurePanelProps>({
  name: 'PurePanel',
  inheritAttrs: false,
  props: ['prefixCls', 'class', 'type', 'icon', 'content'] as any,
  setup(props, { slots, attrs }) {
    const { getPrefixCls } = useConfigContextInject()
    const prefixCls = computed(() => props.prefixCls || getPrefixCls('message'))
    const [, hashId] = useStyle(prefixCls)
    return (
      <VcNotice
        {...attrs}
        prefixCls={prefixCls.value}
        class={classNames(hashId.value, `${prefixCls.value}-notice-pure-panel`)}
        noticeKey="pure"
        duration={null}
      >
        <PureContent prefixCls={prefixCls.value} type={props.type} icon={props.icon}>
          {slots.default?.()}
        </PureContent>
      </VcNotice>
    )
  },
})
