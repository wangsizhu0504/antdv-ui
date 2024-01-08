import type { ComputedRef, Ref, VNode } from 'vue'
import type { IDialogChildProps } from '../../dialog'

export type GetContainer = string | HTMLElement | (() => HTMLElement)

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
}

export interface PreviewProps extends Omit<IDialogChildProps, 'onClose' | 'mask'> {
  onClose?: (e: Element) => void;
  src?: string;
  alt?: string;
  rootClassName?: string;
  icons?: {
    rotateLeft?: VNode;
    rotateRight?: VNode;
    zoomIn?: VNode;
    zoomOut?: VNode;
    close?: VNode;
    left?: VNode;
    right?: VNode;
    flipX?: VNode;
    flipY?: VNode;
  };
}

export type ImageStatus = 'normal' | 'error' | 'loading'

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

export interface GroupConsumerValue extends GroupConsumerProps {
  isPreviewGroup?: Ref<boolean | undefined>;
  previewUrls: ComputedRef<Map<number, string>>;
  setPreviewUrls: (id: number, url: string, canPreview?: boolean) => void;
  current: Ref<number>;
  setCurrent: (current: number) => void;
  setShowPreview: (isShowPreview: boolean) => void;
  setMousePosition: (mousePosition: null | { x: number; y: number }) => void;
  registerImage: (id: number, url: string, canPreview?: boolean) => () => void;
  rootClassName?: string;
}
