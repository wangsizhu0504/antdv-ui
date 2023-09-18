import AModal from './Modal'
import useModal from './useModal'
import confirm, { withConfirm, withError, withInfo, withSuccess, withWarn } from './confirm'
import destroyFns from './destroyFns'

import type { ModalFunc, ModalFuncProps } from './types'
import type { App, Plugin } from 'vue'

export type { ActionButtonProps } from '../_util/components/ActionButton'

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props))
}

export const Modal = Object.assign(AModal, {
  useModal,
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
  install(app: App) {
    app.component(AModal.name, AModal)
    return app
  },
})

export default Modal as typeof Modal & Plugin & {
  readonly info: ModalFunc

  readonly success: ModalFunc

  readonly error: ModalFunc

  readonly warn: ModalFunc

  readonly warning: ModalFunc

  readonly confirm: ModalFunc

  readonly destroyAll: () => void

  readonly useModal: typeof useModal
}

export * from './types'
export * from './props'

export { useModal }
