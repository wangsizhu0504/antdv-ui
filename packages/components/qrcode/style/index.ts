import type { FullToken, GenerateStyle } from '@antdv/theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '@antdv/theme';

export interface ComponentToken {}

interface QRCodeToken extends FullToken<'QRCode'> {
  QRCodeTextColor: string;
  QRCodeMaskBackgroundColor: string
}

const genQRCodeStyle: GenerateStyle<QRCodeToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      ...resetComponent(token),
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'padding': token.paddingSM,
      'backgroundColor': token.colorWhite,
      'borderRadius': token.borderRadiusLG,
      'border': `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      'position': 'relative',
      'width': '100%',
      'height': '100%',
      'overflow': 'hidden',
      [`& > ${componentCls}-mask`]: {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        color: token.colorText,
        lineHeight: token.lineHeight,
        background: token.QRCodeMaskBackgroundColor,
        textAlign: 'center',
        [`& > ${componentCls}-expired , & > ${componentCls}-scanned`]: {
          color: token.QRCodeTextColor,
        },
      },
      '&-icon': {
        marginBlockEnd: token.marginXS,
        fontSize: token.controlHeight,
      },
    },
    [`${componentCls}-borderless`]: {
      borderColor: 'transparent',
    },
  };
};

export default genComponentStyleHook<'QRCode'>('QRCode', token =>
  genQRCodeStyle(
    mergeToken<QRCodeToken>(token, {
      QRCodeTextColor: 'rgba(0, 0, 0, 0.88)',
      QRCodeMaskBackgroundColor: 'rgba(255, 255, 255, 0.96)',
    }),
  ));
