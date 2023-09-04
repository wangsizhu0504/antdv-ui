import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch,
} from 'vue'
import classNames from '../_util/classNames'
import { findDOMNode } from '../_util/props-util'
import isVisible from '../vc-util/Dom/isVisible'
import { useConfigInject } from '../hooks'
import useStyle from './style'
import useWave from './useWave'

export interface WaveProps {
  disabled?: boolean
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Wave',
  props: {
    disabled: Boolean,
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance()
    const { prefixCls } = useConfigInject('wave', props)

    // ============================== Style ===============================
    const [, hashId] = useStyle(prefixCls)

    // =============================== Wave ===============================
    const showWave = useWave(
      instance,
      computed(() => classNames(prefixCls.value, hashId.value)),
    )
    let onClick: (e: MouseEvent) => void
    const clear = () => {
      const node = findDOMNode(instance)
      node.removeEventListener('click', onClick, true)
    }

    onMounted(() => {
      watch(
        () => props.disabled,
        () => {
          clear()
          nextTick(() => {
            const node: HTMLElement = findDOMNode(instance)
            node?.removeEventListener('click', onClick, true)

            if (!node || node.nodeType !== 1 || props.disabled)
              return

            // Click handler
            onClick = (e: MouseEvent) => {
              // Fix radio button click twice
              if (
                (e.target as HTMLElement).tagName === 'INPUT'
                || !isVisible(e.target as HTMLElement)
                // No need wave
                || !node.getAttribute
                || node.getAttribute('disabled')
                || (node as HTMLInputElement).disabled
                || node.className.includes('disabled')
                || node.className.includes('-leave')
              )
                return

              showWave()
            }

            // Bind events
            node.addEventListener('click', onClick, true)
          })
        },
        {
          immediate: true,
          flush: 'post',
        },
      )
    })
    onBeforeUnmount(() => {
      clear()
    })

    return () => {
      // ============================== Render ==============================
      const children = slots.default?.()[0]
      return children
    }
  },
})
