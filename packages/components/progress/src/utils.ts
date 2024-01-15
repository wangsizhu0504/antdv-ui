import { presetPrimaryColors } from '@ant-design/colors'
import { devWarning } from '@antdv/utils'

import type { CSSProperties } from 'vue'
import type { Direction } from '../../config-provider'
import type { CircleProps, ProgressProps } from './props'

import type { ProgressGradient, StringGradients } from './interface'

/**
 * {
 *   '0%': '#afc163',
 *   '75%': '#009900',
 *   '50%': 'green',     ====>     '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
 *   '25%': '#66FF00',
 *   '100%': '#ffffff'
 * }
 */
export function sortGradient(gradients: StringGradients) {
  let tempArr = []
  Object.keys(gradients).forEach((key) => {
    const formattedKey = Number.parseFloat(key.replace(/%/g, ''))
    if (!Number.isNaN(formattedKey)) {
      tempArr.push({
        key: formattedKey,
        value: gradients[key],
      })
    }
  })
  tempArr = tempArr.sort((a, b) => a.key - b.key)
  return tempArr.map(({ key, value }) => `${value} ${key}%`).join(', ')
}

/**
 * Then this man came to realize the truth: Besides six pence, there is the moon. Besides bread and
 * butter, there is the bug. And... Besides women, there is the code.
 *
 * @example
 *   {
 *     "0%": "#afc163",
 *     "25%": "#66FF00",
 *     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
 *     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
 *     "100%": "#ffffff"
 *   }
 */
export function handleGradient(strokeColor: ProgressGradient, directionConfig?: Direction): CSSProperties {
  const {
    from = presetPrimaryColors.blue,
    to = presetPrimaryColors.blue,
    direction = directionConfig === 'rtl' ? 'to left' : 'to right',
    ...rest
  } = strokeColor
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest as StringGradients)
    return { backgroundImage: `linear-gradient(${direction}, ${sortedGradients})` }
  }
  return { backgroundImage: `linear-gradient(${direction}, ${from}, ${to})` }
}

export function validProgress(progress: number | undefined) {
  if (!progress || progress < 0)
    return 0

  if (progress > 100)
    return 100

  return progress
}

export function getSuccessPercent({ success, successPercent }: ProgressProps) {
  let percent = successPercent
  /** @deprecated Use `percent` instead */
  if (success && 'progress' in success) {
    devWarning(
      false,
      'Progress',
      '`success.progress` is deprecated. Please use `success.percent` instead.',
    )
    percent = success.progress
  }
  if (success && 'percent' in success)
    percent = success.percent

  return percent
}

export function getPercentage({ percent, success, successPercent }: ProgressProps) {
  const realSuccessPercent = validProgress(getSuccessPercent({ success, successPercent }))
  return [realSuccessPercent, validProgress(validProgress(percent) - realSuccessPercent)]
}

export function getStrokeColor({
  success = {},
  strokeColor,
}: Partial<CircleProps>): Array<string | Record<string, string>> {
  const { strokeColor: successColor } = success
  // @ts-expect-error
  return [successColor || presetPrimaryColors.green, strokeColor || null!]
}

export function getSize(size: ProgressProps['size'], type: ProgressProps['type'] | 'step', extra?: {
  steps?: number
  strokeWidth?: number
}): { width: number, height: number } {
  let width = -1
  let height = -1
  if (type === 'step') {
    const steps = extra!.steps!
    const strokeWidth = extra!.strokeWidth!
    if (typeof size === 'string' || typeof size === 'undefined') {
      width = size === 'small' ? 2 : 14
      height = strokeWidth ?? 8
    } else if (typeof size === 'number') {
      [width, height] = [size, size]
    } else {
      [width = 14, height = 8] = size
    }
    width *= steps
  } else if (type === 'line') {
    const strokeWidth = extra?.strokeWidth
    if (typeof size === 'string' || typeof size === 'undefined')
      height = strokeWidth || (size === 'small' ? 6 : 8)
    else if (typeof size === 'number')
      [width, height] = [size, size]
    else
      [width = -1, height = 8] = size
  } else if (type === 'circle' || type === 'dashboard') {
    if (typeof size === 'string' || typeof size === 'undefined') {
      [width, height] = size === 'small' ? [60, 60] : [120, 120]
    } else if (typeof size === 'number') {
      [width, height] = [size, size]
    } else {
      if (process.env.NODE_ENV !== 'production') {
        devWarning(
          false,
          'Progress',
          'Type "circle" and "dashboard" do not accept array as `size`, please use number or preset size instead.',
        )
      }

      width = size[0] ?? size[1] ?? 120
      height = size[0] ?? size[1] ?? 120
    }
  }
  return { width, height }
}
