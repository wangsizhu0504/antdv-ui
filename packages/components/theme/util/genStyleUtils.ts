import type { GetCompUnitless } from '@antdv/cssinjs-utils/util/genStyleUtils';
import type { AliasToken, ComponentTokenMap, SeedToken } from '../interface';
import { genStyleUtils } from '@antdv/cssinjs-utils';

import { computed } from 'vue';
import { defaultIconPrefixCls, useConfigContextInject } from '../../config-provider/src/context';
import { genCommonStyle, genIconStyle, genLinkStyle } from '../../style';
import useLocalToken, { unitless } from '../useToken';

export const { genStyleHooks, genComponentStyleHook, genSubStyleComponent } = genStyleUtils<
  ComponentTokenMap,
  AliasToken,
  SeedToken
>({
  usePrefix: () => {
    const { getPrefixCls, iconPrefixCls } = useConfigContextInject();

    const rootPrefixCls = computed(() => getPrefixCls());

    return {
      rootPrefixCls,
      iconPrefixCls,
    };
  },
  useToken: () => {
    const [theme, realToken, hashId, token, cssVar] = useLocalToken();
    return {
      theme,
      realToken,
      hashId,
      token,
      cssVar,
    };
  },
  useCSP: () => {
    const { csp } = useConfigContextInject();
    return csp?.value ?? {};
  },
  getResetStyles: (token, config) => {
    const linkStyle = genLinkStyle(token);
    return [
      linkStyle,
      { '&': linkStyle },
      genIconStyle(computed(() => config?.prefix.iconPrefixCls.value ?? defaultIconPrefixCls)),
    ];
  },
  getCommonStyle: genCommonStyle,
  getCompUnitless: (() => unitless) as GetCompUnitless<ComponentTokenMap, AliasToken>,
});
