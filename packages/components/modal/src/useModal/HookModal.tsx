import type { PropType } from 'vue';
import type { HookModalProps, ModalFuncProps } from '../interface';
import { enUS as defaultLocale } from '@antdv/locale';
import { initDefaultProps } from '@antdv/utils';
import { computed, defineComponent } from 'vue';
import { useConfigContextInject } from '../../../config-provider';
import { useLocaleReceiver } from '../../../locale-provider';
import ConfirmDialog from '../ConfirmDialog';

function comfirmFuncProps() {
  return {
    config: Object as PropType<ModalFuncProps>,
    afterClose: Function as PropType<() => void>,
    destroyAction: Function as PropType<(e: any) => void>,
    open: Boolean,
  };
}

export default defineComponent({
  name: 'HookModal',
  inheritAttrs: false,
  props: initDefaultProps(comfirmFuncProps(), {
    config: {
      width: 520,
      okType: 'primary',
    },
  }),
  setup(props: HookModalProps, { expose }) {
    const open = computed(() => props.open);
    const innerConfig = computed(() => props.config);
    const { direction, getPrefixCls } = useConfigContextInject();
    const prefixCls = getPrefixCls('modal');
    const rootPrefixCls = getPrefixCls();

    const afterClose = () => {
      props?.afterClose();
      innerConfig.value.afterClose?.();
    };

    const close = (...args: any[]) => {
      props.destroyAction(...args);
    };

    expose({ destroy: close });
    const mergedOkCancel = innerConfig.value.okCancel ?? innerConfig.value.type === 'confirm';
    const [contextLocale] = useLocaleReceiver('Modal', defaultLocale.Modal);
    return () => (
      <ConfirmDialog
        prefixCls={prefixCls}
        rootPrefixCls={rootPrefixCls}
        {...innerConfig.value}
        close={close}
        open={open.value}
        afterClose={afterClose}
        okText={
          innerConfig.value.okText
          || (mergedOkCancel ? contextLocale?.value.okText : contextLocale?.value.justOkText)
        }
        direction={innerConfig.value.direction || direction.value}
        cancelText={innerConfig.value.cancelText || contextLocale?.value.cancelText}
      />
    );
  },
});
