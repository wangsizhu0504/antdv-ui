import type { IDialogChildProps } from './IDialogPropTypes';
import { initDefaultProps } from '@antdv/utils';
import { defineComponent, ref, watch } from 'vue';
import Portal from '../../portal/src/PortalWrapper';
import { useProvidePortal } from '../../vc-trigger/src/context';
import Dialog from './Dialog';
import getDialogPropTypes from './IDialogPropTypes';

const IDialogPropTypes = getDialogPropTypes();
const DialogWrap = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DialogWrap',
  inheritAttrs: false,
  props: initDefaultProps(IDialogPropTypes, {
    visible: false,
  }),
  setup(props, { attrs, slots }) {
    const animatedVisible = ref(props.visible);
    useProvidePortal({}, { inTriggerContext: false });
    watch(
      () => props.visible,
      () => {
        if (props.visible)
          animatedVisible.value = true;
      },
      { flush: 'post' },
    );
    return () => {
      const { visible, getContainer, forceRender, destroyOnClose = false, afterClose } = props;
      let dialogProps = {
        ...props,
        ...attrs,
        ref: '_component',
        key: 'dialog',
      } as IDialogChildProps;
      // 渲染在当前 dom 里；
      if (getContainer === false) {
        return (
          <Dialog
            {...dialogProps}
            getOpenCount={() => 2} // 不对 body 做任何操作。。
            v-slots={slots}
          >
          </Dialog>
        );
      }

      // Destroy on close will remove wrapped div
      if (!forceRender && destroyOnClose && !animatedVisible.value)
        return null;

      return (
        <Portal
          autoLock
          visible={visible}
          forceRender={forceRender}
          getContainer={getContainer}
          v-slots={{
            default: (childProps: IDialogChildProps) => {
              dialogProps = {
                ...dialogProps,
                ...childProps,
                afterClose: () => {
                  afterClose?.();
                  animatedVisible.value = false;
                },
              };
              return <Dialog {...dialogProps} v-slots={slots}></Dialog>;
            },
          }}
        />
      );
    };
  },
});

export default DialogWrap;
