import type { CustomSlotsType } from '@antdv/types';
import { getPropsSlot } from '@antdv/utils';
import { computed, defineComponent } from 'vue';
import { useMeasure } from './hooks/useKeyPath';
import { useInjectMenu } from './hooks/useMenuContext';
import { menuItemGroupProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AMenuItemGroup',
  inheritAttrs: false,
  props: menuItemGroupProps(),
  slots: Object as CustomSlotsType<{
    title?: any
    default?: any
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls } = useInjectMenu();
    const groupPrefixCls = computed(() => `${prefixCls.value}-item-group`);
    const isMeasure = useMeasure();
    return () => {
      if (isMeasure) return slots.default?.();
      return (
        <li {...attrs} onClick={e => e.stopPropagation()} class={groupPrefixCls.value}>
          <div
            title={typeof props.title === 'string' ? props.title : undefined}
            class={`${groupPrefixCls.value}-title`}
          >
            {getPropsSlot(slots, props, 'title')}
          </div>
          <ul class={`${groupPrefixCls.value}-list`}>{slots.default?.()}</ul>
        </li>
      );
    };
  },
});
