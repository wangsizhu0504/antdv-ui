import type { MouseEventHandler, WheelEventHandler } from '@antdv/types';
import type { ImgHTMLAttributes, PropType, VNode } from 'vue';
import { addEventListenerWrap, classNames, getOffset, KeyCode, warning } from '@antdv/utils';
import {
  cloneVNode,
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  shallowRef,
  watch,
} from 'vue';
import Dialog from '../../vc-dialog/src/DialogWrap';
import { dialogPropTypes, type IDialogChildProps } from '../../vc-dialog/src/IDialogPropTypes';
import { imageContext } from './context';
import getFixScaleEleTransPosition from './getFixScaleEleTransPosition';

import useFrameSetState from './hooks/useFrameSetState';

export interface PreviewProps extends Omit<IDialogChildProps, 'onClose' | 'mask'> {
  onClose?: (e: Element) => void;
  src?: string;
  alt?: string;
  rootClassName?: string;
  icons?: {
    rotateLeft?: VNode;
    rotateRight?: VNode;
    zoomIn?: VNode;
    zoomOut?: VNode;
    close?: VNode;
    left?: VNode;
    right?: VNode;
    flipX?: VNode;
    flipY?: VNode;
  };
  imgCommonProps?: ImgHTMLAttributes;
}

const initialPosition = {
  x: 0,
  y: 0,
};
export const previewProps = {
  ...dialogPropTypes(),
  src: String,
  alt: String,
  rootClassName: String,
  icons: {
    type: Object as PropType<PreviewProps['icons']>,
    default: () => ({} as PreviewProps['icons']),
  },
  imgCommonProps: {
    type: Object as PropType<PreviewProps['imgCommonProps']>,
    default: () => ({}),
  },
};
const Preview = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Preview',
  inheritAttrs: false,
  props: previewProps,
  emits: ['close', 'afterClose'],
  setup(props, { emit, attrs }) {
    const { rotateLeft, rotateRight, zoomIn, zoomOut, close, left, right, flipX, flipY } = reactive(
      props.icons,
    );

    const scale = shallowRef(1);
    const rotate = shallowRef(0);
    const flip = reactive({ x: 1, y: 1 });
    const [position, setPosition] = useFrameSetState<{
      x: number;
      y: number;
    }>(initialPosition);

    const onClose = () => emit('close');
    const imgRef = shallowRef<HTMLImageElement>();
    const originPositionRef = reactive<{
      originX: number;
      originY: number;
      deltaX: number;
      deltaY: number;
    }>({
      originX: 0,
      originY: 0,
      deltaX: 0,
      deltaY: 0,
    });
    const isMoving = shallowRef(false);
    const groupContext = imageContext.inject();
    const { previewUrls, current, isPreviewGroup, setCurrent } = groupContext;
    const previewGroupCount = computed(() => previewUrls.value.size);
    const previewUrlsKeys = computed(() => Array.from(previewUrls.value.keys()));
    const currentPreviewIndex = computed(() => previewUrlsKeys.value.indexOf(current.value));
    const combinationSrc = computed(() => {
      return isPreviewGroup.value ? previewUrls.value.get(current.value) : props.src;
    });
    const showLeftOrRightSwitches = computed(
      () => isPreviewGroup.value && previewGroupCount.value > 1,
    );
    const lastWheelZoomDirection = shallowRef({ wheelDirection: 0 });

    const onAfterClose = () => {
      scale.value = 1;
      rotate.value = 0;
      flip.x = 1;
      flip.y = 1;
      setPosition(initialPosition);
      emit('afterClose');
    };

    const onZoomIn = (isWheel?: boolean) => {
      if (!isWheel)
        scale.value++;
      else
        scale.value += 0.5;

      setPosition(initialPosition);
    };
    const onZoomOut = (isWheel?: boolean) => {
      if (scale.value > 1) {
        if (!isWheel)
          scale.value--;
        else
          scale.value -= 0.5;
      }
      setPosition(initialPosition);
    };

    const onRotateRight = () => {
      rotate.value += 90;
    };

    const onRotateLeft = () => {
      rotate.value -= 90;
    };

    const onFlipX = () => {
      flip.x = -flip.x;
    };

    const onFlipY = () => {
      flip.y = -flip.y;
    };

    const onSwitchLeft: MouseEventHandler = (event) => {
      event.preventDefault();
      // Without this mask close will abnormal
      event.stopPropagation();
      if (currentPreviewIndex.value > 0)
        setCurrent(previewUrlsKeys.value[currentPreviewIndex.value - 1]);
    };

    const onSwitchRight: MouseEventHandler = (event) => {
      event.preventDefault();
      // Without this mask close will abnormal
      event.stopPropagation();
      if (currentPreviewIndex.value < previewGroupCount.value - 1)
        setCurrent(previewUrlsKeys.value[currentPreviewIndex.value + 1]);
    };

    const wrapClassName = classNames({
      [`${props.prefixCls}-moving`]: isMoving.value,
    });
    const toolClassName = `${props.prefixCls}-operations-operation`;
    const iconClassName = `${props.prefixCls}-operations-icon`;
    const tools = [
      {
        icon: close,
        onClick: onClose,
        type: 'close',
      },
      {
        icon: zoomIn,
        onClick: () => onZoomIn(),
        type: 'zoomIn',
      },
      {
        icon: zoomOut,
        onClick: () => onZoomOut(),
        type: 'zoomOut',
        disabled: computed(() => scale.value === 1),
      },
      {
        icon: rotateRight,
        onClick: onRotateRight,
        type: 'rotateRight',
      },
      {
        icon: rotateLeft,
        onClick: onRotateLeft,
        type: 'rotateLeft',
      },
      {
        icon: flipX,
        onClick: onFlipX,
        type: 'flipX',
      },
      {
        icon: flipY,
        onClick: onFlipY,
        type: 'flipY',
      },
    ];

    const onMouseUp: MouseEventHandler = () => {
      if (props.visible && isMoving.value) {
        const width = imgRef.value.offsetWidth * scale.value;
        const height = imgRef.value.offsetHeight * scale.value;
        const { left, top } = getOffset(imgRef.value);
        const isRotate = rotate.value % 180 !== 0;

        isMoving.value = false;

        const fixState = getFixScaleEleTransPosition(
          isRotate ? height : width,
          isRotate ? width : height,
          left,
          top,
        );
        if (fixState)
          setPosition({ ...fixState });
      }
    };

    const onMouseDown: MouseEventHandler = (event) => {
      // Only allow main button
      if (event.button !== 0) return;
      event.preventDefault();
      // Without this mask close will abnormal
      event.stopPropagation();
      originPositionRef.deltaX = event.pageX - position.x;
      originPositionRef.deltaY = event.pageY - position.y;
      originPositionRef.originX = position.x;
      originPositionRef.originY = position.y;
      isMoving.value = true;
    };

    const onMouseMove: MouseEventHandler = (event) => {
      if (props.visible && isMoving.value) {
        setPosition({
          x: event.pageX - originPositionRef.deltaX,
          y: event.pageY - originPositionRef.deltaY,
        });
      }
    };

    const onWheelMove: WheelEventHandler = (event) => {
      if (!props.visible) return;
      event.preventDefault();
      const wheelDirection = event.deltaY;
      lastWheelZoomDirection.value = { wheelDirection };
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!props.visible || !showLeftOrRightSwitches.value) return;

      event.preventDefault();
      if (event.keyCode === KeyCode.LEFT) {
        if (currentPreviewIndex.value > 0)
          setCurrent(previewUrlsKeys.value[currentPreviewIndex.value - 1]);
      } else if (event.keyCode === KeyCode.RIGHT) {
        if (currentPreviewIndex.value < previewGroupCount.value - 1)
          setCurrent(previewUrlsKeys.value[currentPreviewIndex.value + 1]);
      }
    };

    const onDoubleClick = () => {
      if (props.visible) {
        if (scale.value !== 1)
          scale.value = 1;

        if (position.x !== initialPosition.x || position.y !== initialPosition.y)
          setPosition(initialPosition);
      }
    };

    let removeListeners = () => {};
    onMounted(() => {
      watch(
        [() => props.visible, isMoving],
        () => {
          removeListeners();
          let onTopMouseUpListener: { remove: any };
          let onTopMouseMoveListener: { remove: any };

          const onMouseUpListener = addEventListenerWrap(window, 'mouseup', onMouseUp, false);
          const onMouseMoveListener = addEventListenerWrap(window, 'mousemove', onMouseMove, false);
          const onScrollWheelListener = addEventListenerWrap(window, 'wheel', onWheelMove, {
            passive: false,
          });
          const onKeyDownListener = addEventListenerWrap(window, 'keydown', onKeyDown, false);

          try {
            // Resolve if in iframe lost event
            /* istanbul ignore next */
            if (window.top !== window.self) {
              onTopMouseUpListener = addEventListenerWrap(window.top, 'mouseup', onMouseUp, false);
              onTopMouseMoveListener = addEventListenerWrap(
                window.top,
                'mousemove',
                onMouseMove,
                false,
              );
            }
          } catch (error) {
            /* istanbul ignore next */
            warning(false, `[vc-image] ${error}`);
          }

          removeListeners = () => {
            onMouseUpListener.remove();
            onMouseMoveListener.remove();
            onScrollWheelListener.remove();
            onKeyDownListener.remove();

            /* istanbul ignore next */
            if (onTopMouseUpListener) onTopMouseUpListener.remove();
            /* istanbul ignore next */
            if (onTopMouseMoveListener) onTopMouseMoveListener.remove();
          };
        },
        { flush: 'post', immediate: true },
      );
      watch([lastWheelZoomDirection], () => {
        const { wheelDirection } = lastWheelZoomDirection.value;
        if (wheelDirection > 0)
          onZoomOut(true);
        else if (wheelDirection < 0)
          onZoomIn(true);
      });
    });
    onUnmounted(() => {
      removeListeners();
    });

    return () => {
      const { visible, prefixCls, rootClassName, imgCommonProps } = props;
      return (
        <Dialog
          {...attrs}
          transitionName={props.transitionName}
          maskTransitionName={props.maskTransitionName}
          closable={false}
          keyboard
          prefixCls={prefixCls}
          onClose={onClose}
          afterClose={onAfterClose}
          visible={visible}
          wrapClassName={wrapClassName}
          rootClassName={rootClassName}
          getContainer={props.getContainer}
        >
          <div class={[`${props.prefixCls}-operations-wrapper`, rootClassName]}>
            <ul class={`${props.prefixCls}-operations`}>
              {tools.map(({ icon: IconType, onClick, type, disabled }) => (
                <li
                  class={classNames(toolClassName, {
                    [`${props.prefixCls}-operations-operation-disabled`]:
                      disabled && disabled?.value,
                  })}
                  onClick={onClick}
                  key={type}
                >
                  {cloneVNode(IconType, { class: iconClassName })}
                </li>
              ))}
            </ul>
          </div>
          <div
            class={`${props.prefixCls}-img-wrapper`}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            }}
          >
            <img
              {...imgCommonProps}
              onMousedown={onMouseDown}
              onDblclick={onDoubleClick}
              ref={imgRef}
              class={`${props.prefixCls}-img`}
              src={combinationSrc.value}
              alt={props.alt}
              style={{
                transform: `scale3d(${flip.x * scale.value}, ${flip.y * scale.value}, 1) rotate(${
                  rotate.value
                }deg)`,
              }}
            />
          </div>
          {showLeftOrRightSwitches.value && (
            <div
              class={classNames(`${props.prefixCls}-switch-left`, {
                [`${props.prefixCls}-switch-left-disabled`]: currentPreviewIndex.value <= 0,
              })}
              onClick={onSwitchLeft}
            >
              {left}
            </div>
          )}
          {showLeftOrRightSwitches.value && (
            <div
              class={classNames(`${props.prefixCls}-switch-right`, {
                [`${props.prefixCls}-switch-right-disabled`]:
                  currentPreviewIndex.value >= previewGroupCount.value - 1,
              })}
              onClick={onSwitchRight}
            >
              {right}
            </div>
          )}
        </Dialog>
      );
    };
  },
});

export default Preview;
