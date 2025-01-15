import type { CustomSlotsType } from '@antdv/types'
import type { BaseSelectRef, SelectCommonPlacement } from '@antdv/vue-components'
import {
  classNames,
  devWarning,
  getMergedStatus,
  getStatusClassNames,
  initDefaultProps,
  omit,
} from '@antdv/utils'
import { getTransitionDirection, getTransitionName, VcOptGroup, VcOption, VcSelect } from '@antdv/vue-components'
import { computed, defineComponent, ref } from 'vue'
import { useInjectDisabled } from '../../config-provider'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { DefaultRenderEmpty } from '../../config-provider/src/renderEmpty'

import { FormItemInputContext, useInjectFormItemContext } from '../../form/src/FormItemContext'

import { useCompactItemContext } from '../../space'
import useStyle from '../style'
import getIcons from './iconUtil'
import { type SelectProps, selectProps } from './props'

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASelect',
  Option: VcOption,
  OptionGroup: VcOptGroup,
  inheritAttrs: false,
  props: initDefaultProps(selectProps(), {
    listHeight: 256,
    listItemHeight: 24,
  }),
  SECRET_COMBOBOX_MODE_DO_NOT_USE,
  slots: Object as CustomSlotsType<{
    notFoundContent: any
    suffixIcon: any
    itemIcon: any
    removeIcon: any
    clearIcon: any
    dropdownRender: any
    option: any
    placeholder: any
    tagRender: any
    maxTagPlaceholder: any
    optionLabel: any
    default: any
  }>,
  setup(props, { attrs, emit, slots, expose }) {
    const selectRef = ref<BaseSelectRef>()
    const formItemContext = useInjectFormItemContext()
    const formItemInputContext = FormItemInputContext.useInject()
    const mergedStatus = computed(() => getMergedStatus(formItemInputContext.status, props.status))
    const focus = () => {
      selectRef.value?.focus()
    }

    const blur = () => {
      selectRef.value?.blur()
    }

    const scrollTo: BaseSelectRef['scrollTo'] = (arg) => {
      selectRef.value?.scrollTo(arg)
    }

    const getMode = computed(() => {
      const { mode } = props

      if ((mode as any) === 'combobox')
        return undefined

      if (mode === SECRET_COMBOBOX_MODE_DO_NOT_USE)
        return 'combobox'

      return mode
    })

    if (process.env.NODE_ENV !== 'production') {
      devWarning(
        !props.dropdownClassName,
        'Select',
        '`dropdownClassName` is deprecated. Please use `popupClassName` instead.',
      )
    }
    const {
      prefixCls,
      direction,
      renderEmpty,
      size: contextSize,
      getPrefixCls,
      getPopupContainer,
      disabled,
      select,
    } = useConfigInject('select', props)
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction)
    const mergedSize = computed(() => compactSize.value || contextSize.value)
    const contextDisabled = useInjectDisabled()
    const mergedDisabled = computed(() => disabled.value ?? contextDisabled.value)
    // style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const rootPrefixCls = computed(() => getPrefixCls())
    // ===================== Placement =====================
    const placement = computed(() => {
      if (props.placement !== undefined)
        return props.placement

      return direction.value === 'rtl'
        ? ('bottomRight' as SelectCommonPlacement)
        : ('bottomLeft' as SelectCommonPlacement)
    })
    const transitionName = computed(() =>
      getTransitionName(
        rootPrefixCls.value,
        getTransitionDirection(placement.value),
        props.transitionName,
      ),
    )
    const mergedClassName = computed(() =>
      classNames(
        {
          [`${prefixCls.value}-lg`]: mergedSize.value === 'large',
          [`${prefixCls.value}-sm`]: mergedSize.value === 'small',
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
          [`${prefixCls.value}-borderless`]: !props.bordered,
          [`${prefixCls.value}-in-form-item`]: formItemInputContext.isFormItemInput,
        },
        getStatusClassNames(prefixCls.value, mergedStatus.value, formItemInputContext.hasFeedback),
        compactItemClassnames.value,
        hashId.value,
      ),
    )
    const triggerChange: SelectProps['onChange'] = (...args) => {
      emit('update:value', args[0])
      emit('change', ...args)
      formItemContext.onFieldChange()
    }
    const handleBlur: SelectProps['onBlur'] = (e) => {
      emit('blur', e)
      formItemContext.onFieldBlur()
    }
    expose({
      blur,
      focus,
      scrollTo,
    })
    const isMultiple = computed(() => getMode.value === 'multiple' || getMode.value === 'tags')
    const mergedShowArrow = computed(() =>
      props.showArrow !== undefined
        ? props.showArrow
        : props.loading || !(isMultiple.value || getMode.value === 'combobox'),
    )

    return () => {
      const {
        notFoundContent,
        listHeight = 256,
        listItemHeight = 24,
        popupClassName,
        dropdownClassName,
        virtual,
        dropdownMatchSelectWidth,
        id = formItemContext.id.value,
        placeholder = slots.placeholder?.(),
        showArrow,
      } = props
      const { hasFeedback, feedbackIcon } = formItemInputContext

      // ===================== Empty =====================
      let mergedNotFound: any
      if (notFoundContent !== undefined)
        mergedNotFound = notFoundContent
      else if (slots.notFoundContent)
        mergedNotFound = slots.notFoundContent()
      else if (getMode.value === 'combobox')
        mergedNotFound = null
      else
        mergedNotFound = renderEmpty?.('Select') || <DefaultRenderEmpty componentName="Select" />

      // ===================== Icons =====================
      const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons(
        {
          ...props,
          multiple: isMultiple.value,
          prefixCls: prefixCls.value,
          hasFeedback,
          feedbackIcon,
          showArrow: mergedShowArrow.value,
        },
        slots,
      )

      const selectProps = omit(props, [
        'prefixCls',
        'suffixIcon',
        'itemIcon',
        'removeIcon',
        'clearIcon',
        'size',
        'bordered',
        'status',
      ])

      const rcSelectRtlDropdownClassName = classNames(
        popupClassName || dropdownClassName,
        {
          [`${prefixCls.value}-dropdown-${direction.value}`]: direction.value === 'rtl',
        },
        hashId.value,
      )

      return wrapSSR(
        <VcSelect
          ref={selectRef}
          virtual={virtual}
          dropdownMatchSelectWidth={dropdownMatchSelectWidth}
          {...selectProps}
          {...attrs}
          showSearch={props.showSearch ?? select?.value?.showSearch}
          placeholder={placeholder}
          listHeight={listHeight}
          listItemHeight={listItemHeight}
          mode={getMode.value}
          prefixCls={prefixCls.value}
          direction={direction.value}
          inputIcon={suffixIcon}
          menuItemSelectedIcon={itemIcon}
          removeIcon={removeIcon}
          clearIcon={clearIcon}
          notFoundContent={mergedNotFound}
          class={[mergedClassName.value, attrs.class]}
          getPopupContainer={getPopupContainer?.value}
          dropdownClassName={rcSelectRtlDropdownClassName}
          onChange={triggerChange}
          onBlur={handleBlur}
          id={id}
          dropdownRender={selectProps.dropdownRender || slots.dropdownRender}
          v-slots={{ option: slots.option }}
          transitionName={transitionName.value}
          children={slots.default?.()}
          tagRender={props.tagRender || slots.tagRender}
          optionLabelRender={slots.optionLabel}
          maxTagPlaceholder={props.maxTagPlaceholder || slots.maxTagPlaceholder}
          showArrow={hasFeedback || showArrow}
          disabled={mergedDisabled.value}
        >
        </VcSelect>,
      )
    }
  },
})
