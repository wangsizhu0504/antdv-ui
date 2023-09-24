import { defineComponent, ref } from 'vue'
import { omit } from 'lodash'
import Select from '../../select'

import { useConfigInject } from '../../hooks'

import { warning } from '../../_utils/log'
import { isValidElement } from '../../_utils/is'
import { flattenChildren } from '../../_utils/vue'
import Option from './Option'
import { autoCompleteProps } from './props'
import type { SlotsType, VNode } from 'vue'

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
    options: any
    default: any
    notFoundContent: any
    dataSource: any
    clearIcon: any
  }>,
  setup(props, { slots, attrs, expose }) {
    warning(
      !('dataSource' in slots),
      'AutoComplete',
      '`dataSource` slot is deprecated, please use props `options` instead.',
    )
    warning(
      !('options' in slots),
      'AutoComplete',
      '`options` slot is deprecated, please use props `options` instead.',
    )
    warning(
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
