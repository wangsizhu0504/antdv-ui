import type { App, Plugin } from 'vue';
import ABadge from './src/Badge';
import ABadgeRibbon from './src/Ribbon';

export const BadgeRibbon = ABadgeRibbon;

export const Badge = Object.assign(ABadge, {
  Ribbon: ABadgeRibbon,
  install(app: App) {
    app.component(ABadge.name, ABadge);
    app.component(ABadgeRibbon.name, ABadgeRibbon);
    return app;
  },
});

export default Badge as typeof Badge & Plugin & {
  readonly Ribbon: typeof BadgeRibbon
};

export * from './src/interface';
export * from './src/props';
