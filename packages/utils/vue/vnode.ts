import { render as VueRender, cloneVNode } from 'vue'
import type { VNode } from 'vue'

export function triggerVNodeUpdate(vm: VNode, attrs: Record<string, any>, dom: any) {
  VueRender(cloneVNode(vm, { ...attrs }), dom)
}
