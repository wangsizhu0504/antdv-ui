import {
  computed,
  defineComponent,
  getCurrentInstance,
  onUnmounted,
  shallowRef,
  watchEffect,
} from 'vue'
import { addEventListenerWrap } from '../../../_utils/dom'
import { wrapperRaf } from '../../../_utils/vue'
import { warning } from '../../../_utils/log'
import { supportsPassive } from '../../../_utils/supportsPassive'
import { useInjectTableContext } from '../../../table/src/context'
import type { EventHandler } from '../../../_utils/types'
import type { ColumnType } from '../interface'
import type { PropType } from 'vue'

const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup',
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend',
  },
}
type HandleEvent = MouseEvent & TouchEvent

const defaultMinWidth = 50
export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'DragHandle',
  props: {
    prefixCls: String,
    width: {
      type: Number,
      required: true,
    },
    minWidth: {
      type: Number,
      default: defaultMinWidth,
    },
    maxWidth: {
      type: Number,
      default: Number.POSITIVE_INFINITY,
    },
    column: {
      type: Object as PropType<ColumnType<any>>,
      default: undefined as ColumnType<any>,
    },
  },
  setup(props) {
    let startX = 0
    let moveEvent = { remove: () => {} }
    let stopEvent = { remove: () => {} }
    const removeEvents = () => {
      moveEvent.remove()
      stopEvent.remove()
    }
    onUnmounted(() => {
      removeEvents()
    })
    watchEffect(() => {
      warning(!Number.isNaN(props.width), 'Table', 'width must be a number when use resizable')
    })

    const { onResizeColumn } = useInjectTableContext()
    const minWidth = computed(() => {
      return (typeof props.minWidth === 'number' && !Number.isNaN(props.minWidth))
        ? props.minWidth
        : defaultMinWidth
    })
    const maxWidth = computed(() => {
      return (typeof props.maxWidth === 'number' && !Number.isNaN(props.maxWidth))
        ? props.maxWidth
        : Number.POSITIVE_INFINITY
    })
    const instance = getCurrentInstance()
    let baseWidth = 0
    const dragging = shallowRef(false)
    let rafId: number
    const updateWidth = (e: HandleEvent) => {
      let pageX = 0
      if (e.touches) {
        if (e.touches.length) {
          // touchmove
          pageX = e.touches[0].pageX
        } else {
          // touchend
          pageX = e.changedTouches[0].pageX
        }
      } else {
        pageX = e.pageX
      }
      const tmpDeltaX = startX - pageX
      let w = Math.max(baseWidth - tmpDeltaX, minWidth.value)
      w = Math.min(w, maxWidth.value)
      wrapperRaf.cancel(rafId)
      rafId = wrapperRaf(() => {
        onResizeColumn(w, props.column.__originColumn__)
      })
    }
    const handleMove = (e: HandleEvent) => {
      updateWidth(e)
    }
    const handleStop = (e: HandleEvent) => {
      dragging.value = false
      updateWidth(e)
      removeEvents()
    }
    const handleStart = (e: HandleEvent, eventsFor: any) => {
      dragging.value = true
      removeEvents()
      baseWidth = instance.vnode.el.parentNode.getBoundingClientRect().width
      if (e instanceof MouseEvent && e.which !== 1)
        return

      if (e.stopPropagation) e.stopPropagation()
      startX = e.touches ? e.touches[0].pageX : e.pageX
      moveEvent = addEventListenerWrap(document.documentElement, eventsFor.move, handleMove)
      stopEvent = addEventListenerWrap(document.documentElement, eventsFor.stop, handleStop)
    }
    const handleDown: EventHandler = (e: HandleEvent) => {
      e.stopPropagation()
      e.preventDefault()
      handleStart(e, events.mouse)
    }
    const handleTouchDown: EventHandler = (e: HandleEvent) => {
      e.stopPropagation()
      e.preventDefault()
      handleStart(e, events.touch)
    }

    const handleClick: EventHandler = (e: HandleEvent) => {
      e.stopPropagation()
      e.preventDefault()
    }

    return () => {
      const { prefixCls } = props
      const touchEvents = {
        [supportsPassive ? 'onTouchstartPassive' : 'onTouchstart']: e => handleTouchDown(e),
      }
      return (
        <div
          class={`${prefixCls}-resize-handle ${dragging.value ? 'dragging' : ''}`}
          onMousedown={handleDown}
          {...touchEvents}
          onClick={handleClick}
        >
          <div class={`${prefixCls}-resize-handle-line`}></div>
        </div>
      )
    }
  },
})
