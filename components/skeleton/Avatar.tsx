import { computed, defineComponent } from 'vue'
import { useConfigInject } from '../hooks'
import initDefaultProps from '../_util/props-util/initDefaultProps'
import classNames from '../_util/classNames'
import useStyle from './style'
import Element, { skeletonElementProps } from './Element'
import type { ExtractPropTypes, PropType } from 'vue'

export const avatarProps = () => {
  return {
    ...skeletonElementProps(),
    shape: String as PropType<'circle' | 'square'>,
  }
}

export type SkeletonAvatarProps = Partial<ExtractPropTypes<ReturnType<typeof avatarProps>>>

const SkeletonAvatar = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASkeletonAvatar',
  props: initDefaultProps(avatarProps(), {
    size: 'default',
    shape: 'circle',
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
        },
        hashId.value,
      ),
    )
    return () => {
      return wrapSSR(
        <div class={cls.value}>
          <Element {...props} prefixCls={`${prefixCls.value}-avatar`} />
        </div>,
      )
    }
  },
})

export default SkeletonAvatar
