import type { CustomSlotsType } from '@antdv/types';
import { defineComponent } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import { listItemMetaProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AListItemMeta',
  props: listItemMetaProps(),
  displayName: 'AListItemMeta', // 兼容历史函数式组件
  __ANT_LIST_ITEM_META: true,
  slots: Object as CustomSlotsType<{
    avatar: any
    description: any
    title: any
    default: any
  }>,
  setup(props, { slots }) {
    const { prefixCls } = useConfigInject('list', props);
    return () => {
      const classString = `${prefixCls.value}-item-meta`;
      const title = props.title ?? slots.title?.();
      const description = props.description ?? slots.description?.();
      const avatar = props.avatar ?? slots.avatar?.();
      const content = (
        <div class={`${prefixCls.value}-item-meta-content`}>
          {title && <h4 class={`${prefixCls.value}-item-meta-title`}>{title}</h4>}
          {description && (
            <div class={`${prefixCls.value}-item-meta-description`}>{description}</div>
          )}
        </div>
      );
      return (
        <div class={classString}>
          {avatar && <div class={`${prefixCls.value}-item-meta-avatar`}>{avatar}</div>}
          {(title || description) && content}
        </div>
      );
    };
  },
});
