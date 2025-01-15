import type { GeneratorArgument } from './interface';
import { computed, createVNode, defineComponent, provide, ref } from 'vue';

import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import useStyle from '../style';
import { SiderHookProviderKey } from './injectionKey';
import { layoutProps } from './props';

function generator({ suffixCls, tagName, name }: GeneratorArgument) {
  return (BasicComponent: typeof BasicLayout) => {
    const Adapter = defineComponent({
      compatConfig: { MODE: 3 },
      name,
      props: layoutProps(),
      setup(props, { slots }) {
        const { prefixCls } = useConfigInject(suffixCls, props);
        return () => {
          const basicComponentProps = {
            ...props,
            prefixCls: prefixCls.value,
            tagName,
          };
          return <BasicComponent {...basicComponentProps} v-slots={slots}></BasicComponent>;
        };
      },
    });
    return Adapter;
  };
}

const Basic = defineComponent({
  compatConfig: { MODE: 3 },
  props: layoutProps(),
  setup(props, { slots }) {
    return () => createVNode(props.tagName, { class: props.prefixCls }, slots);
  },
});

const BasicLayout = defineComponent({
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
  props: layoutProps(),
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const siders = ref<string[]>([]);
    const siderHookProvider = {
      addSider: (id: string) => {
        siders.value = [...siders.value, id];
      },
      removeSider: (id: string) => {
        siders.value = siders.value.filter(currentId => currentId !== id);
      },
    };

    provide(SiderHookProviderKey, siderHookProvider);
    const divCls = computed(() => {
      const { hasSider } = props;
      return {
        [hashId.value]: true,
        [`${props.prefixCls}`]: true,
        [`${props.prefixCls}-has-sider`]:
          typeof hasSider === 'boolean' ? hasSider : siders.value.length > 0,
        [`${props.prefixCls}-rtl`]: direction.value === 'rtl',
      };
    });
    return () => {
      const { tagName } = props;
      return wrapSSR(createVNode(tagName, { ...attrs, class: [divCls.value, attrs.class] }, slots));
    };
  },
});

const Layout = generator({
  suffixCls: 'layout',
  tagName: 'section',
  name: 'ALayout',
})(BasicLayout);

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  name: 'ALayoutHeader',
})(Basic);

const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  name: 'ALayoutFooter',
})(Basic);

const Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  name: 'ALayoutContent',
})(Basic);

export { Content, Footer, Header, Layout };
