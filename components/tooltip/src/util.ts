import { isPresetColor } from '../../_utils/colors'
import { classNames } from '../../_utils/dom'
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
