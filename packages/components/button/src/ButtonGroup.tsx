import { useToken } from '@antdv/theme';
import { devWarning, flattenChildren } from '@antdv/utils';
import { computed, defineComponent, reactive } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import { GroupSizeContext } from './context';
import { buttonGroupProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AButtonGroup',
  props: buttonGroupProps(),
  setup(props, { slots }) {
    const { prefixCls, direction } = useConfigInject('btn-group', props);
    const [, , hashId] = useToken();
    GroupSizeContext.useProvide(
      reactive({
        size: computed(() => props.size),
      }),
    );
    const classes = computed(() => {
      const { size } = props;
      let sizeCls = '';
      switch (size) {
        case 'large':
          sizeCls = 'lg';
          break;
        case 'small':
          sizeCls = 'sm';
          break;
        case 'middle':
        case undefined:
          break;
        default:

          devWarning(!size, 'Button.Group', 'Invalid prop `size`.');
      }
      return {
        [`${prefixCls.value}`]: true,
        [`${prefixCls.value}-${sizeCls}`]: sizeCls,
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        [hashId.value]: true,
      };
    });
    return () => {
      return <div class={classes.value}>{flattenChildren(slots.default?.())}</div>;
    };
  },
});
