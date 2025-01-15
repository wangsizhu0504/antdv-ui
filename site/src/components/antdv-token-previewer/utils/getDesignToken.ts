import type { GlobalToken, MapToken } from '@antdv/theme/token/interface'
import type { ThemeConfig } from '@antdv/ui'
import defaultMap from '@antdv/theme/token/themes/default'
import seed from '@antdv/theme/token/themes/seed'
import formatToken from '@antdv/theme/token/util/alias'

export default function getDesignToken(config: ThemeConfig = {}): GlobalToken {
  const seedToken = { ...seed, ...config.token }
  const mapFn = config.algorithm ?? defaultMap
  const mapToken = Array.isArray(mapFn)
    ? mapFn.reduce<MapToken>((result, fn) => fn(seedToken, result), undefined as any)
    : mapFn(seedToken)
  const mergedMapToken = {
    ...mapToken,
    ...config.components,
    override: config.token ?? {},
  }
  return formatToken(mergedMapToken)
}
