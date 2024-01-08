import type { PresetColors, PresetStatusColorTypes } from '@antdv/constants'

export type PresetColorKey = (typeof PresetColors)[number]

export type PresetColorType = PresetColorKey | InverseColor

export type PresetStatusColorType = (typeof PresetStatusColorTypes)[number]

export type InverseColor = `${PresetColorKey}-inverse`
