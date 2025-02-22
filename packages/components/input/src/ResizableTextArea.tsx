import type { BaseInputExpose } from '@antdv/vue-components/vc-input/src/BaseInputCore';
import type { CSSProperties } from 'vue';
import { classNames, devWarning, omit, raf } from '@antdv/utils';
import { ResizeObserver } from '@antdv/vue-components';

import BaseInput from '@antdv/vue-components/vc-input/src/BaseInputCore';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  ref,
  watch,
  watchEffect,
} from 'vue';
import calculateAutoSizeStyle from './calculateNodeHeight';
import { textAreaProps } from './props';

const RESIZE_START = 0;
const RESIZE_MEASURING = 1;
const RESIZE_STABLE = 2;

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ResizableTextArea',
  inheritAttrs: false,
  props: textAreaProps(),
  setup(props, { attrs, emit, expose }) {
    let nextFrameActionId: any;
    let resizeFrameId: any;
    const textAreaRef = ref<BaseInputExpose>();
    const textareaStyles = ref({});
    const resizeStatus = ref(RESIZE_STABLE);
    onBeforeUnmount(() => {
      raf.cancel(nextFrameActionId);
      raf.cancel(resizeFrameId);
    });

    // https://github.com/ant-design/ant-design/issues/21870
    const fixFirefoxAutoScroll = () => {
      try {
        if (textAreaRef.value && document.activeElement === textAreaRef.value.input) {
          const currentStart = textAreaRef.value.getSelectionStart();
          const currentEnd = textAreaRef.value.getSelectionEnd();
          const scrollTop = textAreaRef.value.getScrollTop();
          textAreaRef.value.setSelectionRange(currentStart, currentEnd);
          textAreaRef.value.setScrollTop(scrollTop);
        }
      } catch (e) {
        // Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    };
    const minRows = ref<number>();
    const maxRows = ref<number>();
    watchEffect(() => {
      const autoSize = props.autoSize || props.autosize;
      if (autoSize) {
        minRows.value = autoSize.minRows;
        maxRows.value = autoSize.maxRows;
      } else {
        minRows.value = undefined;
        maxRows.value = undefined;
      }
    });
    const needAutoSize = computed(() => !!(props.autoSize || props.autosize));
    const startResize = () => {
      resizeStatus.value = RESIZE_START;
    };
    watch(
      [() => props.value, minRows, maxRows, needAutoSize],
      () => {
        if (needAutoSize.value)
          startResize();
      },
      { immediate: true },
    );
    const autoSizeStyle = ref<CSSProperties>();
    watch(
      [resizeStatus, textAreaRef],
      () => {
        if (!textAreaRef.value) return;
        if (resizeStatus.value === RESIZE_START) {
          resizeStatus.value = RESIZE_MEASURING;
        } else if (resizeStatus.value === RESIZE_MEASURING) {
          const getTextareaStyles = calculateAutoSizeStyle(
            textAreaRef.value.input as HTMLTextAreaElement,
            false,
            minRows.value,
            maxRows.value,
          );
          resizeStatus.value = RESIZE_STABLE;
          autoSizeStyle.value = getTextareaStyles;
        } else {
          fixFirefoxAutoScroll();
        }
      },
      { immediate: true, flush: 'post' },
    );
    const instance = getCurrentInstance();
    const resizeRafRef = ref();
    const cleanRaf = () => {
      raf.cancel(resizeRafRef.value);
    };
    const onInternalResize = (size: { width: number; height: number }) => {
      if (resizeStatus.value === RESIZE_STABLE) {
        emit('resize', size);

        if (needAutoSize.value) {
          cleanRaf();
          resizeRafRef.value = raf(() => {
            startResize();
          });
        }
      }
    };
    onBeforeUnmount(() => {
      cleanRaf();
    });
    const resizeTextarea = () => {
      startResize();
    };

    expose({
      resizeTextarea,
      textArea: computed(() => textAreaRef.value?.input),
      instance,
    });

    devWarning(
      props.autosize === undefined,
      'Input.TextArea',
      'autosize is deprecated, please use autoSize instead.',
    );

    const renderTextArea = () => {
      const { prefixCls, disabled } = props;
      const otherProps = omit(props, [
        'prefixCls',
        'onPressEnter',
        'autoSize',
        'autosize',
        'defaultValue',
        'allowClear',
        'type',
        'lazy',
        'maxlength',
        'valueModifiers',
      ]);
      const cls = classNames(prefixCls, attrs.class, {
        [`${prefixCls}-disabled`]: disabled,
      });
      const mergedAutoSizeStyle = needAutoSize.value ? autoSizeStyle.value : null;
      const style = [attrs.style, textareaStyles.value, mergedAutoSizeStyle];

      const textareaProps: any = {
        ...otherProps,
        ...attrs,
        style,
        class: cls,
      };
      if (resizeStatus.value === RESIZE_START || resizeStatus.value === RESIZE_MEASURING) {
        style.push({
          overflowX: 'hidden',
          overflowY: 'hidden',
        });
      }
      if (!textareaProps.autofocus)
        delete textareaProps.autofocus;

      if (textareaProps.rows === 0)
        delete textareaProps.rows;

      return (
        <ResizeObserver onResize={onInternalResize} disabled={!needAutoSize.value}>
          <BaseInput {...textareaProps} ref={textAreaRef} tag="textarea"></BaseInput>
        </ResizeObserver>
      );
    };

    return () => {
      return renderTextArea();
    };
  },
});
