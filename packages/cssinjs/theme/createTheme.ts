import type { DerivativeFunc, TokenType } from './interface';
import Theme from './Theme';
import ThemeCache from './ThemeCache';

const cacheThemes = new ThemeCache();

/**
 * Same as new Theme, but will always return same one if `derivative` not changed.
 */
export default function createTheme<
  DesignToken extends TokenType,
  DerivativeToken extends TokenType,
>(
  derivatives:
  | Array<DerivativeFunc<DesignToken, DerivativeToken>>
  | DerivativeFunc<DesignToken, DerivativeToken>,
) {
  const derivativeArr = Array.isArray(derivatives)
    ? derivatives
    : [derivatives];
  // Create new theme if not exist
  if (!cacheThemes.has(derivativeArr)) {
    cacheThemes.set(derivativeArr, new Theme(derivativeArr));
  }

  // Get theme from cache and return
  return cacheThemes.get(derivativeArr)!;
}
