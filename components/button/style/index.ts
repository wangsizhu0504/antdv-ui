import { genFocusStyle } from '../../style'
import { genCompactItemStyle } from '../../style/compact-item'
import { genCompactItemVerticalStyle } from '../../style/compact-item-vertical'
import { genComponentStyleHook, mergeToken } from '../../theme'
import genGroupStyle from './group'
import type { FullToken, GenerateStyle } from '../../theme'
import type { CSSInterpolation, CSSObject } from '../../cssinjs'

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

export interface ButtonToken extends FullToken<'Button'> {
  colorOutlineDefault: string
  buttonPaddingHorizontal: number
  buttonIconOnlyFontSize: number
  buttonFontWeight: number
}
const getColorByStatus = (token: ButtonToken, status: 'dangerous' | 'success' | 'warning') => {
  let color = ''
  let colorHover = ''
  let colorBorderHover = ''
  let colorActive = ''
  let colorOutline = ''
  let colorBg = ''
  switch (status) {
    case 'dangerous':
      color = token.colorError
      colorBorderHover = token.colorErrorBorderHover
      colorHover = token.colorErrorHover
      colorActive = token.colorErrorActive
      colorOutline = token.colorErrorOutline
      colorBg = token.colorErrorBg
      break
    case 'success':
      color = token.colorSuccess
      colorBorderHover = token.colorSuccessBorderHover
      colorHover = token.colorSuccessHover
      colorActive = token.colorSuccessActive
      colorOutline = token.colorSuccessOutline
      colorBg = token.colorSuccessBg
      break
    case 'warning':
      color = token.colorWarning
      colorBorderHover = token.colorWarningBorderHover
      colorHover = token.colorWarningHover
      colorActive = token.colorWarningActive
      colorOutline = token.colorWarningOutline
      colorBg = token.colorWarningBg
      break
  }
  return { color, colorBorderHover, colorHover, colorActive, colorOutline, colorBg }
}

