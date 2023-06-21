const toString = Object.prototype.toString
export const isValid = (value: any): boolean => {
  return value !== undefined && value !== null && value !== ''
}

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isFunction = <T extends Function>(val: any): val is T => typeof val === 'function'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isString = (val: unknown): val is string => typeof val === 'string'

export function isValidValue(val: any) {
  return val !== undefined && val !== null
}

export const isNumeric = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}
export const isObject = (val: any) => toString.call(val) === '[object Object]'
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}
