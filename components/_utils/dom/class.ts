import { isArray, isObject, isString } from 'lodash-es'

export function hasClass(node, className) {
  if (node.classList)
    return node.classList.contains(className)

  const originClass = node.className
  return ` ${originClass} `.includes(` ${className} `)
}

export function addClass(node, className) {
  if (node.classList) {
    node.classList.add(className)
  } else {
    if (!hasClass(node, className))
      node.className = `${node.className} ${className}`
  }
}

export function removeClass(node, className) {
  if (node.classList) {
    node.classList.remove(className)
  } else {
    if (hasClass(node, className)) {
      const originClass = node.className
      node.className = ` ${originClass} `.replace(` ${className} `, ' ')
    }
  }
}

/**
 *  拼接 元素类名
 * @param args
 * @returns
 */
export function classNames(...args: any[]): any {
  const classes = []
  for (let i = 0; i < args.length; i++) {
    const value = args[i]
    if (!value) continue
    if (isString(value)) {
      classes.push(value)
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const inner = classNames(value[i])
        if (inner)
          classes.push(inner)
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name])
          classes.push(name)
      }
    }
  }
  return classes.join(' ')
}
