import { PresetColors, PresetStatusColorTypes } from '@antdv/constants'
import type { InverseColor, PresetStatusColorType } from '@antdv/types'

const inverseColors = PresetColors.map<InverseColor>(color => `${color}-inverse`)

/**
 * determine if the color keyword belongs to the `Ant Design` {@link PresetColors}.
 * @param color color to be judged
 * @param includeInverse whether to include reversed colors
 */
export function isPresetColor(color?: any, includeInverse = true) {
  if (includeInverse)
    return [...inverseColors, ...PresetColors].includes(color)

  return PresetColors.includes(color)
}

export function isPresetStatusColor(color?: any): color is PresetStatusColorType {
  return PresetStatusColorTypes.includes(color)
}
