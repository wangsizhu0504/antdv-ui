import { nextTick } from 'vue'
import { addClass, removeClass } from '@antdv/utils'
import type { CSSMotionProps } from '@antdv/types'

export function collapseMotion(name = 'ant-motion-collapse', appear = true): CSSMotionProps {
  return {
    name,
    appear,
    css: true,
    onBeforeEnter: (node: any) => {
      node.style.height = '0px'
      node.style.opacity = '0'
      addClass(node, name)
    },
    onEnter: (node: any) => {
      nextTick(() => {
        node.style.height = `${node.scrollHeight}px`
        node.style.opacity = '1'
      })
    },
    onAfterEnter: (node: any) => {
      if (node) {
        removeClass(node, name)
        node.style.height = null
        node.style.opacity = null
      }
    },
    onBeforeLeave: (node: any) => {
      addClass(node, name)
      node.style.height = `${node.offsetHeight}px`
      node.style.opacity = null
    },
    onLeave: (node: any) => {
      setTimeout(() => {
        node.style.height = '0px'
        node.style.opacity = '0'
      })
    },
    onAfterLeave: (node: any) => {
      if (node) {
        removeClass(node, name)
        if (node.style) {
          node.style.height = null
          node.style.opacity = null
        }
      }
    },
  }
}
