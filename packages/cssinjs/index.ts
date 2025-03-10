import type { CSSInterpolation, CSSObject, CSSProperties } from './hooks/useStyleRegister';
import type { Linter } from './linters/interface';
import type { StyleContextProps, StyleProviderProps } from './StyleContext';
import type { AbstractCalculator, DerivativeFunc, TokenType } from './theme/index';
import type { Transformer } from './transformers/interface';
import extractStyle from './extractStyle';
import useCacheToken, { getComputedToken } from './hooks/useCacheToken';
import useCSSVarRegister from './hooks/useCSSVarRegister';
import useStyleRegister from './hooks/useStyleRegister';
import Keyframes from './Keyframes';
import {
  legacyNotSelectorLinter,
  logicalPropertiesLinter,
  NaNLinter,
  parentSelectorLinter,
} from './linters';
import { createCache, StyleProvider, useStyleInject, useStyleProvider } from './StyleContext';
import { createTheme, genCalc, Theme } from './theme/index';
import legacyLogicalPropertiesTransformer from './transformers/legacyLogicalProperties';
import px2remTransformer from './transformers/px2rem';
import { supportLogicProps, supportWhere, unit } from './util';
import { token2CSSVar } from './util/css-variables';

export const cssinjs = {
  Theme,
  createTheme,
  useStyleRegister,
  useCSSVarRegister,
  useCacheToken,
  useStyleInject,
  useStyleProvider,
  createCache,
  StyleProvider,
  Keyframes,
  extractStyle,
  getComputedToken,

  // Transformer
  legacyLogicalPropertiesTransformer,
  px2remTransformer,

  // Linters
  logicalPropertiesLinter,
  legacyNotSelectorLinter,
  parentSelectorLinter,
  NaNLinter,

  // util
  token2CSSVar,
  unit,
  genCalc,
};
export {
  createCache,
  createTheme,
  extractStyle,
  genCalc,
  getComputedToken,
  Keyframes,
  legacyLogicalPropertiesTransformer,
  legacyNotSelectorLinter,
  logicalPropertiesLinter,
  NaNLinter,
  parentSelectorLinter,
  px2remTransformer,

  StyleProvider,
  Theme,

  token2CSSVar,
  unit,
  useCacheToken,
  useCSSVarRegister,
  useStyleInject,
  useStyleProvider,
  useStyleRegister,
};
export type {
  AbstractCalculator,
  CSSInterpolation,

  CSSObject,
  CSSProperties,
  DerivativeFunc,
  Linter,
  StyleContextProps,
  StyleProviderProps,
  TokenType,
  Transformer,
};

export const _experimental = {
  supportModernCSS: () => supportWhere() && supportLogicProps(),
};
