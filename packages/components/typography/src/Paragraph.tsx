import type { FunctionalComponent } from 'vue'
import Base from './Base'
import { type ParagraphProps, paragraphProps } from './props'

const Paragraph: FunctionalComponent<ParagraphProps> = (props, { slots, attrs }) => {
  const getParagraphProps = {
    ...props,
    component: 'div',
    ...attrs,
  }

  return <Base {...getParagraphProps} v-slots={slots}></Base>
}

Paragraph.displayName = 'ATypographyParagraph'
Paragraph.inheritAttrs = false
Paragraph.props = paragraphProps()

export default Paragraph
