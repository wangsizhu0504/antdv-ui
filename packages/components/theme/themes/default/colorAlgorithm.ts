import { TinyColor } from '@ctrl/tinycolor'

export function getAlphaColor(baseColor: string, alpha: number) {
  return new TinyColor(baseColor).setAlpha(alpha).toRgbString()
}

export function getSolidColor(baseColor: string, brightness: number) {
  const instance = new TinyColor(baseColor)
  return instance.darken(brightness).toHexString()
}
