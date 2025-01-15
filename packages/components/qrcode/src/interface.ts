import type qrcodegen from './qrcodegen';

export type Modules = ReturnType<qrcodegen.QrCode['getModules']>;
export interface Excavation {
  x: number
  y: number
  w: number
  h: number
}

export interface ImageSettings {
  src: string
  height: number
  width: number
  excavate: boolean
  x?: number
  y?: number
}

export interface QRCodeCanvasColor {
  dark?: string // 默认#000000ff
  light?: string // 默认#ffffffff
}

export interface QRCodeCanvasOptions {
  version?: number
  errorCorrectionLevel?: string // 默认"M"
  maskPattern?: number // 遮罩符号的掩码图案
  toSJISFunc?: Function // 将汉字转换为其 Shift JIS 值的帮助程序函数
  margin?: number
  scale?: number
  small?: boolean
  width: number
  color?: QRCodeCanvasColor
}
