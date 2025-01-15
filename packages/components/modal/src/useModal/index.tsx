import type { VueNode } from '@antdv/types';
import type { Ref } from 'vue';
import type { HookModalRef, ModalFuncProps, ModalFuncWithRef, ModalStaticFunctions } from '../interface';
import {
  computed,
  defineComponent,
  isRef,
  shallowRef,
  unref,
  watch,
} from 'vue';
import { withConfirm, withError, withInfo, withSuccess, withWarn } from '../confirm';
import destroyFns from '../destroyFns';
import HookModal from './HookModal';

let uuid = 0;

interface ElementsHolderRef {
  addModal: (modal: () => VueNode) => () => void
}

const ElementsHolder = defineComponent({
  name: 'ElementsHolder',
  inheritAttrs: false,
  setup(_, { expose }) {
    const modals = shallowRef<Array<() => VueNode>>([]);
    const addModal = (modal: () => VueNode) => {
      modals.value.push(modal);
      modals.value = modals.value.slice();
      return () => {
        modals.value = modals.value.filter(currentModal => currentModal !== modal);
      };
    };

    expose({ addModal });
    return () => {
      return modals.value.map(modal => modal());
    };
  },
});

function useModal(): readonly [
  Omit<ModalStaticFunctions<ModalFuncWithRef>, 'warn'>,
  () => VueNode,
] {
  const holderRef = shallowRef<ElementsHolderRef>(null);
  // ========================== Effect ==========================
  const actionQueue = shallowRef([]);
  watch(
    actionQueue,
    () => {
      if (actionQueue.value.length) {
        const cloneQueue = [...actionQueue.value];
        cloneQueue.forEach((action) => {
          action();
        });
        actionQueue.value = [];
      }
    },
    {
      immediate: true,
    },
  );

  // =========================== Hook ===========================
  const getConfirmFunc = (withFunc: (config: ModalFuncProps) => ModalFuncProps) =>
    function hookConfirm(config: Ref<ModalFuncProps> | ModalFuncProps) {
      uuid += 1;
      const open = shallowRef(true);
      const modalRef = shallowRef<HookModalRef>(null);
      const configRef = shallowRef(unref(config));
      const updateConfig = shallowRef({});
      const updateAction = (newConfig: ModalFuncProps) => {
        configRef.value = {
          ...configRef.value,
          ...newConfig,
        };
      };
      watch(
        () => config,
        (val) => {
          updateAction({
            ...(isRef(val) ? val.value : val),
            ...updateConfig.value,
          });
        },
      );

      const destroyAction = (...args: any[]) => {
        open.value = false;
        const triggerCancel = args.some(param => param && param.triggerCancel);
        if (configRef.value.onCancel && triggerCancel)
          configRef.value.onCancel(() => {}, ...args.slice(1));
      };

      let closeFunc: Function | undefined;
      const modal = () => (
        <HookModal
          key={`modal-${uuid}`}
          config={withFunc(configRef.value)}
          ref={modalRef}
          open={open.value}
          destroyAction={destroyAction}
          afterClose={() => {
            closeFunc?.();
          }}
        />
      );

      closeFunc = holderRef.value?.addModal(modal);

      if (closeFunc)
        destroyFns.push(closeFunc);

      const destroy = () => {
        if (modalRef.value)
          destroyAction();
        else
          actionQueue.value = [...actionQueue.value, destroyAction];
      };

      const update = (newConfig: ModalFuncProps) => {
        updateConfig.value = newConfig;
        if (modalRef.value)
          updateAction(newConfig);
        else
          actionQueue.value = [...actionQueue.value, () => updateAction(newConfig)];
      };
      return {
        destroy,
        update,
      };
    };

  const fns = computed(() => ({
    info: getConfirmFunc(withInfo),
    success: getConfirmFunc(withSuccess),
    error: getConfirmFunc(withError),
    warning: getConfirmFunc(withWarn),
    confirm: getConfirmFunc(withConfirm),
  }));
  const holderKey = Symbol('modalHolderKey');
  return [fns.value, () => <ElementsHolder key={holderKey} ref={holderRef} />] as const;
}

export default useModal;
