import type { CSSProperties, SlotsType } from 'vue';
import type { TooltipProps } from './props';
import {
  classNames,
  cloneElement,
  devWarning,
  filterEmpty,
  firstNotUndefined,
  getPlacements,
  getStyle,
  initDefaultProps,
  isFragment,
  isValidElement,
  raf,
} from '@antdv/utils';
import { getTransitionName } from '@antdv/vue-components/transition';
import { VcTooltip } from '@antdv/vue-components/vc-tooltip';
import { computed, defineComponent, ref, watch } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import useStyle from '../style';
import { tooltipProps } from './props';
import { parseColor } from './util';

// https://github.com/react-component/tooltip
// https://github.com/yiminghe/dom-align

function splitObject<T extends CSSProperties>(obj: T, keys: Array<keyof T>): Record<'picked' | 'omitted', T> {
  const picked: T = {} as T;
  const omitted: T = { ...obj };
  keys.forEach((key) => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return { picked, omitted };
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ATooltip',
  inheritAttrs: false,
  props: initDefaultProps(tooltipProps(), {
    trigger: 'hover',
    align: {},
    placement: 'top',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true,
  }),
  slots: Object as SlotsType<{
    title?: any
    default?: any
  }>,
  // emits: ['update:visible', 'visibleChange'],
  setup(props, { slots, emit, attrs, expose }) {
    if (process.env.NODE_ENV !== 'production') {
      [
        ['visible', 'open'],
        ['onVisibleChange', 'onOpenChange'],
      ].forEach(([deprecatedName, newName]) => {
        devWarning(
          props[deprecatedName] === undefined,
          'Tooltip',
          `\`${deprecatedName}\` is deprecated, please use \`${newName}\` instead.`,
        );
      });
    }

    const { prefixCls, getPopupContainer, direction, rootPrefixCls } = useConfigInject(
      'tooltip',
      props,
    );
    const mergedOpen = computed(() => props.open ?? props.visible);
    const innerOpen = ref(firstNotUndefined([props.open, props.visible]));

    const tooltip = ref();

    let rafId: any;
    watch(mergedOpen, (val) => {
      raf.cancel(rafId);
      rafId = raf(() => {
        innerOpen.value = !!val;
      });
    });
    const isNoTitle = () => {
      const title = props.title ?? slots.title;
      return !title && title !== 0;
    };

    const handleVisibleChange = (val: boolean) => {
      const noTitle = isNoTitle();
      if (mergedOpen.value === undefined)
        innerOpen.value = noTitle ? false : val;

      if (!noTitle) {
        emit('update:visible', val);
        emit('visibleChange', val);
        emit('update:open', val);
        emit('openChange', val);
      }
    };

    const getPopupDomNode = () => {
      return tooltip.value.getPopupDomNode();
    };

    expose({
      getPopupDomNode,
      open: innerOpen,
      forcePopupAlign: () => tooltip.value?.forcePopupAlign(),
    });

    const tooltipPlacements = computed(() => {
      const { builtinPlacements, autoAdjustOverflow, arrow, arrowPointAtCenter } = props;
      let mergedArrowPointAtCenter = arrowPointAtCenter;

      if (typeof arrow === 'object')
        mergedArrowPointAtCenter = arrow.pointAtCenter ?? arrowPointAtCenter;

      return (
        builtinPlacements
        || getPlacements({
          arrowPointAtCenter: mergedArrowPointAtCenter,
          autoAdjustOverflow,
        })
      );
    });
    const isTrueProps = (val: boolean | '') => {
      return val || val === '';
    };
    const getDisabledCompatibleChildren = (ele: any) => {
      const elementType = ele.type as any;
      if (typeof elementType === 'object' && ele.props) {
        if (
          ((elementType.__ANT_BUTTON === true || elementType === 'button')
            && isTrueProps(ele.props.disabled))
          || (elementType.__ANT_SWITCH === true
            && (isTrueProps(ele.props.disabled) || isTrueProps(ele.props.loading)))
          || (elementType.__ANT_RADIO === true && isTrueProps(ele.props.disabled))
        ) {
          // Pick some layout related style properties up to span
          // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
          const { picked, omitted } = splitObject(getStyle(ele), [
            'position',
            'left',
            'right',
            'top',
            'bottom',
            'float',
            'display',
            'zIndex',
          ]);
          const spanStyle: CSSProperties = {
            display: 'inline-block', // default inline-block is important
            ...picked,
            cursor: 'not-allowed',
            lineHeight: 1, // use the true height of child nodes
            width: ele.props && ele.props.block ? '100%' : undefined,
          };
          const buttonStyle: CSSProperties = {
            ...omitted,
            pointerEvents: 'none',
          };
          const child = cloneElement(
            ele,
            {
              style: buttonStyle,
            },
            true,
          );
          return (
            <span style={spanStyle} class={`${prefixCls.value}-disabled-compatible-wrapper`}>
              {child}
            </span>
          );
        }
      }
      return ele;
    };

    const getOverlay = () => {
      return props.title ?? slots.title?.();
    };

    const onPopupAlign = (domNode: HTMLElement, align: any) => {
      const placements = tooltipPlacements.value;
      // 当前返回的位置
      const placement = Object.keys(placements).find(
        key =>
          placements[key].points[0] === align.points?.[0]
          && placements[key].points[1] === align.points?.[1],
      );
      if (placement) {
        // 根据当前坐标设置动画点
        const rect = domNode.getBoundingClientRect();
        const transformOrigin = {
          top: '50%',
          left: '50%',
        };
        if (placement.includes('top') || placement.includes('Bottom'))
          transformOrigin.top = `${rect.height - align.offset[1]}px`;
        else if (placement.includes('Top') || placement.includes('bottom'))
          transformOrigin.top = `${-align.offset[1]}px`;

        if (placement.includes('left') || placement.includes('Right'))
          transformOrigin.left = `${rect.width - align.offset[0]}px`;
        else if (placement.includes('right') || placement.includes('Left'))
          transformOrigin.left = `${-align.offset[0]}px`;

        domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
      }
    };
    const colorInfo = computed(() => parseColor(prefixCls.value, props.color));
    const injectFromPopover = computed(() => (attrs as any)['data-popover-inject']);
    const [wrapSSR, hashId] = useStyle(
      prefixCls,
      computed(() => !injectFromPopover.value),
    );
    return () => {
      const { openClassName, overlayClassName, overlayStyle, overlayInnerStyle } = props;
      let children = filterEmpty(slots.default?.()) ?? null;
      children = children.length === 1 ? children[0] : children;

      let tempVisible = innerOpen.value;
      // Hide tooltip when there is no title
      if (mergedOpen.value === undefined && isNoTitle())
        tempVisible = false;

      if (!children)
        return null;

      const child = getDisabledCompatibleChildren(
        isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>,
      );
      const childCls = classNames({
        [openClassName || `${prefixCls.value}-open`]: true,
        [child.props && child.props.class]: child.props && child.props.class,
      });
      const customOverlayClassName = classNames(
        overlayClassName,
        {
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
        },

        colorInfo.value.className,
        hashId.value,
      );
      const formattedOverlayInnerStyle = {
        ...colorInfo.value.overlayStyle,
        ...overlayInnerStyle,
      };
      const arrowContentStyle = colorInfo.value.arrowStyle;
      const vcTooltipProps = {
        ...attrs,
        ...(props as TooltipProps),
        prefixCls: prefixCls.value,
        arrow: !!props.arrow,
        getPopupContainer: getPopupContainer?.value,
        builtinPlacements: tooltipPlacements.value,
        visible: tempVisible,
        ref: tooltip,
        overlayClassName: customOverlayClassName,
        overlayStyle: { ...arrowContentStyle, ...overlayStyle },
        overlayInnerStyle: formattedOverlayInnerStyle,
        onVisibleChange: handleVisibleChange,
        onPopupAlign,
        transitionName: getTransitionName(
          rootPrefixCls.value,
          'zoom-big-fast',
          props.transitionName,
        ),
      };

      return wrapSSR(
        <VcTooltip
          {...vcTooltipProps}
          v-slots={{
            arrowContent: () => <span class={`${prefixCls.value}-arrow-content`}></span>,
            overlay: getOverlay,
          }}
        >
          {innerOpen.value ? cloneElement(child, { class: childCls }) : child}
        </VcTooltip>,
      );
    };
  },
});
