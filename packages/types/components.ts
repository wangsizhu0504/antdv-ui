import type { PresetColors, PresetStatusColorTypes } from '@antdv/constants'

export type InputStatus = '' | 'error' | 'warning'
export type ValidateStatus = '' | 'success' | 'warning' | 'error' | 'validating'
export type SelectCommonPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'

export type SizeType = 'small' | 'middle' | 'large' | undefined
export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Record<Breakpoint, string>
export type ScreenMap = Partial<Record<Breakpoint, boolean>>
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>

export type PresetColorKey = (typeof PresetColors)[number]
export type InverseColor = `${PresetColorKey}-inverse`
export type PresetColorType = PresetColorKey | InverseColor
export type PresetStatusColorType = (typeof PresetStatusColorTypes)[number]
