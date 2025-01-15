import type { CustomSlotsType, Key } from '@antdv/types';
import type { CSSProperties } from 'vue';
import type { CollapsibleType } from './interface';
import type { CollapsePanelProps } from './props';
import { RightOutlined } from '@ant-design/icons-vue';
import {
  classNames,
  cloneElement,
  firstNotUndefined,
  flattenChildren,
  getDataAndAriaProps,
  initDefaultProps,
  isEmptyElement,
  isValidElement,
} from '@antdv/utils';
import { collapseMotion } from '@antdv/vue-components';
import { computed, defineComponent, ref, watch } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';

import useStyle from '../style';
import { collapseProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ACollapse',
  inheritAttrs: false,
  props: initDefaultProps(collapseProps(), {
    accordion: false,
    destroyInactivePanel: false,
    bordered: true,
    expandIconPosition: 'start',
  }),
  slots: Object as CustomSlotsType<{
    default?: any
    expandIcon?: CollapsePanelProps
  }>,
  setup(props, { attrs, slots, emit }) {
    function getActiveKeysArray(activeKey: Key | Key[]) {
      let currentActiveKey = activeKey;
      if (!Array.isArray(currentActiveKey)) {
        const activeKeyType = typeof currentActiveKey;
        currentActiveKey
          = activeKeyType === 'number' || activeKeyType === 'string' ? [currentActiveKey] : [];
      }
      return currentActiveKey.map(key => String(key));
    }

    const stateActiveKey = ref<Key[]>(
      getActiveKeysArray(firstNotUndefined([props.activeKey, props.defaultActiveKey])),
    );

    watch(
      () => props.activeKey,
      () => {
        stateActiveKey.value = getActiveKeysArray(props.activeKey);
      },
      { deep: true },
    );
    const { prefixCls, direction, rootPrefixCls } = useConfigInject('collapse', props);

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls);

    const iconPosition = computed(() => {
      const { expandIconPosition } = props;
      if (expandIconPosition !== undefined)
        return expandIconPosition;

      return direction.value === 'rtl' ? 'end' : 'start';
    });

    const setActiveKey = (activeKey: Key[]) => {
      if (props.activeKey === undefined)
        stateActiveKey.value = activeKey;

      const newKey = props.accordion ? activeKey[0] : activeKey;
      emit('update:activeKey', newKey);
      emit('change', newKey);
    };

    const onClickItem = (key: Key) => {
      let activeKey = stateActiveKey.value;
      if (props.accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [...activeKey];
        const index = activeKey.indexOf(key);
        const isActive = index > -1;
        if (isActive) {
          // remove active state
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }
      setActiveKey(activeKey);
    };
    const renderExpandIcon = (panelProps: CollapsePanelProps) => {
      const { expandIcon = slots.expandIcon } = props;
      const icon = expandIcon
        ? (
            expandIcon(panelProps)
          )
        : (
            <RightOutlined rotate={panelProps.isActive ? 90 : undefined} />
          );

      return (
        <div
          class={[`${prefixCls.value}-expand-icon`, hashId.value]}
          onClick={() =>
            ['header', 'icon'].includes(props.collapsible) && onClickItem(panelProps.panelKey)}
        >
          {isValidElement(Array.isArray(expandIcon) ? icon[0] : icon)
            ? cloneElement(
                icon,
                {
                  class: `${prefixCls.value}-arrow`,
                },
                false,
              )
            : icon}
        </div>
      );
    };

    const getNewChild = (child, index) => {
      if (isEmptyElement(child)) return;
      const activeKey = stateActiveKey.value;
      const { accordion, destroyInactivePanel, collapsible, openAnimation } = props;
      const animation = openAnimation || collapseMotion(`${rootPrefixCls.value}-motion-collapse`);

      // If there is no key provide, use the panel order as default key
      const key = String(child.key ?? index);
      const {
        header = child.children?.header?.(),
        headerClass,
        collapsible: childCollapsible,
        disabled,
      } = child.props || {};
      let isActive = false;

      if (accordion)
        isActive = activeKey[0] === key;
      else
        isActive = activeKey.includes(key);

      let mergeCollapsible: CollapsibleType = childCollapsible ?? collapsible;
      // legacy 2.x
      if (disabled || disabled === '')
        mergeCollapsible = 'disabled';

      const newProps = {
        key,
        panelKey: key,
        header,
        headerClass,
        isActive,
        prefixCls: prefixCls.value,
        destroyInactivePanel,
        openAnimation: animation,
        accordion,
        onItemClick: mergeCollapsible === 'disabled' ? null : onClickItem,
        expandIcon: renderExpandIcon,
        collapsible: mergeCollapsible,
      };

      return cloneElement(child, newProps);
    };

    const getItems = () => {
      return flattenChildren(slots.default?.()).map(getNewChild);
    };

    return () => {
      const { accordion, bordered, ghost } = props;
      const collapseClassName = classNames(
        prefixCls.value,
        {
          [`${prefixCls.value}-borderless`]: !bordered,
          [`${prefixCls.value}-icon-position-${iconPosition.value}`]: true,
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
          [`${prefixCls.value}-ghost`]: !!ghost,
          [attrs.class as string]: !!attrs.class,
        },
        hashId.value,
      );
      return wrapSSR(
        <div
          class={collapseClassName}
          {...getDataAndAriaProps(attrs)}
          style={attrs.style as CSSProperties}
          role={accordion ? 'tablist' : null}
        >
          {getItems()}
        </div>,
      );
    };
  },
});
