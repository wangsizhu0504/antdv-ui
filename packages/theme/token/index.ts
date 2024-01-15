import { useStyleRegister } from '../cssinjs'
import { defaultConfig, useToken as useInternalToken } from './internal'
import defaultAlgorithm from './themes/default'
import darkAlgorithm from './themes/dark'
import compactAlgorithm from './themes/compact'
import { PresetColors } from './interface'
import genComponentStyleHook from './util/genComponentStyleHook'
import statisticToken, { merge as mergeToken, statistic } from './util/statistic'
import type { FullToken } from './util/genComponentStyleHook'
import type {
  AliasToken,
  GenerateStyle,
  GlobalToken,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  UseComponentStyleResult,
} from './interface'

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
  // colors
  PresetColors,
  // Statistic
  statistic,
  statisticToken,
  defaultConfig,
  mergeToken,
  // hooks
  useStyleRegister,
  genComponentStyleHook,
  useInternalToken as useToken,
}
export type {
  UseComponentStyleResult,
  GlobalToken,
  GenerateStyle,
  SeedToken,
  AliasToken,
  PresetColorType,
  PresetColorKey,
  // FIXME: Remove this type
  AliasToken as DerivativeToken,
  FullToken,
}
