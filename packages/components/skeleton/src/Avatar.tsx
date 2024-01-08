import { computed, defineComponent } from 'vue'

import { classNames, initDefaultProps } from '@antdv/utils'
import useConfigInject from '../../config-provider/src/hooks/useConfigInject'
import useStyle from '../style'
import Element from './Element'
import { skeletonAvatarProps } from './props'

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASkeletonAvatar',
  props: initDefaultProps(skeletonAvatarProps(), {
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
