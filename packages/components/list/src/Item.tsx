import type { CustomSlotsType } from '@antdv/types';
import { classNames, cloneElement, flattenChildren, isEmptyElement, isStringElement } from '@antdv/utils';
import { defineComponent, inject, ref } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import { Col } from '../../grid';
import { ListContextKey } from './contextKey';
import ItemMeta from './ItemMeta';
import { listItemProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AListItem',
  inheritAttrs: false,
  Meta: ItemMeta,
  props: listItemProps(),
  slots: Object as CustomSlotsType<{
    actions: any
    extra: any
    default: any
  }>,
  setup(props, { slots, attrs }) {
    const { itemLayout, grid } = inject(ListContextKey, {
      grid: ref(),
      itemLayout: ref(),
    });
    const { prefixCls } = useConfigInject('list', props);

    const isItemContainsTextNodeAndNotSingular = () => {
      const children = slots.default?.() || [];
      let result;
      children.forEach((element) => {
        if (isStringElement(element) && !isEmptyElement(element))
          result = true;
      });
      return result && children.length > 1;
    };

    const isFlexMode = () => {
      const extra = props.extra ?? slots.extra?.();
      if (itemLayout.value === 'vertical')
        return !!extra;

      return !isItemContainsTextNodeAndNotSingular();
    };

    return () => {
      const { class: className, ...restAttrs } = attrs;
      const pre = prefixCls.value;
      const extra = props.extra ?? slots.extra?.();
      const children = slots.default?.();
      let actions = props.actions ?? flattenChildren(slots.actions?.());
      actions = actions && !Array.isArray(actions) ? [actions] : actions;
      const actionsContent = actions && actions.length > 0 && (
        <ul class={`${pre}-item-action`} key="actions">
          {actions.map((action, i) => {
            return (
              <li key={`${pre}-item-action-${i}`}>
                {action}
                {i !== actions.length - 1 && <em class={`${pre}-item-action-split`} />}
              </li>
            );
          })}
        </ul>
      );
      const Element = grid.value ? 'div' : 'li';
      const itemChildren = (
        <Element
          {...(restAttrs as any)} // `li` element `onCopy` prop args is not same as `div`
          class={classNames(
            `${pre}-item`,
            {
              [`${pre}-item-no-flex`]: !isFlexMode(),
            },
            className,
          )}
        >
          {itemLayout.value === 'vertical' && extra
            ? [
                <div class={`${pre}-item-main`} key="content">
                  {children}
                  {actionsContent}
                </div>,
                <div class={`${pre}-item-extra`} key="extra">
                  {extra}
                </div>,
              ]
            : [children, actionsContent, cloneElement(extra, { key: 'extra' })]}
        </Element>
      );
      return grid.value
        ? (
            <Col flex={1} style={props.colStyle}>
              {itemChildren}
            </Col>
          )
        : itemChildren;
    };
  },
});
