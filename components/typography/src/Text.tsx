import { omit } from '../../_utils/omit'
import { warning } from '../../_utils/log'
import Base from './Base'
import { textProps } from './props'
import type { TextProps } from './props'
import type { FunctionalComponent } from 'vue'

const Text: FunctionalComponent<TextProps> = (props, { slots, attrs }) => {
  const { ellipsis } = props
  warning(
    typeof ellipsis !== 'object'
      || !ellipsis
      || (!('expandable' in ellipsis) && !('rows' in ellipsis)),
    'Typography.Text',
    '`ellipsis` do not support `expandable` or `rows` props.',
  )
  const textProps = {
    ...props,
    ellipsis:
      (ellipsis && typeof ellipsis === 'object')
        ? omit(ellipsis as any, ['expandable', 'rows'])
        : ellipsis,
    component: 'span',
    ...attrs,
  }
  return <Base {...textProps} v-slots={slots}></Base>
}

Text.displayName = 'ATypographyText'
Text.inheritAttrs = false
Text.props = textProps()

export default Text