// ============================== Shared ==============================
const genSharedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = (token): CSSObject => {
  const { componentCls, iconCls, buttonFontWeight } = token

  return {
    [componentCls]: {
      'outline': 'none',
      'position': 'relative',
      'display': 'inline-block',
      'fontWeight': buttonFontWeight,
      'whiteSpace': 'nowrap',
      'textAlign': 'center',
      'backgroundImage': 'none',
      'backgroundColor': 'transparent',
      'border': `${token.lineWidth}px ${token.lineType} transparent`,
      'cursor': 'pointer',
      'transition': `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
      'userSelect': 'none',
      'touchAction': 'manipulation',
      'lineHeight': token.lineHeight,
      'color': token.colorText,

      '&:disabled > *': {
        pointerEvents: 'none',
      },

      '> span': {
        display: 'inline-block',
      },

      [`${componentCls}-icon`]: {
        lineHeight: 0,
      },

      // Leave a space between icon and text.
      [`> ${iconCls} + span, > span + ${iconCls}`]: {
        marginInlineStart: token.marginXS,
      },

      [`&:not(${componentCls}-icon-only) > ${componentCls}-icon`]: {
        [`&${componentCls}-loading-icon, &:not(:last-child)`]: {
          marginInlineEnd: token.marginXS,
        },
      },

      '> a': {
        color: 'currentColor',
      },

      '&:not(:disabled)': {
        ...genFocusStyle(token),
      },

      // make `btn-icon-only` not too narrow
      [`&-icon-only${componentCls}-compact-item`]: {
        flex: 'none',
      },
      // Special styles for Primary Button
      [`&-compact-item${componentCls}-primary`]: {
        [`&:not([disabled]) + ${componentCls}-compact-item${componentCls}-primary:not([disabled])`]:
          {
            'position': 'relative',

            '&:before': {
              position: 'absolute',
              top: -token.lineWidth,
              insetInlineStart: -token.lineWidth,
              display: 'inline-block',
              width: token.lineWidth,
              height: `calc(100% + ${token.lineWidth * 2}px)`,
              backgroundColor: token.colorPrimaryHover,
              content: '""',
            },
          },
      },
      // Special styles for Primary Button
      '&-compact-vertical-item': {
        [`&${componentCls}-primary`]: {
          [`&:not([disabled]) + ${componentCls}-compact-vertical-item${componentCls}-primary:not([disabled])`]:
            {
              'position': 'relative',

              '&:before': {
                position: 'absolute',
                top: -token.lineWidth,
                insetInlineStart: -token.lineWidth,
                display: 'inline-block',
                width: `calc(100% + ${token.lineWidth * 2}px)`,
                height: token.lineWidth,
                backgroundColor: token.colorPrimaryHover,
                content: '""',
              },
            },
        },
      },
    },
  }
}

const genHoverActiveButtonStyle = (hoverStyle: CSSObject, activeStyle: CSSObject): CSSObject => ({
  '&:not(:disabled)': {
    '&:hover': hoverStyle,
    '&:active': activeStyle,
  },
})

// ============================== Shape ===============================
const genCircleButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  minWidth: token.controlHeight,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
  borderRadius: '50%',
})

const genRoundButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  borderRadius: token.controlHeight,
  paddingInlineStart: token.controlHeight / 2,
  paddingInlineEnd: token.controlHeight / 2,
})

// =============================== Type ===============================
const genDisabledStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  cursor: 'not-allowed',
  borderColor: token.colorBorder,
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
  boxShadow: 'none',
})

const genGhostButtonStyle = (
  btnCls: string,
  textColor: string | false,
  borderColor: string | false,
  textColorDisabled: string | false,
  borderColorDisabled: string | false,
  hoverStyle?: CSSObject,
  activeStyle?: CSSObject,
): CSSObject => ({
  [`&${btnCls}-background-ghost`]: {
    'color': textColor || undefined,
    'backgroundColor': 'transparent',
    'borderColor': borderColor || undefined,
    'boxShadow': 'none',

    ...genHoverActiveButtonStyle(
      {
        backgroundColor: 'transparent',
        ...hoverStyle,
      },
      {
        backgroundColor: 'transparent',
        ...activeStyle,
      },
    ),

    '&:disabled': {
      cursor: 'not-allowed',
      color: textColorDisabled || undefined,
      borderColor: borderColorDisabled || undefined,
    },
  },
})

const genSolidDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  '&:disabled': {
    ...genDisabledStyle(token),
  },
})

const genSolidButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genSolidDisabledButtonStyle(token),
})

const genPureDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  '&:disabled': {
    cursor: 'not-allowed',
    color: token.colorTextDisabled,
  },
})

// Type: Default
const genStatusDefaultStyle: (token: ButtonToken, status: 'dangerous' | 'success' | 'warning') => CSSObject = (token, status) => {
  const { color, colorHover, colorBorderHover, colorActive } = getColorByStatus(token, status)
  return {
    [`&${token.componentCls}-${status}`]: {
      color,
      borderColor: color,

      ...genHoverActiveButtonStyle(
        {
          color: colorHover,
          borderColor: colorBorderHover,
        },
        {
          color: colorActive,
          borderColor: colorActive,
        },
      ),

      ...genGhostButtonStyle(
        token.componentCls,
        color,
        color,
        token.colorTextDisabled,
        token.colorBorder,
      ),
      ...genSolidDisabledButtonStyle(token),
    },
  }
}
const genDefaultButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genSolidButtonStyle(token),

  backgroundColor: token.colorBgContainer,
  borderColor: token.colorBorder,

  boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlTmpOutline}`,

  ...genHoverActiveButtonStyle(
    {
      color: token.colorPrimaryHover,
      borderColor: token.colorPrimaryHover,
    },
    {
      color: token.colorPrimaryActive,
      borderColor: token.colorPrimaryActive,
    },
  ),

  ...genGhostButtonStyle(
    token.componentCls,
    token.colorBgContainer,
    token.colorBgContainer,
    token.colorTextDisabled,
    token.colorBorder,
  ),
  ...genStatusDefaultStyle(token, 'dangerous'),
  ...genStatusDefaultStyle(token, 'success'),
  ...genStatusDefaultStyle(token, 'warning'),

})

// Type: Primary
const genStatusPrimaryStyle: (token: ButtonToken, status: 'dangerous' | 'success' | 'warning') => CSSObject = (token, status) => {
  const { color, colorOutline, colorHover, colorActive } = getColorByStatus(token, status)
  return {
    [`&${token.componentCls}-${status}`]: {
      backgroundColor: color,
      boxShadow: `0 ${token.controlOutlineWidth}px 0 ${colorOutline}`,

      ...genHoverActiveButtonStyle(
        {
          backgroundColor: colorHover,
        },
        {
          backgroundColor: colorActive,
        },
      ),

      ...genGhostButtonStyle(
        token.componentCls,
        color,
        color,
        token.colorTextDisabled,
        token.colorBorder,
        {
          color: colorHover,
          borderColor: colorHover,
        },
        {
          color: colorActive,
          borderColor: colorActive,
        },
      ),
      ...genSolidDisabledButtonStyle(token),
    },
  }
}
const genPrimaryButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genSolidButtonStyle(token),

  color: token.colorTextLightSolid,
  backgroundColor: token.colorPrimary,

  boxShadow: `0 ${token.controlOutlineWidth}px 0 ${token.controlOutline}`,

  ...genHoverActiveButtonStyle(
    {
      color: token.colorTextLightSolid,
      backgroundColor: token.colorPrimaryHover,
    },
    {
      color: token.colorTextLightSolid,
      backgroundColor: token.colorPrimaryActive,
    },
  ),

  ...genGhostButtonStyle(
    token.componentCls,
    token.colorPrimary,
    token.colorPrimary,
    token.colorTextDisabled,
    token.colorBorder,
    {
      color: token.colorPrimaryHover,
      borderColor: token.colorPrimaryHover,
    },
    {
      color: token.colorPrimaryActive,
      borderColor: token.colorPrimaryActive,
    },
  ),
  ...genStatusPrimaryStyle(token, 'dangerous'),
  ...genStatusPrimaryStyle(token, 'success'),
  ...genStatusPrimaryStyle(token, 'warning'),
})

