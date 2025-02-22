import type { App, Plugin } from 'vue';
import AGroup from './src/Group';
import ARadio from './src/Radio';
import ARadioButton from './src/RadioButton';

export const RadioGroup = AGroup;
export const RadioButton = ARadioButton;

export const Radio = Object.assign(ARadio, {
  Group: AGroup,
  Button: ARadioButton,
  install(app: App) {
    app.component(ARadio.name, ARadio);
    app.component(AGroup.name, AGroup);
    app.component(ARadioButton.name, ARadioButton);
    return app;
  },
});

export default Radio as typeof Radio & Plugin & {
  readonly Group: typeof AGroup
  readonly Button: typeof ARadioButton
};

export * from './src/interface';
export * from './src/props';
