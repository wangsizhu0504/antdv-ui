import { Transition } from 'vue'
import { getMotion } from '../utils/motionUtil'
import type { AnimationType, TransitionNameType } from '../interface'

export interface MaskProps {
  prefixCls: string
  visible?: boolean
  zIndex?: number
  mask?: boolean
  maskAnimation?: AnimationType
  maskTransitionName?: TransitionNameType
}

export default function Mask(props: MaskProps) {
  const { prefixCls, visible, zIndex, mask, maskAnimation, maskTransitionName } = props

  if (!mask)
    return null

  let motion = {}

  if (maskTransitionName || maskAnimation) {
    motion = getMotion({
      prefixCls,
      transitionName: maskTransitionName,
      animation: maskAnimation,
    })
  }

  return (
    <Transition appear {...motion}>
      <div v-if={visible} style={{ zIndex }} class={`${prefixCls}-mask`} />
    </Transition>
  )
}
Mask.displayName = 'Mask'
