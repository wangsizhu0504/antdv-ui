import { defineComponent } from 'vue'
import { cascaderOptionCheckboxProps } from '../props'
import { useInjectCascader } from '../context'

export default defineComponent({
  name: 'CascaderCheckbox',
  props: cascaderOptionCheckboxProps(),
  inheritAttrs: false,
  setup(props) {
    const { customSlots, checkable } = useInjectCascader()
    const mergedCheckable = checkable.value !== false ? customSlots.value.checkable : checkable.value
    const customCheckbox
      = typeof mergedCheckable === 'function'
        ? mergedCheckable()
        : typeof mergedCheckable === 'boolean'
          ? null
          : mergedCheckable
    return (
      <span
        class={{
          [props.prefixCls]: true,
          [`${props.prefixCls}-checked`]: props.checked,
          [`${props.prefixCls}-indeterminate`]: !props.checked && props.halfChecked,
          [`${props.prefixCls}-disabled`]: props.disabled,
        }}
        onClick={props.onClick}
      >
        {customCheckbox}
      </span>
    )
  },
})
