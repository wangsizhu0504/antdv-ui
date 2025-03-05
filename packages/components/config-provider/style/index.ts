import type { Ref } from 'vue';
import { computed } from 'vue';
import { resetIcon } from '../../style';
import { useStyleRegister, useToken } from '../../theme';

function useStyle(iconPrefixCls: Ref<string>) {
  const [theme, token] = useToken();
  // Generate style for icons
  return useStyleRegister(
    computed(() => ({
      theme: theme.value,
      token: token.value,
      hashId: '',
      path: ['ant-design-icons', iconPrefixCls.value],
    })),
    () => [
      {
        [`.${iconPrefixCls.value}`]: {
          ...resetIcon(),
          [`.${iconPrefixCls.value} .${iconPrefixCls.value}-icon`]: {
            display: 'block',
          },
        },
      },
    ],
  );
}

export default useStyle;
