import tokenStatistic from '@antdv/version/token.json'

const tokenRelatedComponents: {
  [key in string]?: string[];
} = {}

function getRelatedComponentsSingle(token: string): string[] {
  if (!tokenRelatedComponents[token]) {
    tokenRelatedComponents[token] = Object.entries(tokenStatistic)
      .filter(([, tokens]) => {
        return ((tokens as any).global as string[]).includes(token)
      })
      .map(([component]) => component)
  }
  return tokenRelatedComponents[token] ?? []
}

export function getRelatedComponents(token: string | string[]): string[] {
  const mergedTokens = Array.isArray(token) ? token : [token]
  return Array.from(
    new Set(
      mergedTokens.reduce<string[]>((result, item) => {
        return result.concat(getRelatedComponentsSingle(item))
      }, []),
    ),
  )
}

export function getComponentToken(component: string) {
  return tokenStatistic[component] as { component?: Record<string, any>; global: string[] }
}
