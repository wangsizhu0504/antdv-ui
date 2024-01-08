import { computed, defineComponent, ref } from 'vue'
import {
  classNames,
  flattenChildren,
  getMergedStatus,
  getStatusClassNames,
  initDefaultProps,
  omit,
  warning,
  warningFn,
} from '@antdv/utils'
import type { CustomSlotsType, Key } from '@antdv/types'
import { VcTreeSelect, getTransitionDirection } from '@antdv/vue-components'
import type { SelectCommonPlacement } from '@antdv/vue-components'
import getIcons from '../../select/src/iconUtil'
import renderSwitcherIcon from '../../tree/src/utils/iconUtil'
import { FormItemInputContext, useInjectFormItemContext } from '../../form/src/FormItemContext'
import useSelectStyle from '../../select/style'

import useConfigInject from '../../config-provider/src/hooks/useConfigInject'

// CSSINJS
import { useInjectDisabled } from '../../config-provider'
import { useCompactItemContext } from '../../space/src/context'
import useStyle from '../style'
import type { SwitcherIconProps } from '../../tree/src/utils/iconUtil'
import { treeSelectProps } from './props'
import type { TreeSelectProps } from './props'

function getTransitionName(rootPrefixCls: string, motion: string, transitionName?: string) {
  if (transitionName !== undefined)
    return transitionName

  return `${rootPrefixCls}-${motion}`
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ATreeSelect',
  inheritAttrs: false,
  props: initDefaultProps(treeSelectProps(), {
    choiceTransitionName: '',
    listHeight: 256,
    treeIcon: false,
    listItemHeight: 26,
    bordered: true,
  }),
  slots: Object as CustomSlotsType<{
    title?: any
    titleRender?: any
    placeholder?: any
    maxTagPlaceholder?: any
    treeIcon?: any
    switcherIcon?: any
    notFoundContent?: any
    default?: any
    leafIcon?: any
    tagRender?: any
    suffixIcon?: any
  }>,
  setup(props, { attrs, slots, expose, emit }) {
    warningFn(
      !(props.treeData === undefined && slots.default),
      '`children` of TreeSelect is deprecated. Please use `treeData` instead.',
    )
    warning(
      props.multiple !== false || !props.treeCheckable,
      'TreeSelect',
      '`multiple` will always be `true` when `treeCheckable` is true',
    )
    warning(
      props.replaceFields === undefined,
      'TreeSelect',
      '`replaceFields` is deprecated, please use fieldNames instead',
    )
    warning(
      !props.dropdownClassName,
      'TreeSelect',
      '`dropdownClassName` is deprecated. Please use `popupClassName` instead.',
    )

    const formItemContext = useInjectFormItemContext()
    const formItemInputContext = FormItemInputContext.useInject()
    const mergedStatus = computed(() => getMergedStatus(formItemInputContext.status, props.status))
    const {
      prefixCls,
      renderEmpty,
      direction,
      virtual,
      dropdownMatchSelectWidth,
      size: contextSize,
      getPopupContainer,
      getPrefixCls,
      disabled,
    } = useConfigInject('select', props)
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction)
    const mergedSize = computed(() => compactSize.value || contextSize.value)
    const contextDisabled = useInjectDisabled()
    const mergedDisabled = computed(() => disabled.value ?? contextDisabled.value)
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
    const choiceTransitionName = computed(() =>
      getTransitionName(rootPrefixCls.value, '', props.choiceTransitionName),
    )
    const treePrefixCls = computed(() => getPrefixCls('select-tree', props.prefixCls))
    const treeSelectPrefixCls = computed(() => getPrefixCls('tree-select', props.prefixCls))

    // style
    const [wrapSelectSSR, hashId] = useSelectStyle(prefixCls)
    const [wrapTreeSelectSSR] = useStyle(treeSelectPrefixCls, treePrefixCls)

    const mergedDropdownClassName = computed(() =>
      classNames(
        props.popupClassName || props.dropdownClassName,
        `${treeSelectPrefixCls.value}-dropdown`,
        {
          [`${treeSelectPrefixCls.value}-dropdown-rtl`]: direction.value === 'rtl',
        },
        hashId.value,
      ),
    )

    const isMultiple = computed(() => !!(props.treeCheckable || props.multiple))
    const mergedShowArrow = computed(() =>
      props.showArrow !== undefined ? props.showArrow : props.loading || !isMultiple.value,
    )

    const treeSelectRef = ref()
    expose({
      focus() {
        treeSelectRef.value.focus?.()
      },

      blur() {
        treeSelectRef.value.blur?.()
      },
    })

    const handleChange: TreeSelectProps['onChange'] = (...args: any[]) => {
      emit('update:value', args[0])
      emit('change', ...args)
      formItemContext.onFieldChange()
    }
    const handleTreeExpand: TreeSelectProps['onTreeExpand'] = (keys: Key[]) => {
      emit('update:treeExpandedKeys', keys)
      emit('treeExpand', keys)
    }
    const handleSearch: TreeSelectProps['onSearch'] = (value: string) => {
      emit('update:searchValue', value)
      emit('search', value)
    }
    const handleBlur = (e: FocusEvent) => {
      emit('blur', e)
      formItemContext.onFieldBlur()
    }
    return () => {
      const {
        notFoundContent = slots.notFoundContent?.(),
        prefixCls: customizePrefixCls,
        bordered,
        listHeight,
        listItemHeight,
        multiple,
        treeIcon,
        treeLine,
        showArrow,
        switcherIcon = slots.switcherIcon?.(),
        fieldNames = props.replaceFields,
        id = formItemContext.id.value,
      } = props
      const { isFormItemInput, hasFeedback, feedbackIcon } = formItemInputContext
      // ===================== Icons =====================
      const { suffixIcon, removeIcon, clearIcon } = getIcons(
        {
          ...props,
          multiple: isMultiple.value,
          showArrow: mergedShowArrow.value,
          hasFeedback,
          feedbackIcon,
          prefixCls: prefixCls.value,
        },
        slots,
      )

      // ===================== Empty =====================
      let mergedNotFound
      if (notFoundContent !== undefined)
        mergedNotFound = notFoundContent
      else
        mergedNotFound = renderEmpty('Select')

      // ==================== Render =====================
      const selectProps = omit(props as typeof props & { itemIcon: any, switcherIcon: any }, [
        'suffixIcon',
        'itemIcon',
        'removeIcon',
        'clearIcon',
        'switcherIcon',
        'bordered',
        'status',
        'onSearch',
        'onUpdate:value',
        'onUpdate:treeExpandedKeys',
        'onUpdate:searchValue',
      ])

      const mergedClassName = classNames(
        !customizePrefixCls && treeSelectPrefixCls.value,
        {
          [`${prefixCls.value}-lg`]: mergedSize.value === 'large',
          [`${prefixCls.value}-sm`]: mergedSize.value === 'small',
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
          [`${prefixCls.value}-borderless`]: !bordered,
          [`${prefixCls.value}-in-form-item`]: isFormItemInput,
        },
        getStatusClassNames(prefixCls.value, mergedStatus.value, hasFeedback),
        compactItemClassnames.value,
        attrs.class,
        hashId.value,
      )
      const otherProps: any = {}
      if (props.treeData === undefined && slots.default)
        otherProps.children = flattenChildren(slots.default())

      return wrapSelectSSR(
        wrapTreeSelectSSR(
          <VcTreeSelect
            {...attrs}
            {...selectProps}
            disabled={mergedDisabled.value}
            virtual={virtual.value}
            dropdownMatchSelectWidth={dropdownMatchSelectWidth.value}
            id={id}
            fieldNames={fieldNames}
            ref={treeSelectRef}
            prefixCls={prefixCls.value}
            class={mergedClassName}
            listHeight={listHeight}
            listItemHeight={listItemHeight}
            treeLine={!!treeLine}
            inputIcon={suffixIcon}
            multiple={multiple}
            removeIcon={removeIcon}
            clearIcon={clearIcon}
            switcherIcon={(nodeProps: SwitcherIconProps) => {
              return renderSwitcherIcon(
                treePrefixCls.value,
                switcherIcon,
                nodeProps,
                slots.leafIcon,
                treeLine,
              )
            }}
            showTreeIcon={treeIcon as any}
            notFoundContent={mergedNotFound}
            getPopupContainer={getPopupContainer?.value}
            treeMotion={null}
            dropdownClassName={mergedDropdownClassName.value}
            choiceTransitionName={choiceTransitionName.value}
            onChange={handleChange}
            onBlur={handleBlur}
            onSearch={handleSearch}
            onTreeExpand={handleTreeExpand}
            v-slots={{
              ...slots,
              treeCheckable: () => <span class={`${prefixCls.value}-tree-checkbox-inner`} />,
            }}
            {...otherProps}
            transitionName={transitionName.value}
            customSlots={{
              ...slots,
              treeCheckable: () => <span class={`${prefixCls.value}-tree-checkbox-inner`} />,
            }}
            maxTagPlaceholder={props.maxTagPlaceholder || slots.maxTagPlaceholder}
            placement={placement.value}
            showArrow={hasFeedback || showArrow}
          />,
        ),
      )
    }
  },
})
