import type { MentionsConfig, MentionsEntity } from './types'

export const getMentions = (value = '', config: MentionsConfig = {}): MentionsEntity[] => {
  const { prefix = '@', split = ' ' } = config
  const prefixList: string[] = Array.isArray(prefix) ? prefix : [prefix]

  return value
    .split(split)
    .map((str = ''): MentionsEntity | null => {
      let hitPrefix: string | null = null

      prefixList.some((prefixStr) => {
        const startStr = str.slice(0, prefixStr.length)
        if (startStr === prefixStr) {
          hitPrefix = prefixStr
          return true
        }
        return false
      })

      if (hitPrefix !== null) {
        return {
          prefix: hitPrefix,
          value: str.slice((hitPrefix as string).length),
        }
      }
      return null
    })
    .filter((entity): entity is MentionsEntity => !!entity && !!entity.value)
}
