import type {
  HslaColor,
  HslColor,
  HsvaColor,
  HsvColor,
  RgbaColor,
  RgbColor,
} from '../types'
import { round } from './round'

/**
 * Valid CSS <angle> units.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/angle
 */
const angleUnits: Record<string, number> = {
  grad: 360 / 400,
  turn: 360,
  rad: 360 / (Math.PI * 2),
}
export function roundHsva(hsva: HsvaColor): HsvaColor {
  return {
    h: round(hsva.h),
    s: round(hsva.s),
    v: round(hsva.v),
    a: round(hsva.a, 2),
  }
}
export function hexToRgba(hex: string): RgbaColor {
  if (hex[0] === '#') hex = hex.substring(1)

  if (hex.length < 6) {
    return {
      r: Number.parseInt(hex[0] + hex[0], 16),
      g: Number.parseInt(hex[1] + hex[1], 16),
      b: Number.parseInt(hex[2] + hex[2], 16),
      a: hex.length === 4 ? round(Number.parseInt(hex[3] + hex[3], 16) / 255, 2) : 1,
    }
  }

  return {
    r: Number.parseInt(hex.substring(0, 2), 16),
    g: Number.parseInt(hex.substring(2, 4), 16),
    b: Number.parseInt(hex.substring(4, 6), 16),
    a: hex.length === 8 ? round(Number.parseInt(hex.substring(6, 8), 16) / 255, 2) : 1,
  }
}

export function parseHue(value: string, unit = 'deg'): number {
  return Number(value) * (angleUnits[unit] || 1)
}

export function hslaToHsva({ h, s, l, a }: HslaColor): HsvaColor {
  s *= (l < 50 ? l : 100 - l) / 100

  return {
    h,
    s: s > 0 ? ((2 * s) / (l + s)) * 100 : 0,
    v: l + s,
    a,
  }
}
export function hslaStringToHsva(hslString: string): HsvaColor {
  const matcher
    = /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i
  const match = matcher.exec(hslString)

  if (!match) return { h: 0, s: 0, v: 0, a: 1 }

  return hslaToHsva({
    h: parseHue(match[1], match[2]),
    s: Number(match[3]),
    l: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1),
  })
}
export const hslStringToHsva = hslaStringToHsva

export function hsvaToHsla({ h, s, v, a }: HsvaColor): HslaColor {
  const hh = ((200 - s) * v) / 100

  return {
    h: round(h),
    s: round((hh > 0 && hh < 200) ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100 : 0),
    l: round(hh / 2),
    a: round(a, 2),
  }
}

export function hsvaToHslString(hsva: HsvaColor): string {
  const { h, s, l } = hsvaToHsla(hsva)
  return `hsl(${h}, ${s}%, ${l}%)`
}

export function hsvaToHsvString(hsva: HsvaColor): string {
  const { h, s, v } = roundHsva(hsva)
  return `hsv(${h}, ${s}%, ${v}%)`
}

export function hsvaToHsvaString(hsva: HsvaColor): string {
  const { h, s, v, a } = roundHsva(hsva)
  return `hsva(${h}, ${s}%, ${v}%, ${a})`
}

export function hsvaToHslaString(hsva: HsvaColor): string {
  const { h, s, l, a } = hsvaToHsla(hsva)
  return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

export function hsvaToRgba({ h, s, v, a }: HsvaColor): RgbaColor {
  h = (h / 360) * 6
  s = s / 100
  v = v / 100

  const hh = Math.floor(h)
  const b = v * (1 - s)
  const c = v * (1 - (h - hh) * s)
  const d = v * (1 - (1 - h + hh) * s)
  const module = hh % 6

  return {
    r: round([v, c, b, b, d, v][module] * 255),
    g: round([d, v, v, c, b, b][module] * 255),
    b: round([b, b, d, v, v, c][module] * 255),
    a: round(a, 2),
  }
}

export function hsvaToRgbString(hsva: HsvaColor): string {
  const { r, g, b } = hsvaToRgba(hsva)
  return `rgb(${r}, ${g}, ${b})`
}

export function hsvaToRgbaString(hsva: HsvaColor): string {
  const { r, g, b, a } = hsvaToRgba(hsva)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function hsvaStringToHsva(hsvString: string): HsvaColor {
  const matcher
    = /hsva?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i
  const match = matcher.exec(hsvString)

  if (!match) return { h: 0, s: 0, v: 0, a: 1 }

  return roundHsva({
    h: parseHue(match[1], match[2]),
    s: Number(match[3]),
    v: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1),
  })
}

export const hsvStringToHsva = hsvaStringToHsva

function format(number: number) {
  const hex = number.toString(16)
  return hex.length < 2 ? `0${hex}` : hex
}

export function rgbaToHex({ r, g, b, a }: RgbaColor): string {
  const alphaHex = a < 1 ? format(round(a * 255)) : ''
  return `#${format(r)}${format(g)}${format(b)}${alphaHex}`
}
export const hsvaToHex = (hsva: HsvaColor): string => rgbaToHex(hsvaToRgba(hsva))

export function rgbaToHsva({ r, g, b, a }: RgbaColor): HsvaColor {
  const max = Math.max(r, g, b)
  const delta = max - Math.min(r, g, b)

  // prettier-ignore
  const hh = delta
    ? max === r
      ? (g - b) / delta
      : max === g
        ? 2 + (b - r) / delta
        : 4 + (r - g) / delta
    : 0

  return {
    h: round(60 * (hh < 0 ? hh + 6 : hh)),
    s: round(max ? (delta / max) * 100 : 0),
    v: round((max / 255) * 100),
    a,
  }
}

export function rgbaStringToHsva(rgbaString: string): HsvaColor {
  const matcher
    = /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i
  const match = matcher.exec(rgbaString)

  if (!match) return { h: 0, s: 0, v: 0, a: 1 }

  return rgbaToHsva({
    r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
    g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
    b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
    a: match[7] === undefined ? 1 : Number(match[7]) / (match[8] ? 100 : 1),
  })
}
export const rgbStringToHsva = rgbaStringToHsva

export const rgbaToRgb = ({ r, g, b }: RgbaColor): RgbColor => ({ r, g, b })

export const hslaToHsl = ({ h, s, l }: HslaColor): HslColor => ({ h, s, l })

export function hsvaToHsv(hsva: HsvaColor): HsvColor {
  const { h, s, v } = roundHsva(hsva)
  return { h, s, v }
}
export const hexToHsva = (hex: string): HsvaColor => rgbaToHsva(hexToRgba(hex))
