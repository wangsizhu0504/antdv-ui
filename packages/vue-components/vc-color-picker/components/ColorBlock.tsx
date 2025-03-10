import { classNames } from '@antdv/utils';

import { computed, defineComponent } from 'vue';

export interface ColorBlockProps {
  color: string;
  prefixCls?: string;
  onClick?: () => void;
}

const ColorBlock = defineComponent({
  name: 'ColorBlock',
  props: ['color', 'prefixCls', 'onClick'],
  setup(props: ColorBlockProps) {
    const colorBlockCls = computed(() => `${props.prefixCls}-color-block`);
    return () => (
      <div class={classNames(colorBlockCls.value)} onClick={props.onClick}>
        <div
          class={`${colorBlockCls.value}-inner`}
          style={{
            background: props.color,
          }}
        />
      </div>
    );
  },
});

export default ColorBlock;
