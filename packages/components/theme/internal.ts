import type {
  AliasToken,
  FullToken,
  GenerateStyle,
  GenStyleFn,
  GetDefaultToken,
  GlobalToken,
  OverrideComponent,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  UseComponentStyleResult,
} from './interface';
import { genCalc as calc, useStyleRegister } from '@antdv/cssinjs';

import { mergeToken, statistic, statisticToken } from '@antdv/cssinjs-utils';
import { PresetColors } from './interface';
import { getLineHeight } from './themes/shared/genFontSizes';
import useToken from './useToken';
import genPresetColor from './util/genPresetColor';
import { genComponentStyleHook, genStyleHooks, genSubStyleComponent } from './util/genStyleUtils';
import useResetIconStyle from './util/useResetIconStyle';

export { defaultConfig, useDesignTokenInject, useDesignTokenProvider } from './context';

export type { CSSUtil, TokenWithCommonCls } from '@antdv/cssinjs-utils';
export {
  calc,
  // generators
  genComponentStyleHook,
  genPresetColor,
  genStyleHooks,
  genSubStyleComponent,
  getLineHeight,
  // utils
  mergeToken,
  // constant
  PresetColors,
  statistic,
  statisticToken,
  // hooks
  useResetIconStyle,
  useStyleRegister,
  useToken,
};
export type {
  AliasToken,
  FullToken,
  GenerateStyle,
  GenStyleFn,
  GetDefaultToken,
  GlobalToken,
  OverrideComponent,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  UseComponentStyleResult,
};
