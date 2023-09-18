import { anyType, objectType } from '../../_util/type'
import type { ExtractPropTypes, HTMLAttributes } from 'vue'
import type { VueNode } from '../../_util/type'

export const vcBaseMentionOptionsProps = {
  value: String,
  disabled: Boolean,
  payload: objectType<Record<string, any>>(),
}
export const vcMentionOptionProps = {
  ...vcBaseMentionOptionsProps,
  label: anyType<VueNode | ((o: VcBaseOptionsProps) => VueNode)>([]),
}

export type VcBaseOptionsProps = Partial<ExtractPropTypes<typeof vcBaseMentionOptionsProps>> &
Partial<HTMLAttributes>

export type VcMentionOptionProps = Partial<ExtractPropTypes<typeof vcMentionOptionProps>> & Partial<HTMLAttributes>
