import type { BaseTransitionProps } from 'vue'
import type { InputStatuses, PresetStatusColorTypes } from '../../constant'
import type { PresetColorKey } from '../../theme'

export type InverseColor = `${PresetColorKey}-inverse`

export type PresetColorType = PresetColorKey | InverseColor

export type PresetStatusColorType = (typeof PresetStatusColorTypes)[number]
export interface RefObject extends Function {
  current?: any
}

export type InputStatus = (typeof InputStatuses)[number]

export interface CSSMotionProps extends Partial<BaseTransitionProps<Element>> {
  name?: string
  css?: boolean
}
