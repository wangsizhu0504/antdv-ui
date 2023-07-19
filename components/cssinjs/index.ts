import useCacheToken from './hooks/useCacheToken'
import useStyleRegister, { extractStyle } from './hooks/useStyleRegister'
import Keyframes from './Keyframes'
import { legacyNotSelectorLinter, logicalPropertiesLinter } from './linters/index'
import { StyleProvider, createCache, useStyleInject, useStyleProvider } from './StyleContext'
import { Theme, createTheme } from './theme/index'
import legacyLogicalPropertiesTransformer from './transformers/legacyLogicalProperties'
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
