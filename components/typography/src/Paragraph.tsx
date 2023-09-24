import Base from './Base'
import { type ParagraphProps, paragraphProps } from './props'
import type { FunctionalComponent } from 'vue'

const Paragraph: FunctionalComponent<ParagraphProps> = (props, { slots, attrs }) => {
  const paragraphProps = {
    ...props,
    component: 'div',
    ...attrs,
  }

  return <Base {...paragraphProps} v-slots={slots}></Base>
}

Paragraph.displayName = 'ATypographyParagraph'
Paragraph.inheritAttrs = false
Paragraph.props = paragraphProps()

export default Paragraph
