import { classNames, devWarning, initDefaultProps } from '@antdv/utils';
import { computed, defineComponent, ref } from 'vue';
import Badge from '../../badge';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import Tooltip from '../../tooltip';

import useStyle from '../style';
import { floatButtonPrefixCls } from './constants';
import { useInjectFloatButtonGroupContext } from './context';
import Content from './FloatButtonContent';
import { floatButtonProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AFloatButton',
  inheritAttrs: false,
  props: initDefaultProps(floatButtonProps(), { type: 'default', shape: 'circle' }),
  setup(props, { attrs, slots }) {
    const { prefixCls, direction } = useConfigInject(floatButtonPrefixCls, props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const { shape: groupShape } = useInjectFloatButtonGroupContext();

    const floatButtonRef = ref<HTMLAnchorElement | HTMLButtonElement>(null);

    const mergeShape = computed(() => {
      return groupShape?.value || props.shape;
    });

    return () => {
      const {
        type = 'default',
        shape = 'circle',
        description = slots.description?.(),
        tooltip,
        badge = {},
        ...restProps
      } = props;

      const classString = classNames(
        prefixCls.value,
        `${prefixCls.value}-${type}`,
        `${prefixCls.value}-${mergeShape.value}`,
        {
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        },
        attrs.class,
        hashId.value,
      );

      const buttonNode = (
        <Tooltip
          placement="left"
          v-slots={{
            title:
              slots.tooltip || tooltip
                ? () => (slots.tooltip && slots.tooltip()) || tooltip
                : undefined,
            default: () => (
              <Badge {...badge}>
                <div class={`${prefixCls.value}-body`}>
                  <Content
                    prefixCls={prefixCls.value}
                    v-slots={{
                      icon: slots.icon,
                      description: () => description,
                    }}
                  >
                  </Content>
                </div>
              </Badge>
            ),
          }}
        >
        </Tooltip>
      );

      if (process.env.NODE_ENV !== 'production') {
        devWarning(
          !(shape === 'circle' && description),
          'FloatButton',
          'supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.',
        );
      }

      return wrapSSR(
        props.href
          ? (
              <a ref={floatButtonRef} {...attrs} {...(restProps as any)} class={classString}>
                {buttonNode}
              </a>
            )
          : (
              <button ref={floatButtonRef} {...attrs} {...restProps} class={classString} type="button">
                {buttonNode}
              </button>
            ),
      );
    };
  },
});
