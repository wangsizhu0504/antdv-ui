import type { Key } from '@antdv/types';
import type { SlotsType } from 'vue';
import type { AnimatedConfig, EditableConfig, Tab } from './interface';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { useMergedState, useState } from '@antdv/hooks';
import { arrayType, classNames, devWarning, initDefaultProps, isMobile } from '@antdv/utils';
import { pick } from 'lodash-es';

// Accessibility https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role
import { computed, defineComponent, onMounted, watchEffect } from 'vue';

import useConfigInject from '../../config-provider/src/hooks/useConfigInject';

import useStyle from '../style';
import { tabsProps } from './props';
import { useProvideTabs } from './TabContext';
import TabNavList from './TabNavList';
import TabPanelList from './TabPanelList';

// Used for accessibility
let uuid = 0;

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'InternalTabs',
  inheritAttrs: false,
  props: {
    ...initDefaultProps(tabsProps(), {
      tabPosition: 'top',
      animated: {
        inkBar: true,
        tabPane: false,
      },
    }),
    tabs: arrayType<Tab[]>(),
  },
  slots: Object as SlotsType<{
    tabBarExtraContent?: any
    leftExtra?: any
    rightExtra?: any
    moreIcon?: any
    addIcon?: any
    removeIcon?: any
    renderTabBar?: any
    default: any
  }>,
  // emits: ['tabClick', 'tabScroll', 'change', 'update:activeKey'],
  setup(props, { attrs, slots }) {
    devWarning(
      !(props.onPrevClick !== undefined) && !(props.onNextClick !== undefined),
      'Tabs',
      '`onPrevClick / @prevClick` and `onNextClick / @nextClick` has been removed. Please use `onTabScroll / @tabScroll` instead.',
    );
    devWarning(
      !(props.tabBarExtraContent !== undefined),
      'Tabs',
      '`tabBarExtraContent` prop has been removed. Please use `rightExtra` slot instead.',
    );
    devWarning(
      !(slots.tabBarExtraContent !== undefined),
      'Tabs',
      '`tabBarExtraContent` slot is deprecated. Please use `rightExtra` slot instead.',
    );
    const { prefixCls, direction, size, rootPrefixCls, getPopupContainer } = useConfigInject(
      'tabs',
      props,
    );
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const rtl = computed(() => direction.value === 'rtl');
    const mergedAnimated = computed<AnimatedConfig>(() => {
      const { animated, tabPosition } = props;
      if (animated === false || ['left', 'right'].includes(tabPosition)) {
        return {
          inkBar: false,
          tabPane: false,
        };
      } else if (animated === true) {
        return {
          inkBar: true,
          tabPane: true,
        };
      } else {
        return {
          inkBar: true,
          tabPane: false,
          ...(typeof animated === 'object' ? animated : {}),
        };
      }
    });

    // ======================== Mobile ========================
    const [mobile, setMobile] = useState(false);
    onMounted(() => {
      // Only update on the client side
      setMobile(isMobile());
    });

    // ====================== Active Key ======================
    const [mergedActiveKey, setMergedActiveKey] = useMergedState<Key>(() => props.tabs[0]?.key, {
      value: computed(() => props.activeKey),
      defaultValue: props.defaultActiveKey,
    });
    const [activeIndex, setActiveIndex] = useState(() =>
      props.tabs.findIndex(tab => tab.key === mergedActiveKey.value),
    );

    watchEffect(() => {
      let newActiveIndex = props.tabs.findIndex(tab => tab.key === mergedActiveKey.value);
      if (newActiveIndex === -1) {
        newActiveIndex = Math.max(0, Math.min(activeIndex.value, props.tabs.length - 1));
        setMergedActiveKey(props.tabs[newActiveIndex]?.key);
      }
      setActiveIndex(newActiveIndex);
    });

    // ===================== Accessibility ====================
    const [mergedId, setMergedId] = useMergedState(null, {
      value: computed(() => props.id),
    });

    const mergedTabPosition = computed(() => {
      if (mobile.value && !['left', 'right'].includes(props.tabPosition))
        return 'top';
      else
        return props.tabPosition;
    });

    onMounted(() => {
      if (!props.id) {
        setMergedId(`rc-tabs-${process.env.NODE_ENV === 'test' ? 'test' : uuid}`);
        uuid += 1;
      }
    });

    // ======================== Events ========================
    const onInternalTabClick = (key: Key, e: MouseEvent | KeyboardEvent) => {
      props.onTabClick?.(key, e);
      const isActiveChanged = key !== mergedActiveKey.value;
      setMergedActiveKey(key);
      if (isActiveChanged)
        props.onChange?.(key);
    };

    useProvideTabs({
      tabs: computed(() => props.tabs),
      prefixCls,
    });

    return () => {
      const {
        id,
        type,
        tabBarGutter,
        tabBarStyle,
        locale,
        destroyInactiveTabPane,
        renderTabBar = slots.renderTabBar,
        onTabScroll,
        hideAdd,
        centered,
      } = props;
      // ======================== Render ========================
      const sharedProps = {
        id: mergedId.value,
        activeKey: mergedActiveKey.value,
        animated: mergedAnimated.value,
        tabPosition: mergedTabPosition.value,
        rtl: rtl.value,
        mobile: mobile.value,
      };

      let editable: EditableConfig | undefined;
      if (type === 'editable-card') {
        editable = {
          onEdit: (editType, { key, event }) => {
            props.onEdit?.(editType === 'add' ? event : key!, editType);
          },
          removeIcon: () => <CloseOutlined />,
          addIcon: slots.addIcon ? slots.addIcon : () => <PlusOutlined />,
          showAdd: hideAdd !== true,
        };
      }

      let tabNavBar;

      const tabNavBarProps = {
        ...sharedProps,
        moreTransitionName: `${rootPrefixCls.value}-slide-up`,
        editable,
        locale,
        tabBarGutter,
        onTabClick: onInternalTabClick,
        onTabScroll,
        style: tabBarStyle,
        getPopupContainer: getPopupContainer.value,
        popupClassName: classNames(props.popupClassName, hashId.value),
      };

      if (renderTabBar) {
        tabNavBar = renderTabBar({ ...tabNavBarProps, DefaultTabBar: TabNavList });
      } else {
        tabNavBar = (
          <TabNavList
            {...tabNavBarProps}
            v-slots={pick(slots, ['moreIcon', 'leftExtra', 'rightExtra', 'tabBarExtraContent'])}
          />
        );
      }
      const pre = prefixCls.value;

      return wrapSSR(
        <div
          {...attrs}
          id={id}
          class={classNames(
            pre,
            `${pre}-${mergedTabPosition.value}`,
            {
              [hashId.value]: true,
              [`${pre}-${size.value}`]: size.value,
              [`${pre}-card`]: ['card', 'editable-card'].includes(type as string),
              [`${pre}-editable-card`]: type === 'editable-card',
              [`${pre}-centered`]: centered,
              [`${pre}-mobile`]: mobile.value,
              [`${pre}-editable`]: type === 'editable-card',
              [`${pre}-rtl`]: rtl.value,
            },
            attrs.class,
          )}
        >
          {tabNavBar}
          <TabPanelList
            destroyInactiveTabPane={destroyInactiveTabPane}
            {...sharedProps}
            animated={mergedAnimated.value}
          />
        </div>,
      );
    };
  },
});
