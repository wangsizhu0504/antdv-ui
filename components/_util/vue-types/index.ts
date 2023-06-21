// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { CSSProperties } from 'vue'
import type { VueTypeValidableDef, VueTypesInterface } from 'vue-types'
import { createTypes } from 'vue-types'
import type { VueNode } from '../type'

const PropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  array: undefined,
  object: undefined,
  integer: undefined,
})

PropTypes.extend([
  {
    name: 'looseBool',
    getter: true,
    type: Boolean,
    default: undefined,
  },
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined,
  },
])

export function withUndefined<T extends { default?: any }>(type: T): T {
  type.default = undefined
  return type
}
export default PropTypes as VueTypesInterface & {
  readonly looseBool: VueTypeValidableDef<boolean>
  readonly style: VueTypeValidableDef<CSSProperties>
  readonly VueNode: VueTypeValidableDef<VueNode>
} & any
