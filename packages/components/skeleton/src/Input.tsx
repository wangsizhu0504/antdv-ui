import type { PropType } from 'vue';
import { classNames, omit } from '@antdv/utils';
import { computed, defineComponent } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import useStyle from '../style';
import Element from './Element';
import { skeletonElementProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASkeletonInput',
  props: {
    ...omit(skeletonElementProps(), ['shape']),
    size: String as PropType<'large' | 'small' | 'default'>,
    block: Boolean,
  },
  setup(props) {
    const { prefixCls } = useConfigInject('skeleton', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
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
    );
    return () => {
      return wrapSSR(
        <div class={cls.value}>
          <Element {...props} prefixCls={`${prefixCls.value}-input`} />
        </div>,
      );
    };
  },
});
