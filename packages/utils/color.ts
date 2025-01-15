import type { InverseColor, PresetStatusColorType } from '@antdv/types';
import { PresetColors } from '@antdv/constants';

const inverseColors = PresetColors.map<InverseColor>(color => `${color}-inverse`);
const presetStatusColorTypes = [
  'success',
  'processing',
  'error',
  'default',
  'warning',
] as const;
/**
 * determine if the color keyword belongs to the `Ant Design` {@link PresetColors}.
 * @param color color to be judged
 * @param includeInverse whether to include reversed colors
 */
export function isPresetColor(color?: any, includeInverse = true) {
  if (includeInverse)
    return [...inverseColors, ...PresetColors].includes(color);

  return PresetColors.includes(color);
}

export function isPresetStatusColor(color?: any): color is PresetStatusColorType {
  return presetStatusColorTypes.includes(color);
}
