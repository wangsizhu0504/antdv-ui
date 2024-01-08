import { isPlainObject } from 'lodash-es'
import { Fragment, h, isVNode } from 'vue'

import { skipFlattenKey } from '@antdv/constants'
import type { Recordable } from '@antdv/types'
import { camelize, hyphenate, resolvePropValue } from '../util'
import { isEmptyElement, isOn, isStringElement, isValid, isValidElement } from '../is'
import { classNames } from '../dom/class'

// function getType(fn) {
//   const match = fn && fn.toString().match(/^\s*function (\w+)/);
//   return match ? match[1] : '';
// }

export function splitAttrs(attrs: Recordable) {
  const allAttrs = Object.keys(attrs)
  const eventAttrs: Recordable = {}
  const onEvents: Recordable = {}
  const extraAttrs: Recordable = {}
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

export function parseStyleText(cssText = '', camel: boolean) {
  const res: Recordable = {}
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

export function hasProp(instance: Recordable, prop: any) {
  return instance[prop] !== undefined
}
// 重构后直接使用 hasProp 替换
export function slotHasProp(slot: Recordable, prop: any) {
  return hasProp(slot, prop)
}

export function getScopedSlots(ele: any) {
  return (ele.data && ele.data.scopedSlots) || {}
}

export function getSlots(ele: any) {
  let componentOptions = ele.componentOptions || {}
  if (ele.$vnode)
    componentOptions = ele.$vnode.componentOptions || {}

  const children = ele.children || componentOptions.children || []
  const slots: Recordable = {}
  children.forEach((child: Recordable) => {
    if (!isEmptyElement(child)) {
      const name = (child.data && child.data.slot) || 'default'
      slots[name] = slots[name] || []
      slots[name].push(child)
    }
  })
  return { ...slots, ...getScopedSlots(ele) }
}

export function flattenChildren(children = [], _filterEmpty = true) {
  const temp = Array.isArray(children) ? children : [children]
  const res: any[] = []
  temp.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, _filterEmpty))
    } else if (child && child.type === Fragment) {
      if (child.key === skipFlattenKey)
        res.push(child)
      else
        res.push(...flattenChildren(child.children, _filterEmpty))
    } else if (child && isVNode(child)) {
      if (_filterEmpty && !isEmptyElement(child))
        res.push(child)
      else if (!_filterEmpty)
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
    // @ts-expect-error
      return name === 'default' ? flattenChildren(self.children) : []
    else if (self.children && self.children[name])
      return flattenChildren(self.children[name](options))
    else
      return []
  } else {
    const res = self.$slots[name] && self.$slots[name](options)
    return flattenChildren(res)
  }
}

export function getAllChildren(ele: any) {
  let componentOptions = ele.componentOptions || {}
  if (ele.$vnode)
    componentOptions = ele.$vnode.componentOptions || {}

  return ele.children || componentOptions.children || []
}

export function getSlotOptions() {
  throw new Error('使用 .type 直接取值')
}

export function findDOMNode(instance: any) {
  let node = instance?.vnode?.el || (instance && (instance.$el || instance))
  while (node && !node.tagName)
    node = node.nextSibling

  return node
}

export function getOptionProps(instance: any) {
  const res: Recordable = {}
  if (instance.$ && instance.$.vnode) {
    const props = instance.$.vnode.props || {} as any
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
    // @ts-expect-error
    const options = instance.type.props || {}
    Object.keys(options).forEach((k) => {
      const v = resolvePropValue(options, props, k, props[k])
      if (v !== undefined || k in props)
        res[k] = v
    })
  }
  return res
}

export function getComponent(instance, prop = 'default', options = instance, execute = true) {
  let com
  if (instance.$) {
    const temp = instance[prop]
    if (temp !== undefined) {
      return (typeof temp === 'function' && execute) ? temp(options) : temp
    } else {
      com = instance.$slots[prop]
      com = (execute && com) ? com(options) : com
    }
  } else if (isVNode(instance)) {
    const temp = instance.props && instance.props[prop]
    if (temp !== undefined && instance.props !== null) {
      return (typeof temp === 'function' && execute) ? temp(options) : temp
    } else if (instance.type === Fragment) {
      com = instance.children
    } else if (instance.children && instance.children[prop]) {
      com = instance.children[prop]
      com = (execute && com) ? com(options) : com
    }
  }
  if (Array.isArray(com)) {
    com = flattenChildren(com)
    com = com.length === 1 ? com[0] : com
    com = com.length === 0 ? undefined : com
  }
  return com
}

