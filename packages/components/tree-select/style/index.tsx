import type { AliasToken, FullToken, GenerateStyle } from '@antdv/theme';
import type { Ref } from 'vue';
import { genComponentStyleHook, mergeToken } from '@antdv/theme';
import { getStyle as getCheckboxStyle } from '../../checkbox/style';
import { genTreeStyle } from '../../tree/style';

interface TreeSelectToken extends FullToken<'TreeSelect'> {
  treePrefixCls: string
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<TreeSelectToken> = (token) => {
  const { componentCls, treePrefixCls, colorBgElevated } = token;
  const treeCls = `.${treePrefixCls}`;

  return [
    // ======================================================
    // ==                     Dropdown                     ==
    // ======================================================
    {
      [`${componentCls}-dropdown`]: [
        {
          padding: `${token.paddingXS}px ${token.paddingXS / 2}px`,
        },

        // ====================== Tree ======================
        genTreeStyle(
          treePrefixCls,
          mergeToken<AliasToken>(token, { colorBgContainer: colorBgElevated }),
        ),
        {
          [treeCls]: {
            'borderRadius': 0,
            '&-list-holder-inner': {
              alignItems: 'stretch',

              [`${treeCls}-treenode`]: {
                [`${treeCls}-node-content-wrapper`]: {
                  flex: 'auto',
                },
              },
            },
          },
        },

        // ==================== Checkbox ====================
        getCheckboxStyle(`${treePrefixCls}-checkbox`, token),

        // ====================== RTL =======================
        {
          '&-rtl': {
            direction: 'rtl',

            [`${treeCls}-switcher${treeCls}-switcher_close`]: {
              [`${treeCls}-switcher-icon svg`]: {
                transform: 'rotate(90deg)',
              },
            },
          },
        },
      ],
    },
  ];
};

// ============================== Export ==============================
export default function useTreeSelectStyle(prefixCls: Ref<string>, treePrefixCls: Ref<string>) {
  return genComponentStyleHook('TreeSelect', (token) => {
    const treeSelectToken = mergeToken<TreeSelectToken>(token, {
      treePrefixCls: treePrefixCls.value,
    });
    return [genBaseStyle(treeSelectToken)];
  })(prefixCls);
}
