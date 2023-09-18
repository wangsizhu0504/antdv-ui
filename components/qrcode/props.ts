import { objectType, stringType } from '../_util/type'
import type { ExtractPropTypes } from 'vue'
import type { ImageSettings } from './types'

export const qrProps = () => ({
  size: { type: Number, default: 160 },
  value: { type: String, required: true },
  type: stringType<'canvas' | 'svg'>('canvas'),
  color: String,
  bgColor: String,
  includeMargin: Boolean,
  imageSettings: objectType<ImageSettings>(),
})

export const qrcodeProps = () => ({
  ...qrProps(),
  errorLevel: stringType<'L' | 'M' | 'Q' | 'H'>('M'),
  icon: String,
  iconSize: { type: Number, default: 40 },
  status: stringType<'active' | 'expired' | 'loading'>('active'),
  bordered: { type: Boolean, default: true },
})

export const qrcodeCanvasProps = () => ({
  ...qrProps(),
  level: String,
  bgColor: String,
  fgColor: String,
  marginSize: Number,
})

export const qrcodeSvgProps = () => ({
  ...qrProps(),
  color: String,
  level: String,
  bgColor: String,
  fgColor: String,
  marginSize: Number,
  title: String,
})

export type QRProps = Partial<ExtractPropTypes<ReturnType<typeof qrProps>>>

export type QRCodeCanvasProps = Partial<ExtractPropTypes<ReturnType<typeof qrcodeCanvasProps>>>

export type QRCodeSvgProps = Partial<ExtractPropTypes<ReturnType<typeof qrcodeSvgProps>>>

export type QRCodeProps = Partial<ExtractPropTypes<ReturnType<typeof qrcodeProps>>>
