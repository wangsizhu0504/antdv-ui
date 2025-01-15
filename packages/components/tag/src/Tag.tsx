import type { CustomSlotsType } from '@antdv/types'
import type { CSSProperties } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { classNames, devWarning, isPresetColor, isPresetStatusColor } from '@antdv/utils'
import { computed, defineComponent, shallowRef, watchEffect } from 'vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { Wave } from '../../wave'

import useStyle from '../style'
import CheckableTag from './CheckableTag'
import { tagProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ATag',
  inheritAttrs: false,
  props: tagProps(),
  CheckableTag,
  // emits: ['update:visible', 'close'],
  slots: Object as CustomSlotsType<{
    closeIcon: any
    icon: any
    default: any
  }>,
  setup(props, { slots, emit, attrs }) {
    const { prefixCls, direction } = useConfigInject('tag', props)

    const [wrapSSR, hashId] = useStyle(prefixCls)

    const visible = shallowRef(true)

    // Warning for deprecated usage
    if (process.env.NODE_ENV !== 'production') {
      devWarning(
        props.visible === undefined,
        'Tag',
        '`visible` is deprecated, please use `<Tag v-show="visible" />` instead.',
      )
    }

    watchEffect(() => {
      if (props.visible !== undefined)
        visible.value = props.visible!
    })

    const handleCloseClick = (e: MouseEvent) => {
      e.stopPropagation()
      emit('update:visible', false)
      emit('close', e)

      if (e.defaultPrevented)
        return

      if (props.visible === undefined)
        visible.value = false
    }

    // const isPresetColor = computed(() => {
    //   const { color } = props;
    //   if (!color) {
    //     return false;
    //   }
    //   return PresetColorRegex.test(color) || PresetStatusColorRegex.test(color);
    // });

    const isInternalColor = computed(
      () => isPresetColor(props.color) || isPresetStatusColor(props.color),
    )

    const tagClassName = computed(() =>
      classNames(prefixCls.value, hashId.value, {
        [`${prefixCls.value}-${props.color}`]: isInternalColor.value,
        [`${prefixCls.value}-has-color`]: props.color && !isInternalColor.value,
        [`${prefixCls.value}-hidden`]: !visible.value,
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        [`${prefixCls.value}-borderless`]: !props.bordered,
      }),
    )
    const handleClick = (e: MouseEvent) => {
      emit('click', e)
    }
    return () => {
      const {
        icon = slots.icon?.(),
        color,
        closeIcon = slots.closeIcon?.(),
        closable = false,
      } = props

      const renderCloseIcon = () => {
        if (closable) {
          return closeIcon
            ? (
                <span class={`${prefixCls.value}-close-icon`} onClick={handleCloseClick}>
                  {closeIcon}
                </span>
              )
            : (
                <CloseOutlined class={`${prefixCls.value}-close-icon`} onClick={handleCloseClick} />
              )
        }
        return null
      }

      const tagStyle = {
        backgroundColor: color && !isInternalColor.value ? color : undefined,
      }

      const iconNode = icon || null
      const children = slots.default?.()
      const kids = iconNode
        ? (
            <>
              {iconNode}
              <span>{children}</span>
            </>
          )
        : (
            children
          )

      const isNeedWave = props.onClick !== undefined
      const tagNode = (
        <span
          {...attrs}
          onClick={handleClick}
          class={[tagClassName.value, attrs.class]}
          style={[tagStyle, attrs.style as CSSProperties]}
        >
          {kids}
          {renderCloseIcon()}
        </span>
      )

      return wrapSSR(isNeedWave ? <Wave>{tagNode}</Wave> : tagNode)
    }
  },
})
