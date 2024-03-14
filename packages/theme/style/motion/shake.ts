import { Keyframes } from '@antdv/theme'
import type { AliasToken, CSSInterpolation } from '@antdv/theme'
import type { TokenWithCommonCls } from '../../token/util/genComponentStyleHook'
import { initMotion } from './motion'

export const shakeIn = new Keyframes('antShakeIn', {
  '0%': {
    rotate: '0',
    scale: 0,
  },
  '25%': {
    rotate: '7deg',
    scale: 0.25,
  },
  '50%': {
    rotate: '-7deg',
    scale: 0.5,
  },
  '75%': {
    rotate: '1deg',
    scale: 0.75,
  },
  '100%': {
    rotate: '0',
    scale: 1,
  },
})
export const shakeOut = new Keyframes('antShakeOut', {
  '0%': {
    scale: 1,
  },
  '25%': {
    scale: 0.75,
  },
  '50%': {
    scale: 0.5,
  },
  '75%': {
    scale: 0.25,
  },
  '100%': {
    scale: 0,
  },
})

export function initShakeMotion(token: TokenWithCommonCls<AliasToken>): CSSInterpolation {
  const { antCls } = token
  const motionCls = `${antCls}-shake`

  return [
    initMotion(motionCls, shakeIn, shakeOut, '0.4s'),
    {
      [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },

      [`${motionCls}-leave`]: {
        animationDuration: '0.2s',
        animationTimingFunction: token.motionEaseInOutCirc,
      },
    },
  ]
}
