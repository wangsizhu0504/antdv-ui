import { computed, defineComponent, shallowRef, watch } from 'vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { omit } from 'lodash-es'
import { classNames, cloneElement } from '../../_utils/dom'
import {
  FormItemInputContext,
  NoFormStatus,
  useInjectFormItemContext,
} from '../../form/src/FormItemContext'
import { useConfigInject } from '../../hooks'

// CSSINJS
import { NoCompactStyle, useCompactItemContext } from '../../space'
import { useInjectDisabled } from '../../config-provider'
import { getMergedStatus, getStatusClassNames } from '../../_utils/status'
import { isValidValue } from '../../_utils/is'
import useStyle from '../style'
import InputElement from './InputElement'
import { inputNumberProps } from './props'
import type { InputNumberProps } from './props'
import type { HTMLAttributes } from 'vue'

import type { CustomSlotsType } from '../../_utils/types'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AInputNumber',
  inheritAttrs: false,
  props: inputNumberProps(),
  // emits: ['focus', 'blur', 'change', 'input', 'update:value'],
  slots: Object as CustomSlotsType<{
    addonBefore?: any
    addonAfter?: any
    prefix?: any
    default?: any
    upIcon?: any
    downIcon?: any
  }>,

  setup(props, { emit, expose, attrs, slots }) {
    const formItemContext = useInjectFormItemContext()
    const formItemInputContext = FormItemInputContext.useInject()
    const mergedStatus = computed(() => getMergedStatus(formItemInputContext.status, props.status))
    const { prefixCls, size, direction, disabled } = useConfigInject('input-number', props)
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction)
    const disabledContext = useInjectDisabled()
    const mergedDisabled = computed(() => disabled.value ?? disabledContext.value)
    // Style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const mergedSize = computed(() => compactSize.value || size.value)
    const mergedValue = shallowRef(props.value === undefined ? props.defaultValue : props.value)
    const focused = shallowRef(false)
    watch(
      () => props.value,
      () => {
        mergedValue.value = props.value
      },
    )
    const inputNumberRef = shallowRef(null)
    const focus = () => {
      inputNumberRef.value?.focus()
    }
    const blur = () => {
      inputNumberRef.value?.blur()
    }
    expose({
      focus,
      blur,
    })
    const handleChange = (val: number) => {
      if (props.value === undefined)
        mergedValue.value = val

      emit('update:value', val)
      emit('change', val)
      formItemContext.onFieldChange()
    }
    const handleBlur = (e: FocusEvent) => {
      focused.value = false
      emit('blur', e)
      formItemContext.onFieldBlur()
    }
    const handleFocus = (e: FocusEvent) => {
      focused.value = true
      emit('focus', e)
    }
    return () => {
      const { hasFeedback, isFormItemInput, feedbackIcon } = formItemInputContext
      const id = props.id ?? formItemContext.id.value
      const {
        class: className,
        bordered,
        readonly,
        style,
        addonBefore = slots.addonBefore?.(),
        addonAfter = slots.addonAfter?.(),
        prefix = slots.prefix?.(),
        valueModifiers = {},
        ...others
      } = { ...attrs, ...props, id, disabled: mergedDisabled.value } as InputNumberProps &
      HTMLAttributes

      const preCls = prefixCls.value

      const inputNumberClass = classNames(
        {
          [`${preCls}-lg`]: mergedSize.value === 'large',
          [`${preCls}-sm`]: mergedSize.value === 'small',
          [`${preCls}-rtl`]: direction.value === 'rtl',
          [`${preCls}-readonly`]: readonly,
          [`${preCls}-borderless`]: !bordered,
          [`${preCls}-in-form-item`]: isFormItemInput,
        },
        getStatusClassNames(preCls, mergedStatus.value),
        className,
        compactItemClassnames.value,
        hashId.value,
      )

      let element = (
        <InputElement
          {...omit(others, ['size', 'defaultValue'])}
          ref={inputNumberRef}
          lazy={!!valueModifiers.lazy}
          value={mergedValue.value}
          class={inputNumberClass}
          prefixCls={preCls}
          readonly={readonly}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          v-slots={{
            upHandler: slots.upIcon
              ? () => <span class={`${preCls}-handler-up-inner`}>{slots.upIcon()}</span>
              : () => <UpOutlined class={`${preCls}-handler-up-inner`} />,
            downHandler: slots.downIcon
              ? () => <span class={`${preCls}-handler-down-inner`}>{slots.downIcon()}</span>
              : () => <DownOutlined class={`${preCls}-handler-down-inner`} />,
          }}
        />
      )
      const hasAddon = isValidValue(addonBefore) || isValidValue(addonAfter)
      const hasPrefix = isValidValue(prefix)
      if (hasPrefix || hasFeedback) {
        const affixWrapperCls = classNames(
          `${preCls}-affix-wrapper`,
          getStatusClassNames(`${preCls}-affix-wrapper`, mergedStatus.value, hasFeedback),
          {
            [`${preCls}-affix-wrapper-focused`]: focused.value,
            [`${preCls}-affix-wrapper-disabled`]: mergedDisabled.value,
            [`${preCls}-affix-wrapper-sm`]: mergedSize.value === 'small',
            [`${preCls}-affix-wrapper-lg`]: mergedSize.value === 'large',
            [`${preCls}-affix-wrapper-rtl`]: direction.value === 'rtl',
            [`${preCls}-affix-wrapper-readonly`]: readonly,
            [`${preCls}-affix-wrapper-borderless`]: !bordered,
            // className will go to addon wrapper
            [`${className}`]: !hasAddon && className,
          },
          hashId.value,
        )
        element = (
          <div class={affixWrapperCls} style={style} onClick={focus}>
            {hasPrefix && <span class={`${preCls}-prefix`}>{prefix}</span>}
            {element}
            {hasFeedback && <span class={`${preCls}-suffix`}>{feedbackIcon}</span>}
          </div>
        )
      }

      if (hasAddon) {
        const wrapperClassName = `${preCls}-group`
        const addonClassName = `${wrapperClassName}-addon`
        const addonBeforeNode = addonBefore
          ? (
          <div class={addonClassName}>{addonBefore}</div>
            )
          : null
        const addonAfterNode = addonAfter ? <div class={addonClassName}>{addonAfter}</div> : null

        const mergedWrapperClassName = classNames(
          `${preCls}-wrapper`,
          wrapperClassName,
          {
            [`${wrapperClassName}-rtl`]: direction.value === 'rtl',
          },
          hashId.value,
        )

        const mergedGroupClassName = classNames(
          `${preCls}-group-wrapper`,
          {
            [`${preCls}-group-wrapper-sm`]: mergedSize.value === 'small',
            [`${preCls}-group-wrapper-lg`]: mergedSize.value === 'large',
            [`${preCls}-group-wrapper-rtl`]: direction.value === 'rtl',
          },
          getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus.value, hasFeedback),
          className,
          hashId.value,
        )
        element = (
          <div class={mergedGroupClassName} style={style}>
            <div class={mergedWrapperClassName}>
              {addonBeforeNode && (
                <NoCompactStyle>
                  <NoFormStatus>{addonBeforeNode}</NoFormStatus>
                </NoCompactStyle>
              )}
              {element}
              {addonAfterNode && (
                <NoCompactStyle>
                  <NoFormStatus>{addonAfterNode}</NoFormStatus>
                </NoCompactStyle>
              )}
            </div>
          </div>
        )
      }
      return wrapSSR(cloneElement(element, { style }))
    }
  },
})
