import { createTypes, toValidableType } from 'vue-types'
import type { CSSProperties } from 'vue'
import type { VueTypeValidableDef, VueTypesInterface } from 'vue-types'
import type { VueNode } from '../type'

const newPropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  array: undefined,
  object: undefined,
  integer: undefined,
})

// 从 vue-types v5.0 开始，extend()方法已经废弃，当前已改为官方推荐的ES6+方法 https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#the-extend-method
class PropTypes extends newPropTypes {
  // a native-like validator that supports the `.validable` method
  static get style() {
    return toValidableType('style', {
      type: [String, Object],
      default: () => ({}),
    })
  }

  static get VNodeChild() {
    return toValidableType('looseBool', {
      type: Boolean,
      default: undefined,
    })
  }
}

export function withUndefined<T extends { default?: any }>(type: T): T {
  type.default = undefined
  return type
}

export default PropTypes as VueTypesInterface & {
  readonly looseBool: VueTypeValidableDef<boolean>
  readonly style: VueTypeValidableDef<CSSProperties>
  readonly VueNode: VueTypeValidableDef<VueNode>
} & any
