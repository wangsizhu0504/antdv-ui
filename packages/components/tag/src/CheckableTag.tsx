import { classNames } from '@antdv/utils'
import { computed, defineComponent } from 'vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import useStyle from '../style'
import { checkableTagProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ACheckableTag',
  inheritAttrs: false,
  props: checkableTagProps(),
  // emits: ['update:checked', 'change', 'click'],
  setup(props, { slots, emit, attrs }) {
    const { prefixCls } = useConfigInject('tag', props)
    // Style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const handleClick = (e: MouseEvent) => {
      const { checked } = props
      emit('update:checked', !checked)
      emit('change', !checked)
      emit('click', e)
    }

    const cls = computed(() =>
      classNames(prefixCls.value, hashId.value, {
        [`${prefixCls.value}-checkable`]: true,
        [`${prefixCls.value}-checkable-checked`]: props.checked,
      }),
    )

    return () => {
      return wrapSSR(
        <span {...attrs} class={[cls.value, attrs.class]} onClick={handleClick}>
          {slots.default?.()}
        </span>,
      )
    }
  },
})
