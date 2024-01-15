import type { CSSInterpolation, UseComponentStyleResult } from '@antdv/theme'
import { useStyleRegister } from '@antdv/theme'
import { theme as antdTheme } from '@antdv/ui'
import type { GlobalToken } from '@antdv/theme/token/interface'
import { mergeToken } from '@antdv/theme/token'
import { computed } from 'vue'
import useConfigInject from '@antdv/components/config-provider/src/hooks/useConfigInject'

function makeStyle(path: string, styleFn: (token: GlobalToken & { rootCls: string }) => CSSInterpolation) {
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
