import type { GenerateStyle } from '@antdv/theme';
import type { DropdownToken } from '.';

const genButtonStyle: GenerateStyle<DropdownToken> = (token) => {
  const { componentCls, antCls, paddingXS, opacityLoading } = token;

  return {
    [`${componentCls}-button`]: {
      whiteSpace: 'nowrap',

      [`&${antCls}-btn-group > ${antCls}-btn`]: {
        [`&-loading, &-loading + ${antCls}-btn`]: {
          cursor: 'default',
          pointerEvents: 'none',
          opacity: opacityLoading,
        },

        [`&:last-child:not(:first-child):not(${antCls}-btn-icon-only)`]: {
          paddingInline: paddingXS,
        },
      },
    },
  };
};

export default genButtonStyle;
