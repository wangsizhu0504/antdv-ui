import type { CSSObject, FullToken, GenerateStyle } from '@antdv/theme'
import { genComponentStyleHook, mergeToken } from '@antdv/theme'

interface AffixToken extends FullToken<'Affix'> {
  zIndexPopup: number
}

// ============================== Shared ==============================
const genSharedAffixStyle: GenerateStyle<AffixToken> = (token): CSSObject => {
  const { componentCls } = token

  return {
    [componentCls]: {
      position: 'fixed',
      zIndex: token.zIndexPopup,
    },
  }
}

// ============================== Export ==============================
export default genComponentStyleHook('Affix', (token) => {
  const affixToken = mergeToken<AffixToken>(token, {
    zIndexPopup: token.zIndexBase + 10,
  })
  return [genSharedAffixStyle(affixToken)]
})
