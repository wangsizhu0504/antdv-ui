import { defineComponent } from 'vue'
import { PropTypes } from '../../_utils/vue'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'TooltipContent',
  props: {
    prefixCls: String,
    id: String,
    overlayInnerStyle: PropTypes.any,
  },
  setup(props, { slots }) {
    return () => (
      <div
        class={`${props.prefixCls}-inner`}
        id={props.id}
        role="tooltip"
        style={props.overlayInnerStyle}
      >
        {slots.overlay?.()}
      </div>
    )
  },
})