// Type: Dashed
const genDashedButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genDefaultButtonStyle(token),
  borderStyle: 'dashed',
})

// Type: Link
const getStatusLinkStyle: (token: ButtonToken, status: 'dangerous' | 'success' | 'warning') => CSSObject = (token, status) => {
  let colorHover = ''
  let colorActive = ''
  let color = ''
  switch (status) {
    case 'dangerous':
      colorHover = token.colorErrorHover
      colorActive = token.colorErrorActive
      color = token.colorErrorHover
      break
    case 'success':
      colorHover = token.colorSuccessHover
      colorActive = token.colorSuccessActive
      color = token.colorSuccess
      break
    case 'warning':
      colorHover = token.colorWarningHover
      colorActive = token.colorWarningActive
      color = token.colorWarning
      break
  }
  return {
    [`&${token.componentCls}-${status}`]: {
      color,

      ...genHoverActiveButtonStyle(
        {
          color: colorHover,
        },
        {
          color: colorActive,
        },
      ),

      ...genPureDisabledButtonStyle(token),
    },
  }
}

const genLinkButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  color: token.colorLink,

  ...genHoverActiveButtonStyle(
    {
      color: token.colorLinkHover,
    },
    {
      color: token.colorLinkActive,
    },
  ),

  ...genPureDisabledButtonStyle(token),

  ...getStatusLinkStyle(token, 'dangerous'),
  ...getStatusLinkStyle(token, 'success'),
  ...getStatusLinkStyle(token, 'warning'),
})

// Type: Text
const getStatusTextStyle: (token: ButtonToken, status: 'dangerous' | 'success' | 'warning') => CSSObject = (token, status) => {
  const { color, colorHover, colorBg } = getColorByStatus(token, status)

  return {

    [`&${token.componentCls}-${status}`]: {
      color,

      ...genPureDisabledButtonStyle(token),
      ...genHoverActiveButtonStyle(
        {
          color: colorHover,
          backgroundColor: colorBg,
        },
        {
          color: colorHover,
          backgroundColor: colorBg,
        },
      ),
    },
  }
}
const genTextButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genHoverActiveButtonStyle(
    {
      color: token.colorText,
      backgroundColor: token.colorBgTextHover,
    },
    {
      color: token.colorText,
      backgroundColor: token.colorBgTextActive,
    },
  ),

  ...genPureDisabledButtonStyle(token),

  ...getStatusTextStyle(token, 'dangerous'),
  ...getStatusTextStyle(token, 'success'),
  ...getStatusTextStyle(token, 'warning'),
})

// Href and Disabled
const genDisabledButtonStyle: GenerateStyle<ButtonToken, CSSObject> = token => ({
  ...genDisabledStyle(token),
  [`&${token.componentCls}:hover`]: {
    ...genDisabledStyle(token),
  },
})

const genTypeButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls } = token

  return {
    [`${componentCls}-default`]: genDefaultButtonStyle(token),
    [`${componentCls}-primary`]: genPrimaryButtonStyle(token),
    [`${componentCls}-dashed`]: genDashedButtonStyle(token),
    [`${componentCls}-link`]: genLinkButtonStyle(token),
    [`${componentCls}-text`]: genTextButtonStyle(token),
    [`${componentCls}-disabled`]: genDisabledButtonStyle(token),
  }
}

// =============================== Size ===============================
const genSizeButtonStyle = (token: ButtonToken, sizePrefixCls = ''): CSSInterpolation => {
  const {
    componentCls,
    iconCls,
    controlHeight,
    fontSize,
    lineHeight,
    lineWidth,
    borderRadius,
    buttonPaddingHorizontal,
  } = token

  const paddingVertical = Math.max(0, (controlHeight - fontSize * lineHeight) / 2 - lineWidth)
  const paddingHorizontal = buttonPaddingHorizontal - lineWidth

  const iconOnlyCls = `${componentCls}-icon-only`

  return [
    // Size
    {
      [`${componentCls}${sizePrefixCls}`]: {
        fontSize,
        height: controlHeight,
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
        borderRadius,

        [`&${iconOnlyCls}`]: {
          width: controlHeight,
          paddingInlineStart: 0,
          paddingInlineEnd: 0,
          [`&${componentCls}-round`]: {
            width: 'auto',
          },
          [iconCls]: {
            fontSize: token.buttonIconOnlyFontSize,
          },
        },

        // Loading
        [`&${componentCls}-loading`]: {
          opacity: token.opacityLoading,
          cursor: 'default',
        },

        [`${componentCls}-loading-icon`]: {
          transition: `width ${token.motionDurationSlow} ${token.motionEaseInOut}, opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        },

        [`&:not(${iconOnlyCls}) ${componentCls}-loading-icon > ${iconCls}`]: {
          marginInlineEnd: token.marginXS,
        },
      },
    },

    // Shape - patch prefixCls again to override solid border radius style
    {
      [`${componentCls}${componentCls}-circle${sizePrefixCls}`]: genCircleButtonStyle(token),
    },
    {
      [`${componentCls}${componentCls}-round${sizePrefixCls}`]: genRoundButtonStyle(token),
    },
  ]
}

const genSizeBaseButtonStyle: GenerateStyle<ButtonToken> = token => genSizeButtonStyle(token)

const genSizeSmallButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const smallToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightSM,
    padding: token.paddingXS,
    buttonPaddingHorizontal: 8, // Fixed padding
    borderRadius: token.borderRadiusSM,
    buttonIconOnlyFontSize: token.fontSizeLG - 2,
  })

  return genSizeButtonStyle(smallToken, `${token.componentCls}-sm`)
}

const genSizeLargeButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const largeToken = mergeToken<ButtonToken>(token, {
    controlHeight: token.controlHeightLG,
    fontSize: token.fontSizeLG,
    borderRadius: token.borderRadiusLG,
    buttonIconOnlyFontSize: token.fontSizeLG + 2,
  })

  return genSizeButtonStyle(largeToken, `${token.componentCls}-lg`)
}

const genBlockButtonStyle: GenerateStyle<ButtonToken> = (token) => {
  const { componentCls } = token
  return {
    [componentCls]: {
      [`&${componentCls}-block`]: {
        width: '100%',
      },
    },
  }
}

// ============================== Export ==============================
export default genComponentStyleHook('Button', (token) => {
  const { controlTmpOutline, paddingContentHorizontal } = token

  const buttonToken = mergeToken<ButtonToken>(token, {
    colorOutlineDefault: controlTmpOutline,
    buttonPaddingHorizontal: paddingContentHorizontal,
    buttonIconOnlyFontSize: token.fontSizeLG,
    buttonFontWeight: 400,
  })

  return [
    // Shared
    genSharedButtonStyle(buttonToken),

    // Size
    genSizeSmallButtonStyle(buttonToken),
    genSizeBaseButtonStyle(buttonToken),
    genSizeLargeButtonStyle(buttonToken),

    // Block
    genBlockButtonStyle(buttonToken),

    // Group (type, ghost, danger,warning,success, disabled, loading)
    genTypeButtonStyle(buttonToken),

    // Button Group
    genGroupStyle(buttonToken),

    // Space Compact
    genCompactItemStyle(token),
    genCompactItemVerticalStyle(token),
  ]
})
