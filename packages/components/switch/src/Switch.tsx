import {
  computed,
  defineComponent,
  nextTick,
  onBeforeMount,
  onMounted,
  ref,
  watch,
} from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { KeyCode, getPropsSlot, omit, warning } from '@antdv/utils'
import type { CustomSlotsType } from '@antdv/types'
import { useInjectFormItemContext } from '../../form/src/FormItemContext'
import Wave from '../../wave'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { useInjectDisabled } from '../../config-provider'
import useStyle from '../style'
import { switchProps } from './props'
import type { CheckedType } from './types'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASwitch',
  __ANT_SWITCH: true,
  inheritAttrs: false,
  props: switchProps(),
  slots: Object as CustomSlotsType<{
    checkedChildren: any
    unCheckedChildren: any
    default: any
  }>,
  // emits: ['update:checked', 'mouseup', 'change', 'click', 'keydown', 'blur'],
  setup(props, { attrs, slots, expose, emit }) {
    const formItemContext = useInjectFormItemContext()
    const disabledContext = useInjectDisabled()
    const mergedDisabled = computed(() => props.disabled ?? disabledContext.value)

    onBeforeMount(() => {
      warning(
        !('defaultChecked' in attrs),
        'Switch',
        '\'defaultChecked\' is deprecated, please use \'v-model:checked\'',
      )
      warning(
        !('value' in attrs),
        'Switch',
        '`value` is not validate prop, do you mean `checked`?',
      )
    })
    const checked = ref<string | number | boolean>(
      props.checked !== undefined ? props.checked : (attrs.defaultChecked as boolean),
    )
    const checkedStatus = computed(() => checked.value === props.checkedValue)

    watch(
      () => props.checked,
      () => {
        checked.value = props.checked
      },
    )

    const { prefixCls, direction, size } = useConfigInject('switch', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const refSwitchNode = ref()
    const focus = () => {
      refSwitchNode.value?.focus()
    }
    const blur = () => {
      refSwitchNode.value?.blur()
    }

    expose({ focus, blur })

    onMounted(() => {
      nextTick(() => {
        if (props.autofocus && !mergedDisabled.value)
          refSwitchNode.value.focus()
      })
    })

    const setChecked = (check: CheckedType, e: MouseEvent | KeyboardEvent) => {
      if (mergedDisabled.value)
        return

      emit('update:checked', check)
      emit('change', check, e)
      formItemContext.onFieldChange()
    }

    const handleBlur = (e: FocusEvent) => {
      emit('blur', e)
    }

    const handleClick = (e: MouseEvent) => {
      focus()
      const newChecked = checkedStatus.value ? props.unCheckedValue : props.checkedValue
      setChecked(newChecked, e)
      emit('click', newChecked, e)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === KeyCode.LEFT)
        setChecked(props.unCheckedValue, e)
      else if (e.keyCode === KeyCode.RIGHT)
        setChecked(props.checkedValue, e)

      emit('keydown', e)
    }

    const handleMouseUp = (e: MouseEvent) => {
      refSwitchNode.value?.blur()
      emit('mouseup', e)
    }

    const classNames = computed(() => ({
      [`${prefixCls.value}-small`]: size.value === 'small',
      [`${prefixCls.value}-loading`]: props.loading,
      [`${prefixCls.value}-checked`]: checkedStatus.value,
      [`${prefixCls.value}-disabled`]: mergedDisabled.value,
      [prefixCls.value]: true,
      [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
      [hashId.value]: true,
    }))

    return () =>
      wrapSSR(
        <Wave>
          <button
            {...omit(props, [
              'prefixCls',
              'checkedChildren',
              'unCheckedChildren',
              'checked',
              'autofocus',
              'checkedValue',
              'unCheckedValue',
              'id',
              'onChange',
              'onUpdate:checked',
            ])}
            {...attrs}
            id={props.id ?? formItemContext.id.value}
            onKeydown={handleKeyDown}
            onClick={handleClick}
            onBlur={handleBlur}
            onMouseup={handleMouseUp}
            type="button"
            role="switch"
            aria-checked={checked.value as any}
            disabled={mergedDisabled.value || props.loading}
            class={[attrs.class, classNames.value]}
            ref={refSwitchNode}
          >
            <div class={`${prefixCls.value}-handle`}>
              {props.loading ? <LoadingOutlined class={`${prefixCls.value}-loading-icon`} /> : null}
            </div>
            <span class={`${prefixCls.value}-inner`}>
              <span class={`${prefixCls.value}-inner-checked`}>
                {getPropsSlot(slots, props, 'checkedChildren')}
              </span>
              <span class={`${prefixCls.value}-inner-unchecked`}>
                {getPropsSlot(slots, props, 'unCheckedChildren')}
              </span>
            </span>
          </button>
        </Wave>,
      )
  },
})
