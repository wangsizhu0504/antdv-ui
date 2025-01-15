import type { App, Plugin } from 'vue';
import ATypographyBase from './src/Base';
import ATypographyLink from './src/Link';
import ATypographyParagraph from './src/Paragraph';
import ATypographyText from './src/Text';
import ATypographyTitle from './src/Title';
import typography from './src/Typography';

export const TypographyText = ATypographyText;
export const TypographyTitle = ATypographyTitle;
export const TypographyLink = ATypographyLink;
export const TypographyParagraph = ATypographyParagraph;
export const TypographyBase = ATypographyBase;

export const Typography = Object.assign(typography, {
  Text: ATypographyText,
  Title: ATypographyTitle,
  Paragraph: ATypographyParagraph,
  Link: ATypographyLink,
  Base: ATypographyBase,
  install(app: App) {
    app.component(typography.name, typography);
    app.component(ATypographyText.displayName, ATypographyText);
    app.component(ATypographyTitle.displayName, ATypographyTitle);
    app.component(ATypographyParagraph.displayName, ATypographyParagraph);
    app.component(ATypographyLink.displayName, ATypographyLink);
    return app;
  },
});

export default Typography as typeof Typography & Plugin & {
  readonly Text: typeof ATypographyText
  readonly Title: typeof ATypographyTitle
  readonly Paragraph: typeof ATypographyParagraph
  readonly Link: typeof ATypographyLink
  readonly Base: typeof ATypographyBase
};

export * from './src/interface';
export * from './src/props';
