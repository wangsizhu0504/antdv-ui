import hash from '@emotion/hash'
import canUseDom from '../_util/canUseDom'
import { removeCSS, updateCSS } from '../vc-util/Dom/dynamicCSS'
import type { App, Plugin } from 'vue'

export function flattenToken(token: any) {
  let str = ''
  Object.keys(token).forEach((key) => {
    const value = token[key]
    str += key
    if (value && typeof value === 'object')
      str += flattenToken(value)
    else
      str += value
  })
  return str
}

/**
 * Convert derivative token to key string
 */
export function token2key(token: any, salt: string): string {
  return hash(`${salt}_${flattenToken(token)}`)
}

const layerKey = `layer-${Date.now()}-${Math.random()}`.replace(/\./g, '')
const layerWidth = '903px'

function supportSelector(styleStr: string, handleElement?: (ele: HTMLElement) => void): boolean {
  if (canUseDom()) {
    updateCSS(styleStr, layerKey)

    const ele = document.createElement('div')
    ele.style.position = 'fixed'
    ele.style.left = '0'
    ele.style.top = '0'
    handleElement?.(ele)
    document.body.appendChild(ele)

    if (process.env.NODE_ENV !== 'production') {
      ele.innerHTML = 'Test'
      ele.style.zIndex = '9999999'
    }

    const support = getComputedStyle(ele).width === layerWidth

    ele.parentNode?.removeChild(ele)
    removeCSS(layerKey)

    return support
  }

  return false
}

let canLayer: boolean | undefined
export function supportLayer(): boolean {
  if (canLayer === undefined) {
    canLayer = supportSelector(
      `@layer ${layerKey} { .${layerKey} { width: ${layerWidth}!important; } }`,
      (ele) => {
        ele.className = layerKey
      },
    )
  }

  return canLayer!
}

export const withInstall = <T>(comp: T) => {
  const c = comp as any
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp)
  }

  return comp as T & Plugin
}
