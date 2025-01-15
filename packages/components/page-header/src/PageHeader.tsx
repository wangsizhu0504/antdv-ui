import type { CustomSlotsType } from '@antdv/types';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';
import { useDestroyed } from '@antdv/hooks';
import { classNames, filterEmpty, flattenChildren, isEmptyContent } from '@antdv/utils';
import { ResizeObserver, TransButton } from '@antdv/vue-components';
import { computed, defineComponent, shallowRef } from 'vue';
import Avatar from '../../avatar';
import Breadcrumb from '../../breadcrumb';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';

import LocaleReceiver from '../../locale-provider/src/LocaleReceiver';
import Space from '../../space';
import useStyle from '../style';
import { pageHeaderProps } from './props';

// CSSINJS

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'APageHeader',
  inheritAttrs: false,
  props: pageHeaderProps(),
  // emits: ['back'],
  slots: Object as CustomSlotsType<{
    backIcon: any
    avatar: any
    breadcrumb: any
    title: any
    subTitle: any
    tags: any
    extra: any
    footer: any
    default: any
  }>,
  setup(props, { emit, slots, attrs }) {
    const { prefixCls, direction, pageHeader } = useConfigInject('page-header', props);

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls);

    const compact = shallowRef(false);
    const isDestroyed = useDestroyed();
    const onResize = ({ width }: { width: number }) => {
      if (!isDestroyed.value)
        compact.value = width < 768;
    };
    const ghost = computed(() => props.ghost ?? pageHeader?.value?.ghost ?? true);

    const getBackIcon = () => {
      return (
        props.backIcon
        ?? slots.backIcon?.()
        ?? (direction.value === 'rtl' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />)
      );
    };

    const renderBack = (backIcon: any) => {
      if (!backIcon || !props.onBack)
        return null;

      return (
        <LocaleReceiver
          componentName="PageHeader"
          children={({ back }: any) => (
            <div class={`${prefixCls.value}-back`}>
              <TransButton
                onClick={(e) => {
                  emit('back', e);
                }}
                class={`${prefixCls.value}-back-button`}
                aria-label={back}
              >
                {backIcon}
              </TransButton>
            </div>
          )}
        >
        </LocaleReceiver>
      );
    };

    const renderBreadcrumb = () => {
      return props.breadcrumb ? <Breadcrumb {...props.breadcrumb} /> : slots.breadcrumb?.();
    };

    const renderTitle = () => {
      const { avatar } = props;
      const title = props.title ?? slots.title?.();
      const subTitle = props.subTitle ?? slots.subTitle?.();
      const tags = props.tags ?? slots.tags?.();
      const extra = props.extra ?? slots.extra?.();
      const headingPrefixCls = `${prefixCls.value}-heading`;
      const hasHeading = title || subTitle || tags || extra;
      // If there is nothing, return a null
      if (!hasHeading)
        return null;

      const backIcon = getBackIcon();
      const backIconDom = renderBack(backIcon);
      const hasTitle = backIconDom || avatar || hasHeading;
      return (
        <div class={headingPrefixCls}>
          {hasTitle && (
            <div class={`${headingPrefixCls}-left`}>
              {backIconDom}
              {avatar ? <Avatar {...avatar} /> : slots.avatar?.()}
              {title && (
                <span
                  class={`${headingPrefixCls}-title`}
                  title={typeof title === 'string' ? title : undefined}
                >
                  {title}
                </span>
              )}
              {subTitle && (
                <span
                  class={`${headingPrefixCls}-sub-title`}
                  title={typeof subTitle === 'string' ? subTitle : undefined}
                >
                  {subTitle}
                </span>
              )}
              {tags && <span class={`${headingPrefixCls}-tags`}>{tags}</span>}
            </div>
          )}
          {extra && (
            <span class={`${headingPrefixCls}-extra`}>
              <Space>{extra}</Space>
            </span>
          )}
        </div>
      );
    };

    const renderFooter = () => {
      const footer = props.footer ?? filterEmpty(slots.footer?.());
      return isEmptyContent(footer)
        ? null
        : (
            <div class={`${prefixCls.value}-footer`}>{footer}</div>
          );
    };

    const renderChildren = (children: any) => {
      return <div class={`${prefixCls.value}-content`}>{children}</div>;
    };
    return () => {
      const hasBreadcrumb = props.breadcrumb?.routes || slots.breadcrumb;
      const hasFooter = props.footer || slots.footer;
      const children = flattenChildren(slots.default?.());
      const className = classNames(
        prefixCls.value,
        {
          'has-breadcrumb': hasBreadcrumb,
          'has-footer': hasFooter,
          [`${prefixCls.value}-ghost`]: ghost.value,
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
          [`${prefixCls.value}-compact`]: compact.value,
        },
        attrs.class,
        hashId.value,
      );
      return wrapSSR(
        <ResizeObserver onResize={onResize}>
          <div {...attrs} class={className}>
            {renderBreadcrumb()}
            {renderTitle()}
            {children.length ? renderChildren(children) : null}
            {renderFooter()}
          </div>
        </ResizeObserver>,
      );
    };
  },
});
