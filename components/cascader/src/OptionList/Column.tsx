import { defineComponent } from 'vue'
import { cascaderOptionColumnProps } from '../props'
import { useInjectCascader } from '../context'
import { isLeaf, toPathKey } from '../utils/commonUtil'
import { SEARCH_MARK } from '../hooks/useSearchOptions'
import OptionCheckbox from './Checkbox'

export const FIX_LABEL = '__cascader_fix_label__'

export default defineComponent({
  name: 'CascaderOptionColumn',
  props: cascaderOptionColumnProps(),
  inheritAttrs: false,
  setup(props) {
    const { prefixCls } = props
    const menuPrefixCls = `${prefixCls}-menu`
    const menuItemPrefixCls = `${prefixCls}-menu-item`

    const {
      fieldNames,
      changeOnSelect,
      expandTrigger,
      expandIcon: expandIconRef,
      loadingIcon: loadingIconRef,
      dropdownMenuColumnStyle,
      customSlots,
    } = useInjectCascader()
    const expandIcon = expandIconRef.value ?? customSlots.value.expandIcon?.()
    const loadingIcon = loadingIconRef.value ?? customSlots.value.loadingIcon?.()

    const hoverOpen = expandTrigger.value === 'hover'
    // ============================ Render ============================
    return () => {
      return (
        <ul class={menuPrefixCls} role="menu">
          {props.options.map((option) => {
            const { disabled } = option
            const searchOptions = option[SEARCH_MARK]
            const label = option[FIX_LABEL] ?? option[fieldNames.value.label]
            const value = option[fieldNames.value.value]

            const isMergedLeaf = isLeaf(option, fieldNames.value)

            // Get real value of option. Search option is different way.
            const fullPath = searchOptions
              ? searchOptions.map(opt => opt[fieldNames.value.value])
              : [...props.prevValuePath, value]
            const fullPathKey = toPathKey(fullPath)

            const isLoading = props.loadingKeys.includes(fullPathKey)

            // >>>>> checked
            const checked = props.checkedSet.has(fullPathKey)

            // >>>>> halfChecked
            const halfChecked = props.halfCheckedSet.has(fullPathKey)
            // >>>>> Open
            const triggerOpenPath = () => {
              if (!disabled && (!hoverOpen || !isMergedLeaf))
                props.onActive?.(fullPath)
            }

            // >>>>> Selection
            const triggerSelect = () => {
              if (props.isSelectable?.(option))
                props.onSelect?.(fullPath, isMergedLeaf)
            }

            // >>>>> Title
            let title: string
            if (typeof option.title === 'string')
              title = option.title
            else if (typeof label === 'string')
              title = label

            // >>>>> Render
            return (
              <li
                key={fullPathKey}
                class={[
                  menuItemPrefixCls,
                  {
                    [`${menuItemPrefixCls}-expand`]: !isMergedLeaf,
                    [`${menuItemPrefixCls}-active`]: props.activeValue === value,
                    [`${menuItemPrefixCls}-disabled`]: disabled,
                    [`${menuItemPrefixCls}-loading`]: isLoading,
                  },
                ]}
                style={dropdownMenuColumnStyle.value}
                role="menuitemcheckbox"
                title={title}
                aria-checked={checked}
                data-path-key={fullPathKey}
                onClick={() => {
                  triggerOpenPath()
                  if (!props.multiple || isMergedLeaf)
                    triggerSelect()
                }}
                onDblclick={() => {
                  if (changeOnSelect.value)
                    props.onToggleOpen?.(false)
                }}
                onMouseenter={() => {
                  if (hoverOpen)
                    triggerOpenPath()
                }}
                onMousedown={(e) => {
                  // Prevent selector from blurring
                  e.preventDefault()
                }}
              >
                {props.multiple && (
                  <OptionCheckbox
                    prefixCls={`${prefixCls}-checkbox`}
                    checked={checked}
                    halfChecked={halfChecked}
                    disabled={disabled}
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation()
                      triggerSelect()
                    }}
                  />
                )}
                <div class={`${menuItemPrefixCls}-content`}>{label}</div>
                {!isLoading && expandIcon && !isMergedLeaf && (
                  <div class={`${menuItemPrefixCls}-expand-icon`}>{expandIcon}</div>
                )}
                {isLoading && loadingIcon && (
                  <div class={`${menuItemPrefixCls}-loading-icon`}>{loadingIcon}</div>
                )}
              </li>
            )
          })}
        </ul>
      )
    }
  },
})
