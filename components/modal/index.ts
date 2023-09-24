import AModal from './src/Modal'
import useModal from './src/useModal'
import confirm, { withConfirm, withError, withInfo, withSuccess, withWarn } from './src/confirm'
import destroyFns from './src/destroyFns'

import type { ModalFunc, ModalFuncProps } from './src/types'
import type { App, Plugin } from 'vue'

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

export * from './src/types'
export * from './src/props'

export { useModal }
