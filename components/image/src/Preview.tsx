import {
  cloneVNode,
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  shallowRef,
  watch,
} from 'vue'

import Dialog from '../../_internal/dialog'
import { getOffset } from '../../_utils/dom/css'
import KeyCode from '../../_utils/keyCode'
import { warningFn } from '../../_utils/log'
import { addEventListenerWrap, classNames } from '../../_utils/dom'
import { useGroupProviderContext } from './hooks/useContext'
import getFixScaleEleTransPosition from './getFixScaleEleTransPosition'
import useFrameSetState from './hooks/useFrameSetState'
import { previewProps } from './props'
import type { CustomSlotsType, MouseEventHandler, WheelEventHandler } from '../../_utils/types'

const initialPosition = {
  x: 0,
  y: 0,
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'VcPreview',
  inheritAttrs: false,
  props: previewProps(),
  emits: ['close', 'afterClose'],
  slots: Object as CustomSlotsType<{
    closeIcon: any
    countRender: any
    toolbarRender: any
  }>,
  setup(props, { emit, attrs, slots }) {
    const { rotateLeft, rotateRight, zoomIn, zoomOut, close, left, right, flipX, flipY } = reactive(
      props.icons,
    )

    const { minScale = 1, maxScale = 50 } = reactive(props)

    const scale = shallowRef(1)
    const rotate = shallowRef(0)
    const flip = reactive({ x: 1, y: 1 })
    const [position, setPosition] = useFrameSetState<{
      x: number
      y: number
    }>(initialPosition)

    const onClose = () => emit('close')
    const imgRef = shallowRef<HTMLImageElement>()
    const originPositionRef = reactive<{
      originX: number
      originY: number
      deltaX: number
      deltaY: number
    }>({
      originX: 0,
      originY: 0,
      deltaX: 0,
      deltaY: 0,
    })
    const isMoving = shallowRef(false)
    const groupContext = useGroupProviderContext()
    const { previewUrls, current, isPreviewGroup, setCurrent } = groupContext
    const previewGroupCount = computed(() => previewUrls.value.size)
    const previewUrlsKeys = computed(() => Array.from(previewUrls.value.keys()))
    const currentPreviewIndex = computed(() => previewUrlsKeys.value.indexOf(current.value))
    const combinationSrc = computed(() => {
      return isPreviewGroup.value ? previewUrls.value.get(current.value) : props.src
    })
    const showLeftOrRightSwitches = computed(
      () => isPreviewGroup.value && previewGroupCount.value > 1,
    )
    const showOperationsProgress = computed(
      () => isPreviewGroup.value && previewGroupCount.value >= 1,
    )

    const lastWheelZoomDirection = shallowRef({ wheelDirection: 0 })

    const onAfterClose = () => {
      scale.value = 1
      rotate.value = 0
      flip.x = 1
      flip.y = 1
      setPosition(initialPosition)
      emit('afterClose')
    }

    const onZoomIn = (isWheel) => {
      if (!isWheel)
        scale.value++
      else
        scale.value += 0.5

      setPosition(initialPosition)
    }
    const onZoomOut = (isWheel) => {
      if (scale.value > 1) {
        if (!isWheel)
          scale.value--
        else
          scale.value -= 0.5
      }

      setPosition(initialPosition)
    }

    const onRotateRight = () => {
      rotate.value += 90
    }

    const onRotateLeft = () => {
      rotate.value -= 90
    }
    const onFlipX = () => {
      flip.x = -flip.x
    }

    const onFlipY = () => {
      flip.y = -flip.y
    }
    const onSwitchLeft: MouseEventHandler = (event) => {
      event.preventDefault()
      // Without this mask close will abnormal
      event.stopPropagation()
      if (currentPreviewIndex.value > 0)
        setCurrent(previewUrlsKeys.value[currentPreviewIndex.value - 1])
    }

    const onSwitchRight: MouseEventHandler = (event) => {
      event.preventDefault()
      // Without this mask close will abnormal
      event.stopPropagation()
      if (currentPreviewIndex.value < previewGroupCount.value - 1)
        setCurrent(previewUrlsKeys.value[currentPreviewIndex.value + 1])
    }

    const wrapClassName = classNames({
      [`${props.prefixCls}-moving`]: isMoving.value,
    })
    const toolClassName = `${props.prefixCls}-operations-operation`
    const iconClassName = `${props.prefixCls}-operations-icon`
    const tools = [
      {
        icon: flipY,
        onClick: onFlipY,
        type: 'flipY',
      },
      {
        icon: flipX,
        onClick: onFlipX,
        type: 'flipX',
      },
      {
        icon: rotateLeft,
        onClick: onRotateLeft,
        type: 'rotateLeft',
      },
      {
        icon: rotateRight,
        onClick: onRotateRight,
        type: 'rotateRight',
      },
      {
        icon: zoomOut,
        onClick: onZoomOut,
        type: 'zoomOut',
        disabled: computed(() => scale.value === minScale),
      },
      {
        icon: zoomIn,
        onClick: onZoomIn,
        type: 'zoomIn',
        disabled: computed(() => scale.value === maxScale),
      },
    ]

    const onMouseUp: MouseEventHandler = () => {
      if (props.visible && isMoving.value) {
        const width = imgRef.value.offsetWidth * scale.value
        const height = imgRef.value.offsetHeight * scale.value
        const { left, top } = getOffset(imgRef.value)
        const isRotate = rotate.value % 180 !== 0

        isMoving.value = false

        const fixState = getFixScaleEleTransPosition(
          isRotate ? height : width,
          isRotate ? width : height,
          left,
          top,
        )
        if (fixState)
          setPosition({ ...fixState })
      }
    }

    const onMouseDown: MouseEventHandler = (event) => {
      // Only allow main button
      if (event.button !== 0) return
      event.preventDefault()
      // Without this mask close will abnormal
      event.stopPropagation()
      originPositionRef.deltaX = event.pageX - position.x
      originPositionRef.deltaY = event.pageY - position.y
      originPositionRef.originX = position.x
      originPositionRef.originY = position.y
      isMoving.value = true
    }

    const onMouseMove: MouseEventHandler = (event) => {
      if (props.visible && isMoving.value) {
        setPosition({
          x: event.pageX - originPositionRef.deltaX,
          y: event.pageY - originPositionRef.deltaY,
        })
      }
    }

    const onWheelMove: WheelEventHandler = (event) => {
      if (!props.visible) return
      event.preventDefault()
      const wheelDirection = event.deltaY
      lastWheelZoomDirection.value = { wheelDirection }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!props.visible || !showLeftOrRightSwitches.value) return

      event.preventDefault()
      if (event.keyCode === KeyCode.LEFT) {
        if (currentPreviewIndex.value > 0)
          setCurrent(previewUrlsKeys.value[currentPreviewIndex.value - 1])
      } else if (event.keyCode === KeyCode.RIGHT) {
        if (currentPreviewIndex.value < previewGroupCount.value - 1)
          setCurrent(previewUrlsKeys.value[currentPreviewIndex.value + 1])
      }
    }

    const onDoubleClick = () => {
      if (props.visible) {
        if (scale.value !== 1)
          scale.value = 1

        if (position.x !== initialPosition.x || position.y !== initialPosition.y)
          setPosition(initialPosition)
      }
    }

    let removeListeners = () => {}
    onMounted(() => {
      watch(
        [() => props.visible, isMoving],
        () => {
          removeListeners()
          let onTopMouseUpListener: { remove: any }
          let onTopMouseMoveListener: { remove: any }

          const onMouseUpListener = addEventListenerWrap(window, 'mouseup', onMouseUp, false)
          const onMouseMoveListener = addEventListenerWrap(window, 'mousemove', onMouseMove, false)
          const onScrollWheelListener = addEventListenerWrap(window, 'wheel', onWheelMove, {
            passive: false,
          })
          const onKeyDownListener = addEventListenerWrap(window, 'keydown', onKeyDown, false)

          try {
            // Resolve if in iframe lost event
            /* istanbul ignore next */
            if (window.top !== window.self) {
              onTopMouseUpListener = addEventListenerWrap(window.top, 'mouseup', onMouseUp, false)
              onTopMouseMoveListener = addEventListenerWrap(
                window.top,
                'mousemove',
                onMouseMove,
                false,
              )
            }
          } catch (error) {
            /* istanbul ignore next */
            warningFn(false, `[vc-image] ${error}`)
          }

          removeListeners = () => {
            onMouseUpListener.remove()
            onMouseMoveListener.remove()
            onScrollWheelListener.remove()
            onKeyDownListener.remove()

            /* istanbul ignore next */
            if (onTopMouseUpListener) onTopMouseUpListener.remove()
            /* istanbul ignore next */
            if (onTopMouseMoveListener) onTopMouseMoveListener.remove()
          }
        },
        { flush: 'post', immediate: true },
      )
      watch([lastWheelZoomDirection], () => {
        const { wheelDirection } = lastWheelZoomDirection.value
        if (wheelDirection > 0)
          onZoomOut(true)
        else if (wheelDirection < 0)
          onZoomIn(true)
      })
    })
    onUnmounted(() => {
      removeListeners()
    })

    return () => {
      const { visible, prefixCls, rootClassName } = props

      const toolsNode = tools.map(({ icon: IconType, onClick, type, disabled }) => (
        <div
          class={classNames(toolClassName, {
            [`${props.prefixCls}-operations-operation-${type}`]: true,
            [`${props.prefixCls}-operations-operation-disabled`]: disabled && disabled?.value,
          })}
          onClick={onClick}
          key={type}
        >
          {cloneVNode(IconType, { class: iconClassName })}
        </div>
      ))

      const toolbarNode = <div class={`${props.prefixCls}-operations`}>{toolsNode}</div>

      return (
        <>
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
            <div
              class={`${props.prefixCls}-img-wrapper`}
              style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              }}
            >
              <img
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
          </Dialog>
          {visible && (
            <div class={classNames(`${props.prefixCls}-operations-wrapper`, rootClassName)}>
              <button class={`${props.prefixCls}-close`} onClick={onClose}>
                {slots.closeIcon?.({ onClose }) || close}
              </button>

              {showLeftOrRightSwitches.value && (
                <>
                  <div
                    class={classNames(`${prefixCls}-switch-left`, {
                      [`${props.prefixCls}-switch-left-disabled`]: currentPreviewIndex.value === 0,
                    })}
                    onClick={onSwitchLeft}
                  >
                    {left}
                  </div>
                  <div
                    class={classNames(`${prefixCls}-switch-right`, {
                      [`${props.prefixCls}-switch-right-disabled`]:
                        currentPreviewIndex.value === previewGroupCount.value - 1,
                    })}
                    onClick={onSwitchRight}
                  >
                    {right}
                  </div>
                </>
              )}

              <div class={[`${props.prefixCls}-footer`]}>
                {showOperationsProgress.value && (
                  <div class={`${props.prefixCls}-progress`}>
                    {`${currentPreviewIndex.value + 1} / ${previewGroupCount.value}`}
                  </div>
                )}
                {slots.toolbarRender
                  ? slots.toolbarRender?.({
                    actions: {
                      onFlipY,
                      onFlipX,
                      onRotateLeft,
                      onRotateRight,
                      onZoomOut,
                      onZoomIn,
                    },
                    transform: {
                      x: position.x,
                      y: position.y,
                      scale: scale.value,
                      rotate,
                      flip,
                    },
                    ...(groupContext
                      ? { current: currentPreviewIndex.value, total: previewGroupCount.value }
                      : {}),
                  })
                  : toolbarNode}
              </div>
            </div>
          )}
        </>
      )
    }
  },
})
