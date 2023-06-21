import useCacheToken from './hooks/useCacheToken'
import type { CSSInterpolation, CSSObject } from './hooks/useStyleRegister'
import useStyleRegister, { extractStyle } from './hooks/useStyleRegister'
import Keyframes from './Keyframes'
import type { Linter } from './linters/interface'
import { legacyNotSelectorLinter, logicalPropertiesLinter } from './linters/index'
import type { StyleContextProps, StyleProviderProps } from './StyleContext'
import { StyleProvider, createCache, useStyleInject, useStyleProvider } from './StyleContext'
import type { DerivativeFunc, TokenType } from './theme/index'
import { Theme, createTheme } from './theme/index'
import type { Transformer } from './transformers/interface'
import legacyLogicalPropertiesTransformer from './transformers/legacyLogicalProperties'

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

  // Linters
  logicalPropertiesLinter,
  legacyNotSelectorLinter,

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

  // Linters
  logicalPropertiesLinter,
  legacyNotSelectorLinter,

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
