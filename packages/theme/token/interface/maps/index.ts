import type { ColorPalettes } from '../presetColors';
import type { SeedToken } from '../seeds';
import type { ColorMapToken } from './colors';
import type { FontMapToken } from './font';
import type { HeightMapToken, SizeMapToken } from './size';
import type { StyleMapToken } from './style';

export * from './colors';
export * from './font';
export * from './size';
export * from './style';

export interface CommonMapToken extends StyleMapToken {
  // Motion
  motionDurationFast: string
  motionDurationMid: string
  motionDurationSlow: string
}

// ======================================================================
// ==                         Map Token                         ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥

export interface MapToken
  extends SeedToken,
  ColorPalettes,
  ColorMapToken,
  SizeMapToken,
  HeightMapToken,
  StyleMapToken,
  FontMapToken,
  CommonMapToken {}
