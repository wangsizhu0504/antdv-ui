import type { VueNode } from '@antdv/types';
import type {
  ColorGenInput,
} from '@antdv/vue-components/vc-color-picker';
import type { Color } from './color';
import type { ColorPickerProps } from './ColorPicker';

export type { ColorGenInput };
export type Colors<T> = Array<{
  color: ColorGenInput<T>;
  percent: number;
}>;

export enum ColorFormat {
  hex = 'hex',
  rgb = 'rgb',
  hsb = 'hsb',
}

export interface PresetsItem {
  label: VueNode;
  colors: Array<string | Color>;
}
export type TriggerType = 'click' | 'hover';

export type TriggerPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';
export interface ColorPickerBaseProps {
  color?: Color;
  prefixCls: string;
  format?: keyof typeof ColorFormat;
  allowClear?: boolean;
  colorCleared?: boolean;
  disabled?: boolean;
  presets?: PresetsItem[];
  onFormatChange?: ColorPickerProps['onFormatChange'];
  onChangeComplete?: ColorPickerProps['onChangeComplete'];
}
