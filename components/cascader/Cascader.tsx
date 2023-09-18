import { LeftOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import getIcons from '../select/utils/iconUtil'
import VcCascader from '../vc-cascader'
import { initDefaultProps } from '../_util/props-util'
import { useConfigInject } from '../hooks'
import classNames from '../_util/classNames'
import devWarning from '../vc-util/devWarning'
import { getTransitionDirection, getTransitionName } from '../_util/components/transition'
import { useInjectFormItemContext } from '../form'
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils'
import { FormItemInputContext } from '../form/FormItemContext'
import { useCompactItemContext } from '../space'

import useSelectStyle from '../select/style'
import { useInjectDisabled } from '../config-provider/DisabledContext'
import useStyle from './style'
import { cascaderProps } from './props'
import type { CascaderProps } from './props'
import type { CascaderRef } from './types'
import type { SelectCommonPlacement } from '../_util/components/transition'
import type { VueNode } from '../_util/type'
import type { ShowSearchType } from '../vc-cascader'

// Align the design since we use `rc-select` in root. This help:
// - List search content will show all content
// - Hover opacity style
// - Search filter match case

function highlightKeyword(str: string, lowerKeyword: string, prefixCls?: string) {
  const cells = str
    .toLowerCase()
    .split(lowerKeyword)
    .reduce((list, cur, index) => (index === 0 ? [cur] : [...list, lowerKeyword, cur]), [])
  const fillCells: VueNode[] = []
  let start = 0

  cells.forEach((cell, index) => {
    const end = start + cell.length
    let originWorld: VueNode = str.slice(start, end)
    start = end

    if (index % 2 === 1) {
      originWorld = (
        <span class={`${prefixCls}-menu-item-keyword`} key="seperator">
          {originWorld}
        </span>
      )
    }

    fillCells.push(originWorld)
  })

  return fillCells
}

const defaultSearchRender: ShowSearchType['render'] = ({
  inputValue,
  path,
  prefixCls,
  fieldNames,
}) => {
  const optionList: VueNode[] = []

  // We do lower here to save perf
  const lower = inputValue.toLowerCase()

  path.forEach((node, index) => {
    if (index !== 0)
      optionList.push(' / ')

    let label = (node as any)[fieldNames.label!]
    const type = typeof label
    if (type === 'string' || type === 'number')
      label = highlightKeyword(String(label), lower, prefixCls)

    optionList.push(label)
  })
  return optionList
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ACascader',
  inheritAttrs: false,
  props: initDefaultProps(cascaderProps(), {
    bordered: true,
    choiceTransitionName: '',
    allowClear: true,
  }),
  setup(props, { attrs, expose, slots, emit }) {
    // ====================== Warning ======================
    if (process.env.NODE_ENV !== 'production') {
      devWarning(
        !props.dropdownClassName,
        'Cascader',
        '`dropdownClassName` is deprecated. Please use `popupClassName` instead.',
      )
    }
    const formItemContext = useInjectFormItemContext()
    const formItemInputContext = FormItemInputContext.useInject()
    const mergedStatus = computed(() => getMergedStatus(formItemInputContext.status, props.status))
    const {
      prefixCls: cascaderPrefixCls,
      rootPrefixCls,
      getPrefixCls,
      direction,
      getPopupContainer,
      renderEmpty,
      size: contextSize,
      disabled,
    } = useConfigInject('cascader', props)
    const prefixCls = computed(() => getPrefixCls('select', props.prefixCls))
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction)
    const mergedSize = computed(() => compactSize.value || contextSize.value)
    const contextDisabled = useInjectDisabled()
    const mergedDisabled = computed(() => disabled.value ?? contextDisabled.value)

    const [wrapSelectSSR, hashId] = useSelectStyle(prefixCls)
    const [wrapCascaderSSR] = useStyle(cascaderPrefixCls)

    const isRtl = computed(() => direction.value === 'rtl')
    // =================== Warning =====================
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        devWarning(
          !props.multiple || !props.displayRender || !slots.displayRender,
          'Cascader',
          '`displayRender` not work on `multiple`. Please use `tagRender` instead.',
        )
      })
    }
    // ==================== Search =====================
    const mergedShowSearch = computed(() => {
      if (!props.showSearch)
        return props.showSearch

      let searchConfig: ShowSearchType = {
        render: defaultSearchRender,
      }

      if (typeof props.showSearch === 'object') {
        searchConfig = {
          ...searchConfig,
          ...props.showSearch,
        }
      }

      return searchConfig
    })

    // =================== Dropdown ====================
    const mergedDropdownClassName = computed(() =>
      classNames(
        props.popupClassName || props.dropdownClassName,
        `${cascaderPrefixCls.value}-dropdown`,
        {
          [`${cascaderPrefixCls.value}-dropdown-rtl`]: isRtl.value,
        },
        hashId.value,
      ),
    )

    const selectRef = ref<CascaderRef>()
    expose({
      focus() {
        selectRef.value?.focus()
      },
      blur() {
        selectRef.value?.blur()
      },
    } as CascaderRef)

    const handleChange: CascaderProps['onChange'] = (...args) => {
      emit('update:value', args[0])
      emit('change', ...args)
      formItemContext.onFieldChange()
    }
    const handleBlur: CascaderProps['onBlur'] = (...args) => {
      emit('blur', ...args)
      formItemContext.onFieldBlur()
    }
    const mergedShowArrow = computed(() =>
      props.showArrow !== undefined ? props.showArrow : props.loading || !props.multiple,
    )
    const placement = computed(() => {
      if (props.placement !== undefined)
        return props.placement

      return direction.value === 'rtl'
        ? ('bottomRight' as SelectCommonPlacement)
        : ('bottomLeft' as SelectCommonPlacement)
    })
    return () => {
      const {
        notFoundContent = slots.notFoundContent?.(),
        expandIcon = slots.expandIcon?.(),
        multiple,
        bordered,
        allowClear,
        choiceTransitionName,
        transitionName,
        id = formItemContext.id.value,
        ...restProps
      } = props
      // =================== No Found ====================
      const mergedNotFoundContent = notFoundContent || renderEmpty('Cascader')

      // ===================== Icon ======================
      let mergedExpandIcon = expandIcon
      if (!expandIcon)
        mergedExpandIcon = isRtl.value ? <LeftOutlined /> : <RightOutlined />

      const loadingIcon = (
        <span class={`${prefixCls.value}-menu-item-loading-icon`}>
          <LoadingOutlined spin />
        </span>
      )

      // ===================== Icons =====================
      const { suffixIcon, removeIcon, clearIcon } = getIcons(
        {
          ...props,
          hasFeedback: formItemInputContext.hasFeedback,
          feedbackIcon: formItemInputContext.feedbackIcon,
          multiple,
          prefixCls: prefixCls.value,
          showArrow: mergedShowArrow.value,
        },
        slots,
      )
      return wrapCascaderSSR(
        wrapSelectSSR(
          <VcCascader
            {...restProps}
            {...attrs}
            id={id}
            prefixCls={prefixCls.value}
            class={[
              cascaderPrefixCls.value,
              {
                [`${prefixCls.value}-lg`]: mergedSize.value === 'large',
                [`${prefixCls.value}-sm`]: mergedSize.value === 'small',
                [`${prefixCls.value}-rtl`]: isRtl.value,
                [`${prefixCls.value}-borderless`]: !bordered,
                [`${prefixCls.value}-in-form-item`]: formItemInputContext.isFormItemInput,
              },
              getStatusClassNames(
                prefixCls.value,
                mergedStatus.value,
                formItemInputContext.hasFeedback,
              ),
              compactItemClassnames.value,
              attrs.class,
              hashId.value,
            ]}
            disabled={mergedDisabled.value}
            direction={direction.value}
            placement={placement.value}
            notFoundContent={mergedNotFoundContent}
            allowClear={allowClear}
            showSearch={mergedShowSearch.value}
            expandIcon={mergedExpandIcon}
            inputIcon={suffixIcon}
            removeIcon={removeIcon}
            clearIcon={clearIcon}
            loadingIcon={loadingIcon}
            checkable={!!multiple}
            dropdownClassName={mergedDropdownClassName.value}
            dropdownPrefixCls={cascaderPrefixCls.value}
            choiceTransitionName={getTransitionName(rootPrefixCls.value, '', choiceTransitionName)}
            transitionName={getTransitionName(
              rootPrefixCls.value,
              getTransitionDirection(placement.value),
              transitionName,
            )}
            getPopupContainer={getPopupContainer?.value}
            customSlots={{
              ...slots,
              checkable: () => <span class={`${cascaderPrefixCls.value}-checkbox-inner`} />,
            }}
            tagRender={props.tagRender || slots.tagRender}
            displayRender={props.displayRender || slots.displayRender}
            maxTagPlaceholder={props.maxTagPlaceholder || slots.maxTagPlaceholder}
            showArrow={formItemInputContext.hasFeedback || props.showArrow}
            onChange={handleChange}
            onBlur={handleBlur}
            v-slots={slots}
            ref={selectRef}
          />,
        ),
      )
    }
  },
})
