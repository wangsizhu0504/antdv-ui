import type { VueNode } from '@antdv/types'
import { isFunction } from './is'

export function cacheStringFunction(fn: Function) {
  const cache = Object.create(null)
  return (str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const camelizeRE = /-(\w)/g

export const camelize = cacheStringFunction((str: string) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cacheStringFunction((str: string) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

export const capitalize = cacheStringFunction((str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (val: any, key: string) => hasOwnProperty.call(val, key)

// change from vue sourcecode
export function resolvePropValue(options: Record<string, any>, props: Record<string, any>, key: string, value: any) {
  const opt = options[key]
  if (opt != null) {
    const hasDefault = hasOwn(opt, 'default')
    // default values
    if (hasDefault && value === undefined) {
      const defaultValue = opt.default
      value = (opt.type !== Function && isFunction(defaultValue)) ? defaultValue() : defaultValue
    }
    // boolean casting
    if (opt.type === Boolean) {
      if (!hasOwn(props, key) && !hasDefault)
        value = false
      else if (value === '')
        value = true
    }
  }
  return value
}

export function getDataAndAriaProps(props: Record<string, any>) {
  return Object.keys(props).reduce((memo: Record<string, any>, key: string) => {
    if (key.startsWith('data-') || key.startsWith('aria-'))
      memo[key] = props[key]

    return memo
  }, {})
}

export function toPx(val: any) {
  if (typeof val === 'number') return `${val}px`
  return val
}

export function renderHelper<T = Record<string, any>>(
  v: VueNode | ((arg0: T) => VueNode),
  props: T = {} as T,
  defaultV?: any,
) {
  if (typeof v === 'function')
    return v(props)

  return v ?? defaultV
}
export function wrapPromiseFn(openFn: (resolve: VoidFunction) => VoidFunction) {
  let closeFn: VoidFunction

  const closePromise = new Promise<boolean>((resolve) => {
    closeFn = openFn(() => {
      resolve(true)
    })
  })

  const result: any = () => {
    closeFn?.()
  }

  result.then = (filled: VoidFunction, rejected: VoidFunction) => closePromise.then(filled, rejected)
  result.promise = closePromise

  return result
}

export function toArray<T>(value?: T | T[] | null): T[] {
  if (value === undefined || value === null)
    return []

  return Array.isArray(value) ? value : [value]
}

export function firstNotUndefined<T>(arr: T[] = []): T {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] !== undefined)
      return arr[i]
  }
  return undefined
}
