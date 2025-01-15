import type { SlotsType, VNode } from 'vue'
import { devWarning, flattenChildren, isValidElement } from '@antdv/utils'
import { omit } from 'lodash'
import { defineComponent, ref } from 'vue'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'

import Select from '../../select'

import Option from './Option'
import { autoCompleteProps } from './props'

function isSelectOptionOrSelectOptGroup(child: any): boolean {
  return child?.type?.isSelectOption || child?.type?.isSelectOptGroup
}
export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AAutoComplete',
  inheritAttrs: false,
  props: autoCompleteProps(),
  // emits: ['change', 'select', 'focus', 'blur'],
  slots: Object as SlotsType<{
    option: any;
    // deprecated, should use props `options` instead, not slot
    options: any
    default: any
    notFoundContent: any
    dataSource: any
    clearIcon: any
  }>,
  setup(props, { slots, attrs, expose }) {
    devWarning(
      !('dataSource' in slots),
      'AutoComplete',
      '`dataSource` slot is deprecated, please use props `options` instead.',
    )
    devWarning(
      !('options' in slots),
      'AutoComplete',
      '`options` slot is deprecated, please use props `options` instead.',
    )
    devWarning(
      !props.dropdownClassName,
      'AutoComplete',
      '`dropdownClassName` is deprecated, please use `popupClassName` instead.',
    )
    const selectRef = ref()
    const getInputElement = () => {
      const children = flattenChildren(slots.default?.())
      const element = children.length ? children[0] : undefined
      return element
    }

    const focus = () => {
      selectRef.value?.focus()
    }

    const blur = () => {
      selectRef.value?.blur()
    }

    expose({
      focus,
      blur,
    })
    const { prefixCls } = useConfigInject('select', props)
    return () => {
      const { size, dataSource, notFoundContent = slots.notFoundContent?.() } = props
      let optionChildren: VNode[]
      const { class: className } = attrs
      const cls = {
        [className as string]: !!className,
        [`${prefixCls.value}-lg`]: size === 'large',
        [`${prefixCls.value}-sm`]: size === 'small',
        [`${prefixCls.value}-show-search`]: true,
        [`${prefixCls.value}-auto-complete`]: true,
      }
      if (props.options === undefined) {
        const childArray = slots.dataSource?.() || slots.options?.() || []
        if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
          optionChildren = childArray
        } else {
          optionChildren = dataSource
            ? dataSource.map((item: any) => {
              if (isValidElement(item))
                return item

              switch (typeof item) {
                case 'string':
                  return (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  )
                case 'object':
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.text}
                    </Option>
                  )
                default:
                  throw new Error(
                    'AutoComplete[dataSource] only supports type `string[] | Object[]`.',
                  )
              }
            })
            : []
        }
      }

      const selectProps = omit(
        {
          ...props,
          ...(attrs as any),
          mode: Select.SECRET_COMBOBOX_MODE_DO_NOT_USE,
          // optionLabelProp,
          getInputElement,
          notFoundContent,
          // placeholder: '',
          class: cls,
          popupClassName: props.popupClassName || props.dropdownClassName,
          ref: selectRef,
        },
        ['dataSource', 'loading'],
      )
      return (
        <Select {...selectProps} v-slots={omit(slots, ['default', 'dataSource', 'options'])}>
          {optionChildren}
        </Select>
      )
    }
  },
})
