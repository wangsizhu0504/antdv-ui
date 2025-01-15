import type { ComputedRef, ImgHTMLAttributes, Ref } from 'vue';
import type { IDialogChildProps } from '../../vc-dialog/src/IDialogPropTypes';
import type { PreviewProps } from './Preview';

export interface PreviewGroupPreview
  extends Omit<ImagePreviewType, 'icons' | 'mask' | 'maskClassName'> {
  /**
   * If Preview the show img index
   * @default 0
   */
  current?: number;
}

export interface GroupConsumerProps {
  previewPrefixCls?: string;
  icons?: PreviewProps['icons'];
  preview?: boolean | PreviewGroupPreview;
}

export interface PreviewUrl {
  url: string;
  canPreview: boolean;
  imgCommonProps: ImgHTMLAttributes;
}

export interface GroupConsumerValue extends GroupConsumerProps {
  isPreviewGroup?: Ref<boolean | undefined>;
  previewUrls: ComputedRef<Map<number, string>>;
  setPreviewUrls: (id: number, url: string, canPreview?: boolean) => void;
  current: Ref<number>;
  setCurrent: (current: number) => void;
  setShowPreview: (isShowPreview: boolean) => void;
  setMousePosition: (mousePosition: null | { x: number; y: number }) => void;
  registerImage: (
    id: number,
    url: string,
    canPreview?: boolean,
    imgCommonProps?: ImgHTMLAttributes,
  ) => () => void;
  rootClassName?: string;
}

export type GetContainer = string | HTMLElement | (() => HTMLElement);

export type ImagePreviewType = Omit<
  IDialogChildProps,
  'mask' | 'visible' | 'closable' | 'prefixCls' | 'onClose' | 'afterClose' | 'wrapClassName'
> & {
  src?: string;
  visible?: boolean;
  onVisibleChange?: (value: boolean, prevValue: boolean) => void;
  getContainer?: GetContainer | false;
  maskClassName?: string;
  icons?: PreviewProps['icons'];
};

export type ImageStatus = 'normal' | 'error' | 'loading';
