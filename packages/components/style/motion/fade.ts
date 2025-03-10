import type { CSSInterpolation } from '@antdv/cssinjs';
import type { AliasToken, TokenWithCommonCls } from '../../theme/internal';

import { Keyframes } from '@antdv/cssinjs';
import { initMotion } from './motion';

export const fadeIn = new Keyframes('antFadeIn', {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const fadeOut = new Keyframes('antFadeOut', {
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export function initFadeMotion(token: TokenWithCommonCls<AliasToken>, sameLevel = false): CSSInterpolation {
  const { antCls } = token;
  const motionCls = `${antCls}-fade`;
  const sameLevelPrefix = sameLevel ? '&' : '';

  return [
    initMotion(motionCls, fadeIn, fadeOut, token.motionDurationMid, sameLevel),
    {
      [`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
        opacity: 0,
        animationTimingFunction: 'linear',
      },

      [`${sameLevelPrefix}${motionCls}-leave`]: {
        animationTimingFunction: 'linear',
      },
    },
  ];
}
