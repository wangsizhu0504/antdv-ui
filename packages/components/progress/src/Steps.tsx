import type { VueNode } from '@antdv/types';
import type { ProgressSize } from './interface';
import { computed, defineComponent } from 'vue';
import { progressStepsProps } from './props';
import { getSize } from './utils';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ProgressSteps',
  props: progressStepsProps(),
  setup(props, { slots }) {
    const current = computed(() => Math.round(props.steps * ((props.percent || 0) / 100)));
    const mergedSize = computed(
      () => props.size ?? [props.size === 'small' ? 2 : 14, props.strokeWidth || 8],
    );
    const sizeRef = computed(() =>
      getSize(mergedSize.value as ProgressSize, 'step', {
        steps: props.steps,
        strokeWidth: props.strokeWidth || 8,
      }),
    );

    const styledSteps = computed(() => {
      const { steps, strokeColor, trailColor, prefixCls } = props;

      const temp: VueNode[] = [];
      for (let i = 0; i < steps; i += 1) {
        const color = Array.isArray(strokeColor) ? strokeColor[i] : strokeColor;
        const cls = {
          [`${prefixCls}-steps-item`]: true,
          [`${prefixCls}-steps-item-active`]: i <= current.value - 1,
        };
        temp.push(
          <div
            key={i}
            class={cls}
            style={{
              backgroundColor: i <= current.value - 1 ? color : trailColor,
              width: `${sizeRef.value.width / steps}px`,
              height: `${sizeRef.value.height}px`,
            }}
          />,
        );
      }
      return temp;
    });

    return () => (
      <div class={`${props.prefixCls}-steps-outer`}>
        {styledSteps.value}
        {slots.default?.()}
      </div>
    );
  },
});
