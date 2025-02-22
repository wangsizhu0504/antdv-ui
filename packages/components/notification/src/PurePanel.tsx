import type { VueNode } from '@antdv/types';
import type { NotificationPureContentProps, NotificationPurePanelProps } from './interface';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CloseOutlined,
  ExclamationCircleFilled,
  InfoCircleFilled,
  LoadingOutlined,
} from '@ant-design/icons-vue';
import { classNames, renderHelper } from '@antdv/utils';
import VcNotice from '@antdv/vue-components/vc-notification/src/Notice';
import { computed, defineComponent } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import useStyle from '../style';

export function getCloseIcon(prefixCls: string, closeIcon?: VueNode) {
  return (
    closeIcon || (
      <span class={`${prefixCls}-close-x`}>
        <CloseOutlined class={`${prefixCls}-close-icon`} />
      </span>
    )
  );
}

export const TypeIcon = {
  info: <InfoCircleFilled />,
  success: <CheckCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
  loading: <LoadingOutlined />,
};

const typeToIcon = {
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
};

export function PureContent({
  prefixCls,
  icon,
  type,
  message,
  description,
  btn,
}: NotificationPureContentProps) {
  let iconNode = null;
  if (icon) {
    iconNode = <span class={`${prefixCls}-icon`}>{renderHelper(icon)}</span>;
  } else if (type) {
    const Icon = typeToIcon[type];
    iconNode = <Icon class={`${prefixCls}-icon ${prefixCls}-icon-${type}`} />;
  }

  return (
    <div
      class={classNames({
        [`${prefixCls}-with-icon`]: iconNode,
      })}
      role="alert"
    >
      {iconNode}
      <div class={`${prefixCls}-message`}>{message}</div>
      <div class={`${prefixCls}-description`}>{description}</div>
      {btn && <div class={`${prefixCls}-btn`}>{btn}</div>}
    </div>
  );
}

/** @private Internal Component. Do not use in your production. */
export default defineComponent<NotificationPurePanelProps>({
  name: 'PurePanel',
  inheritAttrs: false,
  props: ['prefixCls', 'icon', 'type', 'message', 'description', 'btn', 'closeIcon'] as any,
  setup(props) {
    const { getPrefixCls } = useConfigInject('notification', props);
    const prefixCls = computed(() => props.prefixCls || getPrefixCls('notification'));
    const noticePrefixCls = computed(() => `${prefixCls.value}-notice`);

    const [, hashId] = useStyle(prefixCls);
    return () => {
      return (
        <VcNotice
          {...props}
          prefixCls={prefixCls.value}
          class={classNames(hashId.value, `${noticePrefixCls.value}-pure-panel`)}
          noticeKey="pure"
          duration={null}
          closable={props.closable}
          closeIcon={getCloseIcon(prefixCls.value, props.closeIcon)}
        >
          <PureContent
            prefixCls={noticePrefixCls.value}
            icon={props.icon}
            type={props.type}
            message={props.message}
            description={props.description}
            btn={props.btn}
          />
        </VcNotice>
      );
    };
  },
});
