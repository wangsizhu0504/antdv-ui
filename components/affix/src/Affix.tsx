import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  shallowRef,
  watch,
} from 'vue'
import { omit } from 'lodash-es'
import ResizeObserver from '../../_internal/resize-observer'

import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import { throttleByAnimationFrame } from '../../_utils/throttleByAnimationFrame'
import { classNames } from '../../_utils/dom'
import useStyle from '../style'
import {
  addObserveTarget,
  getFixedBottom,
  getFixedTop,
  getTargetRect,
  removeObserveTarget,
} from './utils'
import { affixProps } from './props'
import { AffixStatus } from './types'
import type { AffixState } from './types'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AAffix',
  inheritAttrs: false,
  props: affixProps(),
  setup(props, { slots, emit, expose, attrs }) {
    const placeholderNode = shallowRef()
    const fixedNode = shallowRef()
    const state = reactive({
      affixStyle: undefined,
      placeholderStyle: undefined,
      status: AffixStatus.None,
      lastAffix: false,
      prevTarget: null,
      timeout: null,
    })
    const currentInstance = getCurrentInstance()

    const offsetTop = computed(() => {
      return props.offsetBottom === undefined && props.offsetTop === undefined
        ? 0
        : props.offsetTop
    })
    const offsetBottom = computed(() => props.offsetBottom)
    const measure = () => {
      const { status, lastAffix } = state
      const { target } = props
      if (status !== AffixStatus.Prepare || !fixedNode.value || !placeholderNode.value || !target)
        return

      const targetNode = target()
      if (!targetNode)
        return

      const newState = {
        status: AffixStatus.None,
      } as AffixState
      const placeholderRect = getTargetRect(placeholderNode.value as HTMLElement)

      if (
        placeholderRect.top === 0
        && placeholderRect.left === 0
        && placeholderRect.width === 0
        && placeholderRect.height === 0
      )
        return

      const targetRect = getTargetRect(targetNode)
      const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop.value)
      const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom.value)
      if (
        placeholderRect.top === 0
        && placeholderRect.left === 0
        && placeholderRect.width === 0
        && placeholderRect.height === 0
      )
        return

      if (fixedTop !== undefined) {
        const width = `${placeholderRect.width}px`
        const height = `${placeholderRect.height}px`

        newState.affixStyle = {
          position: 'fixed',
          top: fixedTop,
          width,
          height,
        }
        newState.placeholderStyle = {
          width,
          height,
        }
      } else if (fixedBottom !== undefined) {
        const width = `${placeholderRect.width}px`
        const height = `${placeholderRect.height}px`

        newState.affixStyle = {
          position: 'fixed',
          bottom: fixedBottom,
          width,
          height,
        }
        newState.placeholderStyle = {
          width,
          height,
        }
      }

      newState.lastAffix = !!newState.affixStyle
      if (lastAffix !== newState.lastAffix)
        emit('change', newState.lastAffix)

      // update state
      Object.assign(state, newState)
    }
    const prepareMeasure = () => {
      Object.assign(state, {
        status: AffixStatus.Prepare,
        affixStyle: undefined,
        placeholderStyle: undefined,
      })
      currentInstance.update()
      // Test if `updatePosition` called
      if (process.env.NODE_ENV === 'test')
        emit('testUpdatePosition')
    }

    const updatePosition = throttleByAnimationFrame(() => {
      prepareMeasure()
    })
    const lazyUpdatePosition = throttleByAnimationFrame(() => {
      const { target } = props
      const { affixStyle } = state

      // Check position change before measure to make Safari smooth
      if (target && affixStyle) {
        const targetNode = target()
        if (targetNode && placeholderNode.value) {
          const targetRect = getTargetRect(targetNode)
          const placeholderRect = getTargetRect(placeholderNode.value as HTMLElement)
          const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop.value)
          const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom.value)
          if (
            (fixedTop !== undefined && affixStyle.top === fixedTop)
            || (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
          )
            return
        }
      }
      // Directly call prepare measure since it's already throttled.
      prepareMeasure()
    })

    expose({
      updatePosition,
      lazyUpdatePosition,
    })
    watch(
      () => props.target,
      (val) => {
        const newTarget = val?.() || null
        if (state.prevTarget !== newTarget) {
          removeObserveTarget(currentInstance)
          if (newTarget) {
            addObserveTarget(newTarget, currentInstance)
            // Mock Event object.
            updatePosition()
          }
          state.prevTarget = newTarget
        }
      },
    )
    watch(() => [props.offsetTop, props.offsetBottom], updatePosition)
    onMounted(() => {
      const { target } = props
      if (target) {
        // [Legacy] Wait for parent component ref has its value.
        // We should use target as directly element instead of function which makes element check hard.
        state.timeout = setTimeout(() => {
          addObserveTarget(target(), currentInstance)
          // Mock Event object.
          updatePosition()
        })
      }
    })
    onUpdated(() => {
      measure()
    })
    onUnmounted(() => {
      clearTimeout(state.timeout)
      removeObserveTarget(currentInstance);
      (updatePosition as any).cancel();
      // https://github.com/ant-design/ant-design/issues/22683
      (lazyUpdatePosition as any).cancel()
    })

    const { prefixCls } = useConfigInject('affix', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    return () => {
      const { affixStyle, placeholderStyle } = state
      const className = classNames({
        [prefixCls.value]: affixStyle,
        [hashId.value]: true,
      })
      const restProps = omit(props, [
        'prefixCls',
        'offsetTop',
        'offsetBottom',
        'target',
        'onChange',
        'onTestUpdatePosition',
      ])
      return wrapSSR(
        <ResizeObserver onResize={updatePosition}>
          <div {...restProps} {...attrs} ref={placeholderNode}>
            {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
            <div class={className} ref={fixedNode} style={affixStyle}>
              {slots.default?.()}
            </div>
          </div>
        </ResizeObserver>,
      )
    }
  },
})
