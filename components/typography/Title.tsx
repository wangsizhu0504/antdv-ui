import warning from '../_util/warning'
import Base from './Base'
import { TITLE_ELE_LIST, titleProps } from './props'
import type { TitleProps } from './props'
import type { FunctionalComponent } from 'vue'

const Title: FunctionalComponent<TitleProps> = (props, { slots, attrs }) => {
  const { level = 1, ...restProps } = props
  let component: string
  if (TITLE_ELE_LIST.includes(level)) {
    component = `h${level}`
  } else {
    warning(false, 'Typography', 'Title only accept `1 | 2 | 3 | 4 | 5` as `level` value.')
    component = 'h1'
  }

  const titleProps = {
    ...restProps,
    component,
    ...attrs,
  }

  return <Base {...titleProps} v-slots={slots}></Base>
}

Title.displayName = 'ATypographyTitle'
Title.inheritAttrs = false
Title.props = titleProps()

export default Title
