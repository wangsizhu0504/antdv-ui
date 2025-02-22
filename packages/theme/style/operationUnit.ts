import type { CSSObject } from '../cssinjs';
import type { DerivativeToken } from '../token';

export function operationUnit(token: DerivativeToken): CSSObject {
  return {
  // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
  // And Typography use this to generate link style which should not do this.
    'color': token.colorLink,
    'textDecoration': 'none',
    'outline': 'none',
    'cursor': 'pointer',
    'transition': `color ${token.motionDurationSlow}`,

    '&:focus, &:hover': {
      color: token.colorLinkHover,
    },

    '&:active': {
      color: token.colorLinkActive,
    },
  };
}
