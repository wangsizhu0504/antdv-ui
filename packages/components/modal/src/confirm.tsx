import type { ConfigUpdate, ModalFuncProps } from './interface';
import { omit, triggerVNodeUpdate } from '@antdv/utils';
import { createVNode, render as vueRender } from 'vue';
import ConfigProvider from '../../config-provider';
import { globalConfigForApi } from '../../config-provider/src/config';

import ConfirmDialog from './ConfirmDialog';
import destroyFns from './destroyFns';
import { getConfirmLocale } from './locale';

function confirm(config: ModalFuncProps) {
  const container = document.createDocumentFragment();
  let currentConfig = {
    ...omit(config, ['parentContext', 'appContext']),
    close,
    open: true,
  } as any;
  let confirmDialogInstance = null;
  function destroy(...args: any[]) {
    if (confirmDialogInstance) {
      // destroy
      vueRender(null, container as any);
      confirmDialogInstance = null;
    }
    const triggerCancel = args.some(param => param && param.triggerCancel);
    if (config.onCancel && triggerCancel)
      config.onCancel(() => {}, ...args.slice(1));

    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function close(this: typeof close, ...args: any[]) {
    currentConfig = {
      ...currentConfig,
      open: false,
      afterClose: () => {
        if (typeof config.afterClose === 'function')
          config.afterClose();

        destroy.apply(this, args);
      },
    };
    // Legacy support
    if (currentConfig.visible)
      delete currentConfig.visible;
    update(currentConfig);
  }

  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      };
    }
    if (confirmDialogInstance)
      triggerVNodeUpdate(confirmDialogInstance, currentConfig, container);
  }

  const Wrapper = (p: ModalFuncProps) => {
    const global = globalConfigForApi;
    const rootPrefixCls = global.prefixCls;
    const prefixCls = p.prefixCls || `${rootPrefixCls}-modal`;
    const iconPrefixCls = global.iconPrefixCls;
    const runtimeLocale = getConfirmLocale();
    return (
      <ConfigProvider {...(global as any)} prefixCls={rootPrefixCls}>
        <ConfirmDialog
          {...p}
          rootPrefixCls={rootPrefixCls}
          prefixCls={prefixCls}
          iconPrefixCls={iconPrefixCls}
          locale={runtimeLocale}
          cancelText={p.cancelText || runtimeLocale.cancelText}
        >
        </ConfirmDialog>
      </ConfigProvider>
    );
  };
  function render(props: ModalFuncProps) {
    const vm = createVNode(Wrapper, { ...props });
    vm.appContext = config.parentContext || config.appContext || vm.appContext;
    vueRender(vm, container as any);
    return vm;
  }

  confirmDialogInstance = render(currentConfig);
  destroyFns.push(close);
  return {
    destroy: close,
    update,
  };
}

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'warning',
  };
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'info',
  };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'success',
  };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'error',
  };
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    ...props,
    type: 'confirm',
  };
}

export default confirm;
