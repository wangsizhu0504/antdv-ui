import type { CSSObject, FullToken } from '@antdv/theme';
import type { CSSProperties } from 'vue';
import { genComponentStyleHook, mergeToken, resetComponent } from '@antdv/theme';
import { genPresetColor } from '@antdv/theme/style/presetColor';
import { capitalize } from '@antdv/utils';

export interface ComponentToken {}

interface TagToken extends FullToken<'Tag'> {
  tagFontSize: number
  tagLineHeight: CSSProperties['lineHeight']
  tagDefaultBg: string
  tagDefaultColor: string
  tagIconSize: number
  tagPaddingHorizontal: number
  tagBorderlessBg: string
}

// ============================== Styles ==============================

type CssVariableType = 'Success' | 'Info' | 'Error' | 'Warning';

function genTagStatusStyle(token: TagToken, status: 'success' | 'processing' | 'error' | 'warning', cssVariableType: CssVariableType): CSSObject {
  const capitalizedCssVariableType = capitalize(cssVariableType);
  return {
    [`${token.componentCls}-${status}`]: {
      color: token[`color${cssVariableType}`],
      background: token[`color${capitalizedCssVariableType}Bg`],
      borderColor: token[`color${capitalizedCssVariableType}Border`],
      [`&${token.componentCls}-borderless`]: {
        borderColor: 'transparent',
      },
    },
  };
}

function genPresetStyle(token: TagToken) {
  return genPresetColor(token, (colorKey, { textColor, lightBorderColor, lightColor, darkColor }) => ({
    [`${token.componentCls}-${colorKey}`]: {
      'color': textColor,
      'background': lightColor,
      'borderColor': lightBorderColor,

      // Inverse color
      '&-inverse': {
        color: token.colorTextLightSolid,
        background: darkColor,
        borderColor: darkColor,
      },
      [`&${token.componentCls}-borderless`]: {
        borderColor: 'transparent',
      },
    },
  }));
}

function genBaseStyle(token: TagToken): CSSObject {
  const { paddingXXS, lineWidth, tagPaddingHorizontal, componentCls } = token;
  const paddingInline = tagPaddingHorizontal - lineWidth;
  const iconMarginInline = paddingXXS - lineWidth;

  return {
    // Result
    [componentCls]: {
      ...resetComponent(token),
      'display': 'inline-block',
      'height': 'auto',
      'marginInlineEnd': token.marginXS,
      paddingInline,
      'fontSize': token.tagFontSize,
      'lineHeight': `${token.tagLineHeight}px`,
      'whiteSpace': 'nowrap',
      'background': token.tagDefaultBg,
      'border': `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
      'borderRadius': token.borderRadiusSM,
      'opacity': 1,
      'transition': `all ${token.motionDurationMid}`,
      'textAlign': 'start',

      // RTL
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      '&, a, a:hover': {
        color: token.tagDefaultColor,
      },

      [`${componentCls}-close-icon`]: {
        'marginInlineStart': iconMarginInline,
        'color': token.colorTextDescription,
        'fontSize': token.tagIconSize,
        'cursor': 'pointer',
        'transition': `all ${token.motionDurationMid}`,

        '&:hover': {
          color: token.colorTextHeading,
        },
      },

      [`&${componentCls}-has-color`]: {
        borderColor: 'transparent',

        [`&, a, a:hover, ${token.iconCls}-close, ${token.iconCls}-close:hover`]: {
          color: token.colorTextLightSolid,
        },
      },

      '&-checkable': {
        'backgroundColor': 'transparent',
        'borderColor': 'transparent',
        'cursor': 'pointer',

        [`&:not(${componentCls}-checkable-checked):hover`]: {
          color: token.colorPrimary,
          backgroundColor: token.colorFillSecondary,
        },

        '&:active, &-checked': {
          color: token.colorTextLightSolid,
        },

        '&-checked': {
          'backgroundColor': token.colorPrimary,
          '&:hover': {
            backgroundColor: token.colorPrimaryHover,
          },
        },

        '&:active': {
          backgroundColor: token.colorPrimaryActive,
        },
      },

      '&-hidden': {
        display: 'none',
      },

      // To ensure that a space will be placed between character and `Icon`.
      [`> ${token.iconCls} + span, > span + ${token.iconCls}`]: {
        marginInlineStart: paddingInline,
      },
      [`${componentCls}-borderless`]: {
        borderColor: 'transparent',
        background: token.tagBorderlessBg,
      },
    },
  };
}

// ============================== Export ==============================
export default genComponentStyleHook('Tag', (token) => {
  const { fontSize, lineHeight, lineWidth, fontSizeIcon } = token;
  const tagHeight = Math.round(fontSize * lineHeight);

  const tagFontSize = token.fontSizeSM;
  const tagLineHeight = tagHeight - lineWidth * 2;
  const tagDefaultBg = token.colorFillAlter;
  const tagDefaultColor = token.colorText;

  const tagToken = mergeToken<TagToken>(token, {
    tagFontSize,
    tagLineHeight,
    tagDefaultBg,
    tagDefaultColor,
    tagIconSize: fontSizeIcon - 2 * lineWidth, // Tag icon is much more smaller
    tagPaddingHorizontal: 8, // Fixed padding.
    tagBorderlessBg: token.colorFillTertiary,
  });

  return [
    genBaseStyle(tagToken),
    genPresetStyle(tagToken),
    genTagStatusStyle(tagToken, 'success', 'Success'),
    genTagStatusStyle(tagToken, 'processing', 'Info'),
    genTagStatusStyle(tagToken, 'error', 'Error'),
    genTagStatusStyle(tagToken, 'warning', 'Warning'),
  ];
});
