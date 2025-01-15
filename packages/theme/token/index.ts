import type {
  AliasToken,
  GenerateStyle,
  GlobalToken,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  UseComponentStyleResult,
} from './interface'
import type { FullToken } from './util/genComponentStyleHook'
import { useStyleRegister } from '../cssinjs'
import { PresetColors } from './interface'
import { defaultConfig, useToken as useInternalToken } from './internal'
import compactAlgorithm from './themes/compact'
import darkAlgorithm from './themes/dark'
import defaultAlgorithm from './themes/default'
import genComponentStyleHook from './util/genComponentStyleHook'
import statisticToken, { merge as mergeToken, statistic } from './util/statistic'

/** Get current context Design Token. Will be different if you are using nest theme config. */
function useToken() {
  const [theme, token, hashId] = useInternalToken()

  return { theme, token, hashId }
}

export const theme = {
  /** @private Test Usage. Do not use in production. */
  defaultConfig,

  /** Default seedToken */
  defaultSeed: defaultConfig.token,

  useToken,
  defaultAlgorithm,
  darkAlgorithm,
  compactAlgorithm,
}

export {
  defaultConfig,
  genComponentStyleHook,
  mergeToken,
  // colors
  PresetColors,
  // Statistic
  statistic,
  statisticToken,
  useInternalToken as useToken,
  // hooks
  useStyleRegister,
}
export type {
  AliasToken,
  // FIXME: Remove this type
  AliasToken as DerivativeToken,
  FullToken,
  GenerateStyle,
  GlobalToken,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  UseComponentStyleResult,
}
