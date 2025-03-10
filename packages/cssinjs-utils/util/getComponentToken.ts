import type { TokenType } from '@antdv/cssinjs';
import type {
  ComponentToken,
  ComponentTokenKey,
  GlobalToken,
  TokenMap,
  TokenMapKey,
} from '../interface';
import { warning } from '@antdv/utils';

function getComponentToken<
  CompTokenMap extends TokenMap,
  AliasToken extends TokenType,
  C extends TokenMapKey<CompTokenMap>,
>(
  component: C,
  token: GlobalToken<CompTokenMap, AliasToken>,
  defaultToken: CompTokenMap[C],
  options?: {
    deprecatedTokens?: Array<[
      ComponentTokenKey<CompTokenMap, AliasToken, C>,
      ComponentTokenKey<CompTokenMap, AliasToken, C>,
    ]>;
  },
) {
  const customToken = {
    ...(token[component] as ComponentToken<CompTokenMap, AliasToken, C>),
  };
  if (options?.deprecatedTokens) {
    const { deprecatedTokens } = options;
    deprecatedTokens.forEach(([oldTokenKey, newTokenKey]) => {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          !customToken?.[oldTokenKey],
          `Component Token \`${String(
            oldTokenKey,
          )}\` of ${String(component)} is deprecated. Please use \`${String(newTokenKey)}\` instead.`,
        );
      }

      // Should wrap with `if` clause, or there will be `undefined` in object.
      if (customToken?.[oldTokenKey] || customToken?.[newTokenKey]) {
        customToken[newTokenKey] ??= customToken?.[oldTokenKey];
      }
    });
  }
  const mergedToken: any = { ...defaultToken, ...customToken };

  // Remove same value as global token to minimize size
  Object.keys(mergedToken).forEach((key) => {
    if (mergedToken[key] === token[key as keyof CompTokenMap]) {
      delete mergedToken[key];
    }
  });

  return mergedToken;
}

export default getComponentToken;
