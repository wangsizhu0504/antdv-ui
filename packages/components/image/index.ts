import type { App, Plugin } from 'vue';
import AImage from './src/Image';
import AImagePreviewGroup from './src/PreviewGroup';

export const ImagePreviewGroup = AImagePreviewGroup;

export const Image = Object.assign(AImage, {
  PreviewGroup: AImagePreviewGroup,
  install(app: App) {
    app.component(AImage.name, AImage);
    app.component(AImagePreviewGroup.name, AImagePreviewGroup);
    return app;
  },
});

export default Image as typeof Image & Plugin & {
  readonly PreviewGroup: typeof AImagePreviewGroup
};

export * from './src/interface';
export * from './src/props';
