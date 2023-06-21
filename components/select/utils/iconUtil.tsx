import { CheckOutlined, CloseCircleFilled, CloseOutlined, DownOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons-vue'

export default function getIcons(props: any, slots: any = {}) {
  const { loading, multiple, prefixCls, hasFeedback, feedbackIcon, showArrow } = props
  const suffixIcon = props.suffixIcon || (slots.suffixIcon && slots.suffixIcon())
  const clearIcon = props.clearIcon || (slots.clearIcon && slots.clearIcon())
  const menuItemSelectedIcon
    = props.menuItemSelectedIcon || (slots.menuItemSelectedIcon && slots.menuItemSelectedIcon())
  const removeIcon = props.removeIcon || (slots.removeIcon && slots.removeIcon())
  // Clear Icon
  const mergedClearIcon = clearIcon ?? <CloseCircleFilled />
  // Validation Feedback Icon
  const getSuffixIconNode = arrowIcon => (
    <>
      {showArrow !== false && arrowIcon}
      {hasFeedback && feedbackIcon}
    </>
  )
  // Arrow item icon
  let mergedSuffixIcon = null
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = getSuffixIconNode(suffixIcon)
  } else if (loading) {
    mergedSuffixIcon = getSuffixIconNode(<LoadingOutlined spin />)
  } else {
    const iconCls = `${prefixCls}-suffix`
    mergedSuffixIcon = ({ open, showSearch }: { open: boolean; showSearch: boolean }) => {
      if (open && showSearch)
        return getSuffixIconNode(<SearchOutlined class={iconCls} />)

      return getSuffixIconNode(<DownOutlined class={iconCls} />)
    }
  }

  // Checked item icon
  let mergedItemIcon = null
  if (menuItemSelectedIcon !== undefined)
    mergedItemIcon = menuItemSelectedIcon
  else if (multiple)
    mergedItemIcon = <CheckOutlined />
  else
    mergedItemIcon = null

  let mergedRemoveIcon = null
  if (removeIcon !== undefined)
    mergedRemoveIcon = removeIcon
  else
    mergedRemoveIcon = <CloseOutlined />

  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon,
  }
}
