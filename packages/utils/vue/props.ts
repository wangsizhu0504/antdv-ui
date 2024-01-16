import { Fragment, isVNode } from 'vue'

import type { VueInstance } from '@antdv/types'
import { isEmptyElement, isOn, isStringElement, isValid, isValidElement } from '../is'
import { camelize, hyphenate } from '../lang/camelize'
import { classNames } from '../dom/class'
import { resolvePropValue } from './util'

// function getType(fn) {
//   const match = fn && fn.toString().match(/^\s*function (\w+)/);
//   return match ? match[1] : '';
// }

export function splitAttrs(attrs: any) {
  const allAttrs = Object.keys(attrs)
  const eventAttrs: Record<string, any> = {}
  const onEvents: Record<string, any> = {}
  const extraAttrs: Record<string, any> = {}
  for (let i = 0, l = allAttrs.length; i < l; i++) {
    const key = allAttrs[i]
    if (isOn(key)) {
      eventAttrs[key[2].toLowerCase() + key.slice(3)] = attrs[key]
      onEvents[key] = attrs[key]
    } else {
      extraAttrs[key] = attrs[key]
    }
  }
  return { onEvents, events: eventAttrs, extraAttrs }
}

export function parseStyleText(cssText = '', camel = false) {
  const res = {}
  const listDelimiter = /;(?![^(]*\))/g
  const propertyDelimiter = /:(.+)/
  if (typeof cssText === 'object') return cssText
  cssText.split(listDelimiter).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiter)
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim()
        res[k] = tmp[1].trim()
      }
    }
  })
  return res
}

export function hasProp(instance: any, prop: string) {
  return instance[prop] !== undefined
}

export const skipFlattenKey = Symbol('skipFlatten')
export function flattenChildren(children = [], filterEmpty = true) {
  const temp = Array.isArray(children) ? children : [children]
  const res = []
  temp.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty))
    } else if (child && child.type === Fragment) {
      if (child.key === skipFlattenKey)
        res.push(child)
      else
        res.push(...flattenChildren(child.children, filterEmpty))
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child))
        res.push(child)
      else if (!filterEmpty)
        res.push(child)
    } else if (isValid(child)) {
      res.push(child)
    }
  })
  return res
}

export function getSlot(self: any, name = 'default', options = {}) {
  if (isVNode(self)) {
    if (self.type === Fragment)
      return name === 'default' ? flattenChildren(self.children as any[]) : []
    else if (self.children && self.children[name])
      return flattenChildren(self.children[name](options))
    else
      return []
  } else {
    const res = self.$slots[name] && self.$slots[name](options)
    return flattenChildren(res)
  }
}

export function findDOMNode(instance: any) {
  let node = instance?.vnode?.el || (instance && (instance.$el || instance))
  while (node && !node.tagName)
    node = node.nextSibling

  return node
}
export function getOptionProps(instance: VueInstance) {
  const res = {}
  if (instance.$ && instance.$.vnode) {
    const props = instance.$.vnode.props || {}
    Object.keys(instance.$props).forEach((k) => {
      const v = instance.$props[k]
      const hyphenateKey = hyphenate(k)
      if (v !== undefined || hyphenateKey in props)
        res[k] = v // 直接取 $props[k]
    })
  } else if (isVNode(instance) && typeof instance.type === 'object') {
    const originProps = instance.props || {}
    const props = {}
    Object.keys(originProps).forEach((key) => {
      props[camelize(key)] = originProps[key]
    })
    const options = (instance.type as any).props || {}
    Object.keys(options).forEach((k) => {
      const v = resolvePropValue(options, props, k, props[k])
      if (v !== undefined || k in props)
        res[k] = v
    })
  }
  return res
}
export function getComponent(instance: any, prop = 'default', options = instance, execute = true) {
  let com
  if (instance.$) {
    const temp = instance[prop]
    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(options) : temp
    } else {
      com = instance.$slots[prop]
      com = execute && com ? com(options) : com
    }
  } else if (isVNode(instance)) {
    const temp = instance.props && instance.props[prop]
    if (temp !== undefined && instance.props !== null) {
      return typeof temp === 'function' && execute ? temp(options) : temp
    } else if (instance.type === Fragment) {
      com = instance.children
    } else if (instance.children && instance.children[prop]) {
      com = instance.children[prop]
      com = execute && com ? com(options) : com
    }
  }
  if (Array.isArray(com)) {
    com = flattenChildren(com)
    com = com.length === 1 ? com[0] : com
    com = com.length === 0 ? undefined : com
  }
  return com
}

export function getKey(ele: any) {
  const key = ele.key
  return key
}

export function getEvents(ele: any = {}, on = true) {
  let props = {}
  if (ele.$)
    props = { ...props, ...ele.$attrs }
  else
    props = { ...props, ...ele.props }

  return splitAttrs(props)[on ? 'onEvents' : 'events']
}

export function getClass(ele: any) {
  const props = (isVNode(ele) ? ele.props : ele.$attrs) || {}
  const tempCls = props.class || {}
  let cls = {}
  if (typeof tempCls === 'string') {
    tempCls.split(' ').forEach((c) => {
      cls[c.trim()] = true
    })
  } else if (Array.isArray(tempCls)) {
    classNames(tempCls)
      .split(' ')
      .forEach((c) => {
        cls[c.trim()] = true
      })
  } else {
    cls = { ...cls, ...tempCls }
  }
  return cls
}
export function getStyle(ele: any, camel?: boolean) {
  const props = (isVNode(ele) ? ele.props : ele.$attrs) || {}
  let style = props.style || {}
  if (typeof style === 'string') {
    style = parseStyleText(style, camel)
  } else if (camel && style) {
    // 驼峰化
    const res = {}
    Object.keys(style).forEach(k => (res[camelize(k)] = style[k]))
    return res
  }
  return style
}

export function getComponentName(opts: any) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

export function filterEmpty(children = []) {
  const res = []
  children.forEach((child) => {
    if (Array.isArray(child))
      res.push(...child)
    else if (child?.type === Fragment)
      res.push(...filterEmpty(child.children))
    else
      res.push(child)
  })
  return res.filter(c => !isEmptyElement(c))
}

export function filterEmptyWithUndefined(children: any[]) {
  if (children) {
    const coms = filterEmpty(children)
    return coms.length ? coms : undefined
  } else {
    return children
  }
}

export function getPropsSlot(slots: any, props: any, prop = 'default') {
  return props[prop] ?? slots[prop]?.()
}

export function getTextFromElement(ele: any) {
  if (isValidElement(ele) && isStringElement(ele[0]))
    return ele[0].children

  return ele
}