export function getPropsData(ins) {
  const vnode = ins.$ ? ins.$ : ins
  const res = {}
  const originProps = vnode.props || {}
  const props = {}
  Object.keys(originProps).forEach((key) => {
    props[camelize(key)] = originProps[key]
  })
  const options = isPlainObject(vnode.type) ? vnode.type.props : {}
  options
    && Object.keys(options).forEach((k) => {
      const v = resolvePropValue(options, props, k, props[k])
      if (k in props) {
        // 仅包含 props，不包含默认值
        res[k] = v
      }
    })
  return { ...props, ...res } // 合并事件、未声明属性等
}

export function getComponentFromProp(instance, prop, options = instance, execute = true) {
  if (instance.$createElement) {
    // const h = instance.$createElement;
    const temp = instance[prop]
    if (temp !== undefined)
      return (typeof temp === 'function' && execute) ? temp(h, options) : temp

    return (
      (instance.$scopedSlots[prop] && execute && instance.$scopedSlots[prop](options))
      || instance.$scopedSlots[prop]
      || instance.$slots[prop]
      || undefined
    )
  } else {
    // const h = instance.context.$createElement;
    const temp = getPropsData(instance)[prop]
    if (temp !== undefined)
      return (typeof temp === 'function' && execute) ? temp(h, options) : temp

    const slotScope = getScopedSlots(instance)[prop]
    if (slotScope !== undefined)
      return (typeof slotScope === 'function' && execute) ? slotScope(h, options) : slotScope

    const slotsProp = []
    const componentOptions = instance.componentOptions || {};
    (componentOptions.children || []).forEach((child) => {
      if (child.data && child.data.slot === prop) {
        if (child.data.attrs)
          delete child.data.attrs.slot

        if (child.tag === 'template')
          slotsProp.push(child.children)
        else
          slotsProp.push(child)
      }
    })
    return slotsProp.length ? slotsProp : undefined
  }
}

export function getAllProps(ele) {
  let props = getOptionProps(ele)
  if (ele.$)

    // @ts-expect-error
    // eslint-disable-next-line ts/no-invalid-this
    props = { ...props, ...this.$attrs }
  else
    props = { ...ele.props, ...props }

  return props
}

export function getValueByProp(ele, prop) {
  return getPropsData(ele)[prop]
}

export function getAttrs(ele) {
  let data = ele.data
  if (ele.$vnode)
    data = ele.$vnode.data

  return data ? (data.attrs || {}) : {}
}

export function getKey(ele) {
  const key = ele.key
  return key
}

export function getEvents(ele = {}, on = true) {
  let props = {}
  // @ts-expect-error
  if (ele.$) {
    // @ts-expect-error
    props = { ...props, ...ele.$attrs }
  } else {
    // @ts-expect-error
    props = { ...props, ...ele.props }
  }

  return splitAttrs(props)[on ? 'onEvents' : 'events']
}

export function getEvent(child, event) {
  return child.props && child.props[event]
}

// 获取 xxx.native 或者 原生标签 事件
export function getDataEvents(child) {
  let events = {}
  if (child.data && child.data.on)
    events = child.data.on

  return { ...events }
}

// use getListeners instead this.$listeners
// https://github.com/vueComponent/ant-design-vue/issues/1705
export function getListeners(context) {
  return (context.$vnode ? context.$vnode.componentOptions.listeners : context.$listeners) || {}
}

export function getClass(ele) {
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

export function getStyle(ele, camel = false) {
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

export function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

export function filterEmpty(children = []): any {
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

export function filterEmptyWithUndefined(children) {
  if (children) {
    const coms = filterEmpty(children)
    return coms.length ? coms : undefined
  } else {
    return children
  }
}

export function mergeProps() {
  const args = [].slice.call(arguments, 0)
  const props = {}
  args.forEach((p = {}) => {
    for (const [k, v] of Object.entries(p)) {
      props[k] = props[k] || {}
      if (isPlainObject(v))
        Object.assign(props[k], v)
      else
        props[k] = v
    }
  })
  return props
}

export function getPropsSlot(slots, props, prop = 'default') {
  return props[prop] ?? slots[prop]?.()
}

export function getTextFromElement(ele) {
  if (isValidElement(ele) && isStringElement(ele[0]))
    return ele[0].children

  return ele
}
