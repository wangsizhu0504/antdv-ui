import { lintWarning } from './utils'
import type { Linter } from './interface'

const linter: Linter = (key, value, info) => {
  if (key === 'animation') {
    if (info.hashId && value !== 'none') {
      lintWarning(
        `You seem to be using hashed animation '${value}', in which case 'animationName' with Keyframe as value is recommended.`,
        info,
      )
    }
  }
}

export default linter
