import type { VueNode } from '@antdv/types';
import type { EmptyProps } from './props';

import { classNames, filterEmpty } from '@antdv/utils';
import { computed, defineComponent, h, inject } from 'vue';

import { configProviderKey, defaultConfigProvider } from '../../config-provider/src/context';

import LocaleReceiver from '../../locale-provider/src/LocaleReceiver';
import useStyle from '../style';
import DefaultEmptyImg from './DefaultEmptyImg';
import { emptyProps } from './props';
import SimpleEmptyImg from './SimpleEmptyImg';

interface Locale {
  description?: string
}

const Empty = defineComponent({
  name: 'AEmpty',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
  props: emptyProps(),
  setup(props, { slots = {}, attrs }) {
    const configProvider = inject(configProviderKey, defaultConfigProvider);
    const prefixClsRef = computed(() => configProvider.getPrefixCls('empty', props.prefixCls));
    const direction = computed(() => configProvider.direction?.value);
    const [wrapSSR, hashId] = useStyle(prefixClsRef);

    return () => {
      const prefixCls = prefixClsRef.value;
      const {
        image: mergedImage = slots.image?.() || h(DefaultEmptyImg),
        description = slots.description?.() || undefined,
        imageStyle,
        class: className = '',
        ...restProps
      } = { ...props, ...attrs };

      const image
        = typeof mergedImage === 'function' ? (mergedImage as () => VueNode)() : mergedImage;
      const isNormal
        = typeof image === 'object' && 'type' in image && (image.type as any).PRESENTED_IMAGE_SIMPLE;

      return wrapSSR(
        <LocaleReceiver
          componentName="Empty"
          children={(locale: Locale) => {
            const des = typeof description !== 'undefined' ? description : locale.description;
            const alt = typeof des === 'string' ? des : 'empty';
            let imageNode: EmptyProps['image'] = null;

            if (typeof image === 'string')
              imageNode = <img alt={alt} src={image} />;
            else
              imageNode = image;

            return (
              <div
                class={classNames(prefixCls, className, hashId.value, {
                  [`${prefixCls}-normal`]: isNormal,
                  [`${prefixCls}-rtl`]: direction.value === 'rtl',
                })}
                {...restProps}
              >
                <div class={`${prefixCls}-image`} style={imageStyle}>
                  {imageNode}
                </div>
                {des && <p class={`${prefixCls}-description`}>{des}</p>}
                {slots.default && (
                  <div class={`${prefixCls}-footer`}>{filterEmpty(slots.default())}</div>
                )}
              </div>
            );
          }}
        />,
      );
    };
  },
});
Empty.PRESENTED_IMAGE_DEFAULT = () => h(DefaultEmptyImg);
Empty.PRESENTED_IMAGE_SIMPLE = () => h(SimpleEmptyImg);

export default Empty;
