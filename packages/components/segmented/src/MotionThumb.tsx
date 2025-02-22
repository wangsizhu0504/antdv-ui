import type { CSSProperties, TransitionProps } from 'vue';
import type { SegmentedValue, ThumbRect } from './interface';
import { addClass, removeClass } from '@antdv/utils';
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  ref,
  Transition,
  watch,
} from 'vue';
import { motionThumbProps } from './props';

function calcThumbStyle(targetElement: HTMLElement | null | undefined): ThumbRect {
  return targetElement
    ? {
        left: targetElement.offsetLeft,
        right:
          (targetElement.parentElement!.clientWidth as number)
          - targetElement.clientWidth
          - targetElement.offsetLeft,
        width: targetElement.clientWidth,
      }
    : null;
}

const toPX = (value?: number) => (value !== undefined ? `${value}px` : undefined);

export default defineComponent({
  props: motionThumbProps(),
  name: 'AMotionThumb',
  emits: ['motionStart', 'motionEnd'],
  setup(props, { emit }) {
    const thumbRef = ref<HTMLDivElement>();
    // =========================== Effect ===========================
    const findValueElement = (val: SegmentedValue) => {
      const index = props.getValueIndex(val);

      const ele = props.containerRef.value?.querySelectorAll<HTMLDivElement>(
        `.${props.prefixCls}-item`,
      )[index];
      return ele?.offsetParent && ele;
    };

    const prevStyle = ref<ThumbRect>(null);
    const nextStyle = ref<ThumbRect>(null);

    watch(
      () => props.value,
      (value, prevValue) => {
        const prev = findValueElement(prevValue);
        const next = findValueElement(value);

        const calcPrevStyle = calcThumbStyle(prev);
        const calcNextStyle = calcThumbStyle(next);

        prevStyle.value = calcPrevStyle;
        nextStyle.value = calcNextStyle;

        if (prev && next)
          emit('motionStart');
        else
          emit('motionEnd');
      },
      { flush: 'post' },
    );

    const thumbStart = computed(() =>
      props.direction === 'rtl'
        ? toPX(-(prevStyle.value?.right as number))
        : toPX(prevStyle.value?.left as number),
    );
    const thumbActive = computed(() =>
      props.direction === 'rtl'
        ? toPX(-(nextStyle.value?.right as number))
        : toPX(nextStyle.value?.left as number),
    );

    // =========================== Motion ===========================
    let timeid: any;
    const onAppearStart: TransitionProps['onBeforeEnter'] = (el: HTMLDivElement) => {
      clearTimeout(timeid);
      nextTick(() => {
        if (el) {
          el.style.transform = 'translateX(var(--thumb-start-left))';
          el.style.width = 'var(--thumb-start-width)';
        }
      });
    };

    const onAppearActive: TransitionProps['onEnter'] = (el: HTMLDivElement) => {
      timeid = setTimeout(() => {
        if (el) {
          addClass(el, `${props.motionName}-appear-active`);
          el.style.transform = 'translateX(var(--thumb-active-left))';
          el.style.width = 'var(--thumb-active-width)';
        }
      });
    };
    const onAppearEnd: TransitionProps['onAfterEnter'] = (el: HTMLDivElement) => {
      prevStyle.value = null;
      nextStyle.value = null;
      if (el) {
        el.style.transform = null;
        el.style.width = null;
        removeClass(el, `${props.motionName}-appear-active`);
      }
      emit('motionEnd');
    };
    const mergedStyle = computed<CSSProperties>(() => ({
      '--thumb-start-left': thumbStart.value,
      '--thumb-start-width': toPX(prevStyle.value?.width),
      '--thumb-active-left': thumbActive.value,
      '--thumb-active-width': toPX(nextStyle.value?.width),
    }));
    onBeforeUnmount(() => {
      clearTimeout(timeid);
    });
    return () => {
      // It's little ugly which should be refactor when @umi/test update to latest jsdom
      const motionProps = {
        ref: thumbRef,
        style: mergedStyle.value,
        class: [`${props.prefixCls}-thumb`],
      };

      if (process.env.NODE_ENV === 'test')
        (motionProps as any)['data-test-style'] = JSON.stringify(mergedStyle.value);

      return (
        <Transition
          appear
          onBeforeEnter={onAppearStart}
          onEnter={onAppearActive}
          onAfterEnter={onAppearEnd}
        >
          {(!prevStyle.value || !nextStyle.value) ? null : <div {...motionProps}></div>}
        </Transition>
      );
    };
  },
});
