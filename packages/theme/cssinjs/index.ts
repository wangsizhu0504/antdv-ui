import type { CSSInterpolation, CSSObject, CSSProperties } from './hooks/useStyleRegister/index'
import type { Linter } from './linters/interface'
import type { StyleContextProps, StyleProviderProps } from './StyleContext'
import type { DerivativeFunc, TokenType } from './theme/index'
import type { Transformer } from './transformers/interface'
import useCacheToken from './hooks/useCacheToken'
import useStyleRegister, { extractStyle } from './hooks/useStyleRegister/index'
import Keyframes from './Keyframes'
import { legacyNotSelectorLinter, logicalPropertiesLinter, parentSelectorLinter } from './linters/index'
import { createCache, StyleProvider, useStyleInject, useStyleProvider } from './StyleContext'
import { createTheme, Theme } from './theme/index'
import legacyLogicalPropertiesTransformer from './transformers/legacyLogicalProperties'
import { px2remTransformer } from './transformers/px2rem'
import { supportLogicProps, supportWhere } from './util'

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
  createCache,
  createTheme,
  extractStyle,
  Keyframes,
  // Transformer
  legacyLogicalPropertiesTransformer,
  legacyNotSelectorLinter,
  // Linters
  logicalPropertiesLinter,
  parentSelectorLinter,
  px2remTransformer,

  // cssinjs
  StyleProvider,
  Theme,

  useCacheToken,
  useStyleInject,
  useStyleProvider,

  useStyleRegister,
}
export type {
  CSSInterpolation,
  CSSObject,
  CSSProperties,
  DerivativeFunc,
  Linter,
  StyleContextProps,
  StyleProviderProps,
  TokenType,
  Transformer,
}

export const _experimental = {
  supportModernCSS: () => supportWhere() && supportLogicProps(),
}
