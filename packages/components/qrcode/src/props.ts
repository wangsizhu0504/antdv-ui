import type { ExtractPropTypes } from 'vue';
import type { ImageSettings } from './interface';
import { objectType, stringType } from '@antdv/utils';

export function qrProps() {
  return {
    size: { type: Number, default: 160 },
    value: { type: String, required: true },
    type: stringType<'canvas' | 'svg'>('canvas'),
    color: String,
    bgColor: String,
    includeMargin: Boolean,
    imageSettings: objectType<ImageSettings>(),
  };
}

export function qrcodeProps() {
  return {
    ...qrProps(),
    errorLevel: stringType<'L' | 'M' | 'Q' | 'H'>('M'),
    icon: String,
    iconSize: { type: Number, default: 40 },
    status: stringType<'active' | 'expired' | 'loading' | 'scanned'>('active'),
    bordered: { type: Boolean, default: true },
  };
}

export function qrcodeCanvasProps() {
  return {
    ...qrProps(),
    level: String,
    bgColor: String,
    fgColor: String,
    marginSize: Number,
  };
}

export function qrcodeSvgProps() {
  return {
    ...qrProps(),
    color: String,
    level: String,
    bgColor: String,
    fgColor: String,
    marginSize: Number,
    title: String,
  };
}

export type QRProps = Partial<ExtractPropTypes<ReturnType<typeof qrProps>>>;

export type QRCodeCanvasProps = Partial<ExtractPropTypes<ReturnType<typeof qrcodeCanvasProps>>>;

export type QRCodeSvgProps = Partial<ExtractPropTypes<ReturnType<typeof qrcodeSvgProps>>>;

export type QRCodeProps = Partial<ExtractPropTypes<ReturnType<typeof qrcodeProps>>>;
