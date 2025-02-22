import type { CSSObject } from '../cssinjs';
import type { DerivativeToken } from '../token';

export { operationUnit } from './operationUnit';
export { roundedArrow } from './roundedArrow';

export const textEllipsis: CSSObject = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export function resetComponent(token: DerivativeToken): CSSObject {
  return {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    color: token.colorText,
    fontSize: token.fontSize,
    // font-variant: @font-variant-base;
    lineHeight: token.lineHeight,
    listStyle: 'none',
    // font-feature-settings: @font-feature-settings-base;
    fontFamily: token.fontFamily,
  };
}

export function resetIcon(): CSSObject {
  return {
    'display': 'inline-flex',
    'alignItems': 'center',
    'color': 'inherit',
    'fontStyle': 'normal',
    'lineHeight': 0,
    'textAlign': 'center',
    'textTransform': 'none',
    // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
    'verticalAlign': '-0.125em',
    'textRendering': 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',

    '> *': {
      lineHeight: 1,
    },

    'svg': {
      display: 'inline-block',
    },
  };
}

export function clearFix(): CSSObject {
  return {
  // https://github.com/ant-design/ant-design/issues/21301#issuecomment-583955229
    '&::before': {
      display: 'table',
      content: '""',
    },

    '&::after': {
    // https://github.com/ant-design/ant-design/issues/21864
      display: 'table',
      clear: 'both',
      content: '""',
    },
  };
}

export function genLinkStyle(token: DerivativeToken): CSSObject {
  return {
    a: {
      'color': token.colorLink,
      'textDecoration': token.linkDecoration,
      'backgroundColor': 'transparent', // remove the gray background on active links in IE 10.
      'outline': 'none',
      'cursor': 'pointer',
      'transition': `color ${token.motionDurationSlow}`,
      '-webkit-text-decoration-skip': 'objects', // remove gaps in links underline in iOS 8+ and Safari 8+.

      '&:hover': {
        color: token.colorLinkHover,
      },

      '&:active': {
        color: token.colorLinkActive,
      },

      [`&:active,
  &:hover`]: {
        textDecoration: token.linkHoverDecoration,
        outline: 0,
      },

      // https://github.com/ant-design/ant-design/issues/22503
      '&:focus': {
        textDecoration: token.linkFocusDecoration,
        outline: 0,
      },

      '&[disabled]': {
        color: token.colorTextDisabled,
        cursor: 'not-allowed',
      },
    },
  };
}

export function genCommonStyle(token: DerivativeToken, componentPrefixCls: string): CSSObject {
  const { fontFamily, fontSize } = token;

  const rootPrefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;

  return {
    [rootPrefixSelector]: {
      fontFamily,
      fontSize,
      'boxSizing': 'border-box',

      '&::before, &::after': {
        boxSizing: 'border-box',
      },

      [rootPrefixSelector]: {
        'boxSizing': 'border-box',

        '&::before, &::after': {
          boxSizing: 'border-box',
        },
      },
    },
  };
}

export function genFocusOutline(token: DerivativeToken): CSSObject {
  return {
    outline: `${token.lineWidthBold}px solid ${token.colorPrimaryBorder}`,
    outlineOffset: 1,
    transition: 'outline-offset 0s, outline 0s',
  };
}

export function genFocusStyle(token: DerivativeToken): CSSObject {
  return {
    '&:focus-visible': {
      ...genFocusOutline(token),
    },
  };
}
