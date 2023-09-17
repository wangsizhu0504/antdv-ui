import base from './Base'
import paragraph from './Paragraph'
import text from './Text'
import title from './Title'
import link from './Link'
import typography from './Typography'
import type { App, Plugin } from 'vue'

export const TypographyText = text
export const TypographyTitle = title
export const TypographyLink = link
export const TypographyParagraph = paragraph
export const TypographyBase = base

export const Typography = Object.assign(typography, {
  Text: TypographyText,
  Title: TypographyTitle,
  Paragraph: TypographyParagraph,
  Link: TypographyLink,
  Base: TypographyBase,
  install(app: App) {
    app.component(typography.name, typography)
    app.component(text.displayName, Text)
    app.component(title.displayName, title)
    app.component(paragraph.displayName, paragraph)
    app.component(link.displayName, link)
    return app
  },
})

export default Typography as typeof Typography & Plugin & {
  readonly Text: typeof text
  readonly Title: typeof title
  readonly Paragraph: typeof paragraph
  readonly Link: typeof link
  readonly Base: typeof base
}

export * from './props'
export * from './types'
