import type { CSSInterpolation } from '@antdv/cssinjs';
import type { GlobalToken } from '@antdv/ui/es/components/theme/interface';
import type { UseComponentStyleResult } from '@antdv/ui/es/components/theme/internal';
import useConfigInject from '@antdv/components/config-provider/src/hooks/useConfigInject';
import { theme as antdTheme } from '@antdv/ui';
import { mergeToken, useStyleRegister } from '@antdv/ui/es/components/theme/internal';
import { computed } from 'vue';

function makeStyle(path: string, styleFn: (token: GlobalToken & { rootCls: string }) => CSSInterpolation) {
  return (): UseComponentStyleResult => {
    const { theme, token, hashId } = antdTheme.useToken();

    const { getPrefixCls } = useConfigInject('', {});

    const rootCls = getPrefixCls();

    const componentInfo = computed(() => {
      return {
        theme: theme.value,
        token: token.value,
        hashId: hashId.value,
        path: [path],
      };
    });
    return [
      useStyleRegister(componentInfo, () => {
        const mergedToken = mergeToken<GlobalToken & { rootCls: string }>(token.value, {
          rootCls: `.${rootCls}`,
        });
        const styleInterpolation = styleFn(mergedToken);

        return [styleInterpolation];
      }),
      hashId,
    ];
  };
}

export default makeStyle;
