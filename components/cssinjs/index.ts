import useCacheToken from './hooks/useCacheToken'
import useStyleRegister, { extractStyle } from './hooks/useStyleRegister'
import Keyframes from './Keyframes'
import { legacyNotSelectorLinter, logicalPropertiesLinter, parentSelectorLinter } from './linters/index'
import { StyleProvider, createCache, useStyleInject, useStyleProvider } from './StyleContext'
import { Theme, createTheme } from './theme/index'
import legacyLogicalPropertiesTransformer from './transformers/legacyLogicalProperties'
import { px2remTransformer } from './transformers/px2rem'
import type { Linter } from './linters/interface'
import type { StyleContextProps, StyleProviderProps } from './StyleContext'
import type { DerivativeFunc, TokenType } from './theme/index'
import type { Transformer } from './transformers/interface'
import type { CSSInterpolation, CSSObject } from './hooks/useStyleRegister'

const cssinjs = {
  Theme,
  createTheme,
  useStyleRegister,
  useCacheToken,
  createCache,
  useStyleInject,
  useStyleProvider,
  Keyframes,
  extractStyle,

  // Transformer
  legacyLogicalPropertiesTransformer,
  px2remTransformer,

  // Linters
  logicalPropertiesLinter,
  legacyNotSelectorLinter,
  parentSelectorLinter,

  // cssinjs
  StyleProvider,
}
export {
  Theme,
  createTheme,
  useStyleRegister,
  useCacheToken,
  createCache,
  useStyleInject,
  useStyleProvider,
  Keyframes,
  extractStyle,

  // Transformer
  legacyLogicalPropertiesTransformer,
  px2remTransformer,

  // Linters
  logicalPropertiesLinter,
  legacyNotSelectorLinter,
  parentSelectorLinter,

  // cssinjs
  StyleProvider,
}
export type {
  TokenType,
  CSSObject,
  CSSInterpolation,
  DerivativeFunc,
  Transformer,
  Linter,
  StyleContextProps,
  StyleProviderProps,
}

export default cssinjs
