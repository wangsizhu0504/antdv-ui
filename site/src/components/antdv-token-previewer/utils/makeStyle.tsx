import type { CSSInterpolation } from '@antdv/ui/es/cssinjs'
import { useStyleRegister } from '@antdv/ui/es/cssinjs'
import { theme as antdTheme } from '@antdv/ui'
import type { GlobalToken } from '@antdv/ui/es/theme/interface'
import { mergeToken } from '@antdv/ui/es/theme'
import { computed } from 'vue'
import { useConfigInject } from '@antdv/ui/es/hooks'

import type { UseComponentStyleResult } from '@antdv/ui/es/theme'

const makeStyle = (
  path: string,
  styleFn: (token: GlobalToken & { rootCls: string }) => CSSInterpolation,
) => {
  return (): UseComponentStyleResult => {
    const { theme, token, hashId } = antdTheme.useToken()

    const { getPrefixCls } = useConfigInject('', {})

    const rootCls = getPrefixCls()

    const componentInfo = computed(() => {
      return {
        theme: theme.value,
        token: token.value,
        hashId: hashId.value,
        path: [path],
      }
    })
    return [
      useStyleRegister(componentInfo, () => {
        const mergedToken = mergeToken<GlobalToken & { rootCls: string }>(token.value, {
          rootCls: `.${rootCls}`,
        })
        const styleInterpolation = styleFn(mergedToken)

        return [styleInterpolation]
      }),
      hashId,
    ]
  }
}

export default makeStyle
