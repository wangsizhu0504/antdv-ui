import type { ThemeConfig } from '@antdv/ui'
import type { GlobalToken, MapToken } from '@antdv/components/theme/interface'
import defaultMap from '@antdv/components/theme/themes/default'
import seed from '@antdv/components/theme/themes/seed'
import formatToken from '@antdv/components/theme/util/alias'

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
