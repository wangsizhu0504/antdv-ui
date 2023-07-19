import classNames from '../_util/classNames'
import { isPresetColor } from '../_util/colors'
import type { CSSProperties } from 'vue'

export function parseColor(prefixCls: string, color?: string) {
  const isInternalColor = isPresetColor(color)

  const className = classNames({
    [`${prefixCls}-${color}`]: color && isInternalColor,
  })

  const overlayStyle: CSSProperties = {}
  const arrowStyle: CSSProperties = {}

  if (color && !isInternalColor) {
    overlayStyle.background = color
    arrowStyle['--antd-arrow-background-color'] = color
  }

  return { className, overlayStyle, arrowStyle }
}
