import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue'
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { StarFilled } from '@ant-design/icons-vue'
import classNames from '../_util/classNames'
import PropTypes from '../_util/vue-types'
import KeyCode from '../_util/KeyCode'
import { withInstall } from '../_util/type'
import { findDOMNode } from '../_util/props-util'
import Tooltip from '../tooltip'
import { useConfigInject } from '../hooks'

import { useRefs } from '../hooks'
import { useInjectFormItemContext } from '../form/FormItemContext'
import type { Direction } from '../config-provider'
import type { FocusEventHandler, KeyboardEventHandler } from '../_util/EventInterface'
import useStyle from './style'
import Star from './Star'
import { getOffsetLeft } from './util'

export const rateProps = () => ({
  'prefixCls': String,
  'count': { type: Number, default: 5 },
  'value': { type: Number, default: 0 },
  'allowHalf': { type: Boolean, default: false },
  'allowClear': { type: Boolean, default: true },
  'tooltips': Array as PropType<string[]>,
  'disabled': { type: Boolean, default: undefined },
  'character': PropTypes.any,
  'autofocus': { type: Boolean, default: undefined },
  'tabindex': { type: [Number, String], default: 0 },
  'direction': { type: String as PropType<Direction>, default: 'ltr' },
  'id': String,
  'onChange': Function as PropType<(value: number) => void>,
  'onHoverChange': Function as PropType<(value: number) => void>,
  'onUpdate:value': Function as PropType<(value: number) => void>,
  'onFocus': Function as PropType<FocusEventHandler>,
  'onBlur': Function as PropType<FocusEventHandler>,
  'onKeydown': Function as PropType<KeyboardEventHandler>,
})

export type RateProps = Partial<ExtractPropTypes<ReturnType<typeof rateProps>>>

const Rate = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ARate',
  inheritAttrs: false,
  props: rateProps(),
  // emits: ['hoverChange', 'update:value', 'change', 'focus', 'blur', 'keydown'],
  setup(props, { slots, attrs, emit, expose }) {
    const { prefixCls, direction } = useConfigInject('rate', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const formItemContext = useInjectFormItemContext()
    const rateRef = ref()
    const [setRef, starRefs] = useRefs()
    const state = reactive({
      value: props.value,
      focused: false,
      cleanedValue: null,
      hoverValue: undefined,
    })
    watch(
      () => props.value,
      () => {
        state.value = props.value
      },
    )
    const getStarDOM = (index: number) => {
      return findDOMNode(starRefs.value.get(index))
    }
    const getStarValue = (index: number, x: number) => {
      const reverse = direction.value === 'rtl'
      let value = index + 1
      if (props.allowHalf) {
        const starEle = getStarDOM(index)
        const leftDis = getOffsetLeft(starEle)
        const width = starEle.clientWidth
        if (reverse && x - leftDis > width / 2)
          value -= 0.5
        else if (!reverse && x - leftDis < width / 2)
          value -= 0.5
      }
      return value
    }
    const changeValue = (value: number) => {
      if (props.value === undefined)
        state.value = value

      emit('update:value', value)
      emit('change', value)
      formItemContext.onFieldChange()
    }

    const onHover = (e: MouseEvent, index: number) => {
      const hoverValue = getStarValue(index, e.pageX)
      if (hoverValue !== state.cleanedValue) {
        state.hoverValue = hoverValue
        state.cleanedValue = null
      }
      emit('hoverChange', hoverValue)
    }
    const onMouseLeave = () => {
      state.hoverValue = undefined
      state.cleanedValue = null
      emit('hoverChange', undefined)
    }
    const onClick = (event: MouseEvent, index: number) => {
      const { allowClear } = props
      const newValue = getStarValue(index, event.pageX)
      let isReset = false
      if (allowClear)
        isReset = newValue === state.value

      onMouseLeave()
      changeValue(isReset ? 0 : newValue)
      state.cleanedValue = isReset ? newValue : null
    }
    const onFocus = (e: FocusEvent) => {
      state.focused = true
      emit('focus', e)
    }
    const onBlur = (e: FocusEvent) => {
      state.focused = false
      emit('blur', e)
      formItemContext.onFieldBlur()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      const { keyCode } = event
      const { count, allowHalf } = props
      const reverse = direction.value === 'rtl'
      if (keyCode === KeyCode.RIGHT && state.value < count && !reverse) {
        if (allowHalf)
          state.value += 0.5
        else
          state.value += 1

        changeValue(state.value)
        event.preventDefault()
      } else if (keyCode === KeyCode.LEFT && state.value > 0 && !reverse) {
        if (allowHalf)
          state.value -= 0.5
        else
          state.value -= 1

        changeValue(state.value)
        event.preventDefault()
      } else if (keyCode === KeyCode.RIGHT && state.value > 0 && reverse) {
        if (allowHalf)
          state.value -= 0.5
        else
          state.value -= 1

        changeValue(state.value)
        event.preventDefault()
      } else if (keyCode === KeyCode.LEFT && state.value < count && reverse) {
        if (allowHalf)
          state.value += 0.5
        else
          state.value += 1

        changeValue(state.value)
        event.preventDefault()
      }
      emit('keydown', event)
    }

    const focus = () => {
      if (!props.disabled)
        rateRef.value.focus()
    }
    const blur = () => {
      if (!props.disabled)
        rateRef.value.blur()
    }

    expose({
      focus,
      blur,
    })

    onMounted(() => {
      const { autofocus, disabled } = props
      if (autofocus && !disabled)
        focus()
    })

    const characterRender = (node: VNode, { index }) => {
      const { tooltips } = props
      if (!tooltips) return node
      return <Tooltip title={tooltips[index]}>{node}</Tooltip>
    }

    return () => {
      const { count, allowHalf, disabled, tabindex, id = formItemContext.id.value } = props
      const { class: className, style } = attrs
      const stars = []
      const disabledClass = disabled ? `${prefixCls.value}-disabled` : ''
      const character = props.character || slots.character || (() => <StarFilled />)
      for (let index = 0; index < count; index++) {
        stars.push(
          <Star
            ref={setRef(index)}
            key={index}
            index={index}
            count={count}
            disabled={disabled}
            prefixCls={`${prefixCls.value}-star`}
            allowHalf={allowHalf}
            value={state.hoverValue === undefined ? state.value : state.hoverValue}
            onClick={onClick}
            onHover={onHover}
            character={character}
            characterRender={characterRender}
            focused={state.focused}
          />,
        )
      }
      const rateClassName = classNames(prefixCls.value, disabledClass, className, {
        [hashId.value]: true,
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
      })
      return wrapSSR(
        <ul
          {...attrs}
          id={id}
          class={rateClassName}
          style={style as CSSProperties}
          onMouseleave={disabled ? null : onMouseLeave}
          tabindex={disabled ? -1 : tabindex}
          onFocus={disabled ? null : onFocus}
          onBlur={disabled ? null : onBlur}
          onKeydown={disabled ? null : onKeyDown}
          ref={rateRef}
          role="radiogroup"
        >
          {stars}
        </ul>,
      )
    }
  },
})

export default withInstall(Rate)
