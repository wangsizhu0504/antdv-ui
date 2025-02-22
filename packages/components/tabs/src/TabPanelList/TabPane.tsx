import type { CustomSlotsType } from '@antdv/types';
import type { CSSProperties } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import { tabPaneProps } from '../props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ATabPane',
  inheritAttrs: false,
  __ANT_TAB_PANE: true,
  props: tabPaneProps(),
  slots: Object as CustomSlotsType<{
    closeIcon: any
    tab: any
    default: any
  }>,
  setup(props, { attrs, slots }) {
    const visited = ref(props.forceRender);
    watch(
      [() => props.active, () => props.destroyInactiveTabPane],
      () => {
        if (props.active)
          visited.value = true;
        else if (props.destroyInactiveTabPane)
          visited.value = false;
      },
      { immediate: true },
    );
    const mergedStyle = computed<CSSProperties>(() => {
      if (!props.active) {
        if (props.animated) {
          return {
            visibility: 'hidden',
            height: 0,
            overflowY: 'hidden',
          };
        } else {
          return { display: 'none' };
        }
      }
      return {};
    });

    return () => {
      const { prefixCls, forceRender, id, active, tabKey } = props;
      return (
        <div
          id={id && `${id}-panel-${tabKey}`}
          role="tabpanel"
          tabindex={active ? 0 : -1}
          aria-labelledby={id && `${id}-tab-${tabKey}`}
          aria-hidden={!active}
          style={[mergedStyle.value, attrs.style as CSSProperties]}
          class={[`${prefixCls}-tabpane`, active && `${prefixCls}-tabpane-active`, attrs.class]}
        >
          {(active || visited.value || forceRender) && slots.default?.()}
        </div>
      );
    };
  },
});
