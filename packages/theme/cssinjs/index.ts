import useCacheToken from './hooks/useCacheToken'
import useStyleRegister, { extractStyle } from './hooks/useStyleRegister/index'
import Keyframes from './Keyframes'
import { legacyNotSelectorLinter, logicalPropertiesLinter, parentSelectorLinter } from './linters/index'
import { StyleProvider, createCache, useStyleInject, useStyleProvider } from './StyleContext'
import { Theme, createTheme } from './theme/index'
import legacyLogicalPropertiesTransformer from './transformers/legacyLogicalProperties'
import { px2remTransformer } from './transformers/px2rem'
import { supportLogicProps, supportWhere } from './util'
import type { Linter } from './linters/interface'
import type { StyleContextProps, StyleProviderProps } from './StyleContext'
import type { DerivativeFunc, TokenType } from './theme/index'
import type { Transformer } from './transformers/interface'
import type { CSSInterpolation, CSSObject, CSSProperties } from './hooks/useStyleRegister/index'

export const cssinjs = {
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
  CSSProperties,
}

export const _experimental = {
  supportModernCSS: () => supportWhere() && supportLogicProps(),
}
