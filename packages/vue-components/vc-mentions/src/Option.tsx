import type { VueNode } from '@antdv/types';
import type { ExtractPropTypes, HTMLAttributes } from 'vue';
import { anyType, objectType } from '@antdv/utils';
import { defineComponent } from 'vue';

export const baseOptionsProps = {
  value: String,
  disabled: Boolean,
  payload: objectType<Record<string, any>>(),
};
export const optionProps = {
  ...baseOptionsProps,
  label: anyType<VueNode | ((o: BaseOptionsProps) => VueNode)>([]),
};
export type BaseOptionsProps = Partial<ExtractPropTypes<typeof baseOptionsProps>> &
  Partial<HTMLAttributes>;

export type OptionProps = Partial<ExtractPropTypes<typeof optionProps>> & Partial<HTMLAttributes>;

export const optionOptions = {
  name: 'Option',
  props: optionProps,
  render(_props: any, { slots }: any) {
    return slots.default?.();
  },
};
export default defineComponent({
  compatConfig: { MODE: 3 },
  ...optionOptions,
});
