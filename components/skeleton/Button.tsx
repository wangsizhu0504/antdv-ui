import { computed, defineComponent } from 'vue'
import { useConfigInject } from '../hooks'
import { initDefaultProps } from '../_util/props-util'
import classNames from '../_util/classNames'
import useStyle from './style'
import Element, { skeletonElementProps } from './Element'
import type { ExtractPropTypes, PropType } from 'vue'

export const skeletonButtonProps = () => {
  return {
    ...skeletonElementProps(),
    size: String as PropType<'large' | 'small' | 'default'>,
    block: Boolean,
  }
}

export type SkeletonButtonProps = Partial<ExtractPropTypes<ReturnType<typeof skeletonButtonProps>>>

const SkeletonButton = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASkeletonButton',
  props: initDefaultProps(skeletonButtonProps(), {
    size: 'default',
  }),
  setup(props) {
    const { prefixCls } = useConfigInject('skeleton', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const cls = computed(() =>
      classNames(
        prefixCls.value,
        `${prefixCls.value}-element`,
        {
          [`${prefixCls.value}-active`]: props.active,
          [`${prefixCls.value}-block`]: props.block,
        },
        hashId.value,
      ),
    )
    return () => {
      return wrapSSR(
        <div class={cls.value}>
          <Element {...props} prefixCls={`${prefixCls.value}-button`} />
        </div>,
      )
    }
  },
})

export default SkeletonButton
