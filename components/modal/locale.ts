import { enUS as defaultLocale } from '../locale'
import type { ModalLocale } from '../locale'

let runtimeLocale: ModalLocale = {
  ...(defaultLocale.Modal as ModalLocale),
}

export function changeConfirmLocale(newLocale?: ModalLocale) {
  if (newLocale) {
    runtimeLocale = {
      ...runtimeLocale,
      ...newLocale,
    }
  } else {
    runtimeLocale = {
      ...(defaultLocale.Modal as ModalLocale),
    }
  }
}

export function getConfirmLocale() {
  return runtimeLocale
}
