import { defineComponent, shallowRef, watchEffect } from 'vue'
import { classNames } from '@antdv/utils'
import { collapsePanelProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PanelContent',
  props: collapsePanelProps(),
  setup(props, { slots }) {
    const rendered = shallowRef(false)

    watchEffect(() => {
      if (props.isActive || props.forceRender)
        rendered.value = true
    })

    return () => {
      if (!rendered.value) return null
      const { prefixCls, isActive, role } = props
      return (
        <div
          class={classNames(`${prefixCls}-content`, {
            [`${prefixCls}-content-active`]: isActive,
            [`${prefixCls}-content-inactive`]: !isActive,
          })}
          role={role}
        >
          <div class={`${prefixCls}-content-box`}>{slots.default?.()}</div>
        </div>
      )
    }
  },
})
