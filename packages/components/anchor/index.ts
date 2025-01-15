import type { App, Plugin } from 'vue';
import AAnchor from './src/Anchor';
import AAnchorLink from './src/AnchorLink';

export const AnchorLink = AAnchorLink;

export const Anchor = Object.assign(AAnchor, {
  Link: AnchorLink,
  install(app: App) {
    app.component(AAnchor.name, AAnchor);
    app.component(AAnchorLink.name, AAnchorLink);
    return app;
  },
});

export default Anchor as typeof Anchor & Plugin & {
  readonly Link: typeof AnchorLink
};

export * from './src/interface';
export * from './src/props';
