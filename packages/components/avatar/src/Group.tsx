import type { CSSProperties } from 'vue';
import { cloneElement, flattenChildren, getPropsSlot } from '@antdv/utils';
import { computed, defineComponent, watchEffect } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';

import Popover from '../../popover';
import useStyle from '../style';
import Avatar from './Avatar';
import { useAvatarProviderContext } from './AvatarContext';

import { groupProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AAvatarGroup',
  inheritAttrs: false,
  props: groupProps(),
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('avatar', props);
    const groupPrefixCls = computed(() => `${prefixCls.value}-group`);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    watchEffect(() => {
      const context = { size: props.size, shape: props.shape };
      useAvatarProviderContext(context);
    });
    return () => {
      const {
        maxPopoverPlacement = 'top',
        maxCount,
        maxStyle,
        maxPopoverTrigger = 'hover',
        shape,
      } = props;

      const cls = {
        [groupPrefixCls.value]: true,
        [`${groupPrefixCls.value}-rtl`]: direction.value === 'rtl',
        [`${attrs.class}`]: !!attrs.class,
        [hashId.value]: true,
      };

      const children = getPropsSlot(slots, props);
      const childrenWithProps = flattenChildren(children).map((child, index) => cloneElement(child, {
        key: `avatar-key-${index}`,
      }),
      );

      const numOfChildren = childrenWithProps.length;
      if (maxCount && maxCount < numOfChildren) {
        const childrenShow = childrenWithProps.slice(0, maxCount);
        const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);

        childrenShow.push(
          <Popover
            key="avatar-popover-key"
            content={childrenHidden}
            trigger={maxPopoverTrigger}
            placement={maxPopoverPlacement}
            overlayClassName={`${groupPrefixCls.value}-popover`}
          >
            <Avatar style={maxStyle} shape={shape}>{`+${numOfChildren - maxCount}`}</Avatar>
          </Popover>,
        );
        return wrapSSR(
          <div {...attrs} class={cls} style={attrs.style as CSSProperties}>
            {childrenShow}
          </div>,
        );
      }

      return wrapSSR(
        <div {...attrs} class={cls} style={attrs.style as CSSProperties}>
          {childrenWithProps}
        </div>,
      );
    };
  },
});
