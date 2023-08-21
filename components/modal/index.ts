import Modal from './Modal'
import useModal from './useModal'
import confirm, { withConfirm, withError, withInfo, withSuccess, withWarn } from './confirm'
import destroyFns from './destroyFns'
import type { ModalFunc, ModalFuncProps } from './type'
import type { App, Plugin } from 'vue'

export * from './type'

export type { ActionButtonProps } from '../_util/components/ActionButton'
export type { ModalProps } from './Modal'

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props))
}

const AntdModal = Modal

AntdModal.useModal = useModal
Object.assign(AntdModal, {
  info: function infoFn(props: ModalFuncProps) {
    return confirm(withInfo(props))
  },
  success: function successFn(props: ModalFuncProps) {
    return confirm(withSuccess(props))
  },
  error: function errorFn(props: ModalFuncProps) {
    return confirm(withError(props))
  },
  warning: modalWarn,
  warn: modalWarn,
  confirm: function confirmFn(props: ModalFuncProps) {
    return confirm(withConfirm(props))
  },
  destroyAll: function destroyAllFn() {
    while (destroyFns.length) {
      const close = destroyFns.pop()
      if (close)
        close()
    }
  },
})

/* istanbul ignore next */
AntdModal.install = function (app: App) {
  app.component(AntdModal.name, AntdModal)
  return app
}
export default AntdModal as typeof AntdModal &
Plugin & {
  readonly info: ModalFunc

  readonly success: ModalFunc

  readonly error: ModalFunc

  readonly warn: ModalFunc

  readonly warning: ModalFunc

  readonly confirm: ModalFunc

  readonly destroyAll: () => void

  readonly useModal: typeof useModal
}
