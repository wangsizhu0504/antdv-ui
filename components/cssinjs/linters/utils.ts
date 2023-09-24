import { warning } from '../../_utils/log'
import type { LinterInfo } from './interface'

export function lintWarning(message: string, info: LinterInfo) {
  const { path, parentSelectors } = info

  warning(
    false,
    `[CSS-in-JS] ${path ? `Error in '${path}': ` : ''}${message}${
      parentSelectors.length ? ` Selector info: ${parentSelectors.join(' -> ')}` : ''
    }`,
  )
}
