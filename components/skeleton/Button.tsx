import { computed, defineComponent } from 'vue'
import { useConfigInject } from '../hooks'
import { initDefaultProps } from '../_util/props-util'
import classNames from '../_util/classNames'
import useStyle from './style'
import Element from './Element'
import { skeletonButtonProps } from './props'

export default defineComponent({
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
