import Base from './Base'
import Link from './Link'
import Paragraph from './Paragraph'
import Text from './Text'
import Title from './Title'
import Typography from './Typography'
import type { App, Plugin } from 'vue'

export type { TypographyProps } from './Typography'

const AntdTypography = Typography
AntdTypography.Text = Text
AntdTypography.Title = Title
AntdTypography.Paragraph = Paragraph
AntdTypography.Link = Link
AntdTypography.Base = Base

AntdTypography.install = function (app: App) {
  app.component(AntdTypography.name, AntdTypography)
  app.component(AntdTypography.Text.displayName, Text)
  app.component(AntdTypography.Title.displayName, Title)
  app.component(AntdTypography.Paragraph.displayName, Paragraph)
  app.component(AntdTypography.Link.displayName, Link)
  return app
}

export {
  Text as TypographyText,
  Title as TypographyTitle,
  Paragraph as TypographyParagraph,
  Link as TypographyLink,
}

export default AntdTypography as typeof AntdTypography &
Plugin & {
  readonly Text: typeof Text
  readonly Title: typeof Title
  readonly Paragraph: typeof Paragraph
  readonly Link: typeof Link
  readonly Base: typeof Base
}
