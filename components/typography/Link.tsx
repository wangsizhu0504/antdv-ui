import warning from '../_util/warning'
import omit from '../_util/omit'
import Base, { baseProps } from './Base'
import type { AnchorHTMLAttributes, ExtractPropTypes, FunctionalComponent } from 'vue'

export const linkProps = () =>
  omit({ ...baseProps(), ellipsis: { type: Boolean, default: undefined } }, ['component'])

export type LinkProps = Partial<ExtractPropTypes<ReturnType<typeof linkProps>>> &
AnchorHTMLAttributes

const Link: FunctionalComponent<LinkProps> = (props, { slots, attrs }) => {
  const { ellipsis, rel, ...restProps } = { ...props, ...attrs }
  warning(
    typeof ellipsis !== 'object',
    'Typography.Link',
    '`ellipsis` only supports boolean value.',
  )
  const mergedProps = {
    ...restProps,
    rel: (rel === undefined && restProps.target === '_blank') ? 'noopener noreferrer' : rel,
    ellipsis: !!ellipsis,
    component: 'a',
  }
  // https://github.com/ant-design/ant-design/issues/26622
  // @ts-expect-error
  delete mergedProps.navigate

  return <Base {...mergedProps} v-slots={slots}></Base>
}

Link.displayName = 'ATypographyLink'
Link.inheritAttrs = false
Link.props = linkProps()

export default Link
