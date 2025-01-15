import type { CSSProperties } from 'vue';
import { defineComponent, ref } from 'vue';
import { addButtonProps } from '../props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AddButton',
  inheritAttrs: false,
  props: addButtonProps(),
  setup(props, { expose, attrs }) {
    const domRef = ref();
    expose({
      domRef,
    });
    return () => {
      const { prefixCls, editable, locale } = props;
      if (!editable || editable.showAdd === false)
        return null;

      return (
        <button
          ref={domRef}
          type="button"
          class={`${prefixCls}-nav-add`}
          style={attrs.style as CSSProperties}
          aria-label={locale?.addAriaLabel || 'Add tab'}
          onClick={(event) => {
            editable.onEdit('add', {
              event,
            });
          }}
        >
          {editable.addIcon ? editable.addIcon() : '+'}
        </button>
      );
    };
  },
});
