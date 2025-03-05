import type { CSSInterpolation } from '@antdv/cssinjs';
import type { VueNode } from '@antdv/types';
import type { Ref } from 'vue';

import type { AliasToken } from './alias';
import type { ComponentTokenMap } from './components';

export type OverrideToken = {
  [key in keyof ComponentTokenMap]: Partial<ComponentTokenMap[key]> & Partial<AliasToken>;
};

/** Final token which contains the components level override */
export type GlobalToken = AliasToken & ComponentTokenMap;

export type { AliasToken } from './alias';
export type { ComponentTokenMap } from './components';
export type {
  ColorMapToken,
  ColorNeutralMapToken,
  CommonMapToken,
  FontMapToken,
  HeightMapToken,
  MapToken,
  SizeMapToken,
  StyleMapToken,
} from './maps';
export { PresetColors } from './presetColors';
export type { ColorPalettes, PresetColorKey, PresetColorType } from './presetColors';
export type { SeedToken } from './seeds';
export type UseComponentStyleResult = [(node: VueNode) => VueNode, Ref<string>];

export type GenerateStyle<
  ComponentToken extends object = AliasToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken) => ReturnType;
