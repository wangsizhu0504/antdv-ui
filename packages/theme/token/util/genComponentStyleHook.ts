import type { Ref } from 'vue'
import type { CSSInterpolation } from '../../cssinjs'
import type { ComponentTokenMap, GlobalToken, UseComponentStyleResult } from '../interface'
import { useConfigContextInject } from '@antdv/components/config-provider/src/context'
import { computed } from 'vue'
import { useStyleRegister } from '../../cssinjs'
import { genCommonStyle, genLinkStyle } from '../../style'

import { useToken } from '../internal'
import statisticToken, { merge as mergeToken } from './statistic'

export type OverrideTokenWithoutDerivative = ComponentTokenMap
export type OverrideComponent = keyof OverrideTokenWithoutDerivative
export type GlobalTokenWithComponent<ComponentName extends OverrideComponent> = GlobalToken &
ComponentTokenMap[ComponentName]

export interface StyleInfo<ComponentName extends OverrideComponent> {
  hashId: string
  prefixCls: string
  rootPrefixCls: string
  iconPrefixCls: string
  overrideComponentToken: ComponentTokenMap[ComponentName]
}

export type TokenWithCommonCls<T> = T & {
  /** Wrap component class with `.` prefix */
  componentCls: string
  /** Origin prefix which do not have `.` prefix */
  prefixCls: string
  /** Wrap icon class with `.` prefix */
  iconCls: string
  /** Wrap ant prefixCls class with `.` prefix */
  antCls: string
}
export type FullToken<ComponentName extends OverrideComponent> = TokenWithCommonCls<
  GlobalTokenWithComponent<ComponentName>
>

export default function genComponentStyleHook<ComponentName extends OverrideComponent>(
  component: ComponentName,
  styleFn: (token: FullToken<ComponentName>, info: StyleInfo<ComponentName>) => CSSInterpolation,
  getDefaultToken?:
  | OverrideTokenWithoutDerivative[ComponentName]
  | ((token: GlobalToken) => OverrideTokenWithoutDerivative[ComponentName]),
) {
  return (_prefixCls?: Ref<string>): UseComponentStyleResult => {
    const prefixCls = computed(() => _prefixCls?.value)
    const [theme, token, hashId] = useToken()
    const { getPrefixCls, iconPrefixCls } = useConfigContextInject()
    const rootPrefixCls = computed(() => getPrefixCls())
    const sharedInfo = computed(() => {
      return {
        theme: theme.value,
        token: token.value,
        hashId: hashId.value,
        path: ['Shared', rootPrefixCls.value],
      }
    })
    // Generate style for all a tags in antd component.
    useStyleRegister(sharedInfo, () => [
      {
        // Link
        '&': genLinkStyle(token.value),
      },
    ])
    const componentInfo = computed(() => {
      return {
        theme: theme.value,
        token: token.value,
        hashId: hashId.value,
        path: [component, prefixCls.value, iconPrefixCls.value],
      }
    })
    return [
      useStyleRegister(componentInfo, () => {
        const { token: proxyToken, flush } = statisticToken(token.value)

        const defaultComponentToken
          = typeof getDefaultToken === 'function'
            ? (getDefaultToken as any)(proxyToken)
            : getDefaultToken
        const mergedComponentToken = { ...defaultComponentToken, ...token.value[component] }

        const componentCls = `.${prefixCls.value}`
        const mergedToken = mergeToken<
          TokenWithCommonCls<GlobalTokenWithComponent<OverrideComponent>>
        >(
          proxyToken,
          {
            componentCls,
            prefixCls: prefixCls.value,
            iconCls: `.${iconPrefixCls.value}`,
            antCls: `.${rootPrefixCls.value}`,
          },
          mergedComponentToken,
        )
        const styleInterpolation = styleFn(mergedToken as unknown as FullToken<ComponentName>, {
          hashId: hashId.value,
          prefixCls: prefixCls.value,
          rootPrefixCls: rootPrefixCls.value,
          iconPrefixCls: iconPrefixCls.value,
          overrideComponentToken: token.value[component],
        })
        flush(component, mergedComponentToken)
        return [genCommonStyle(token.value, prefixCls.value), styleInterpolation]
      }),
      hashId,
    ]
  }
}
