import type { ExtractPropTypes } from 'vue';
import { PropTypes } from '@antdv/utils';
import { defineComponent } from 'vue';

const tooltipContentProps = {
  prefixCls: String,
  id: String,
  overlayInnerStyle: PropTypes.any,
};

export type TooltipContentProps = Partial<ExtractPropTypes<typeof tooltipContentProps>>;

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'TooltipContent',
  props: tooltipContentProps,
  setup(props: TooltipContentProps, { slots }) {
    return () => (
      <div
        class={`${props.prefixCls}-inner`}
        id={props.id}
        role="tooltip"
        style={props.overlayInnerStyle}
      >
        {slots.overlay?.()}
      </div>
    );
  },
});
