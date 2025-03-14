import type { AnchorContainer, AnchorLinkItemProps, AnchorState, Section } from './interface';
import { addEventListenerWrap, classNames, devWarning, getScroll, scrollTo } from '@antdv/utils';
import scrollIntoView from 'scroll-into-view-if-needed';
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  reactive,
  ref,
} from 'vue';

import Affix from '../../affix';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import useStyle from '../style';
import AnchorLink from './AnchorLink';
import useProvideAnchor from './context';
import { anchorProps } from './props';

function getDefaultContainer() {
  return window;
}

function getOffsetTop(element: HTMLElement, container: AnchorContainer): number {
  if (!element.getClientRects().length)
    return 0;

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument!.documentElement!;
      return rect.top - container.clientTop;
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top;
  }

  return rect.top;
}

const sharpMatcherRegx = /#([\S ]+)$/;

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AAnchor',
  inheritAttrs: false,
  props: anchorProps(),
  setup(props, { emit, attrs, slots, expose }) {
    const { prefixCls, getTargetContainer, direction } = useConfigInject('anchor', props);
    const anchorDirection = computed(() => props.direction ?? 'vertical');

    if (process.env.NODE_ENV !== 'production') {
      devWarning(
        props.items && typeof slots.default !== 'function',
        'Anchor',
        '`Anchor children` is deprecated. Please use `items` instead.',
      );
    }

    if (process.env.NODE_ENV !== 'production') {
      devWarning(
        !(anchorDirection.value === 'horizontal' && props.items?.some(n => 'children' in n)),
        'Anchor',
        '`Anchor items#children` is not supported when `Anchor` direction is horizontal.',
      );
    }

    const spanLinkNode = ref<HTMLSpanElement>(null);
    const anchorRef = ref();
    const state = reactive<AnchorState>({
      links: [],
      scrollContainer: null,
      scrollEvent: null,
      animating: false,
    });
    const activeLink = ref(null);
    const getContainer = computed(() => {
      return props.getContainer || getTargetContainer?.value || getDefaultContainer;
    });
    // func...
    const getCurrentAnchor = (offsetTop = 0, bounds = 5) => {
      const linkSections: Section[] = [];
      const container = getContainer.value();
      state.links.forEach((link) => {
        const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
        if (!sharpLinkMatch)
          return;

        const target = document.getElementById(sharpLinkMatch[1]);
        if (target) {
          const top = getOffsetTop(target, container);
          if (top < offsetTop + bounds) {
            linkSections.push({
              link,
              top,
            });
          }
        }
      });

      if (linkSections.length) {
        const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
        return maxSection.link;
      }
      return '';
    };
    const setCurrentActiveLink = (link: string) => {
      if (activeLink.value === link)
        return;

      activeLink.value = typeof props.getCurrentAnchor === 'function' ? props.getCurrentAnchor(link) : link;
      emit('change', link);
    };
    const handleScrollTo = (link: string) => {
      const { offsetTop, targetOffset } = props;

      setCurrentActiveLink(link);
      const sharpLinkMatch = sharpMatcherRegx.exec(link);
      if (!sharpLinkMatch)
        return;

      const targetElement = document.getElementById(sharpLinkMatch[1]);
      if (!targetElement)
        return;

      const container = getContainer.value();
      const scrollTop = getScroll(container, true);
      const eleOffsetTop = getOffsetTop(targetElement, container);
      let y = scrollTop + eleOffsetTop;
      y -= targetOffset !== undefined ? targetOffset : offsetTop || 0;
      state.animating = true;

      scrollTo(y, {
        callback: () => {
          state.animating = false;
        },
        getContainer: getContainer.value,
      });
    };
    expose({
      scrollTo: handleScrollTo,
    });
    const handleScroll = () => {
      if (state.animating)
        return;

      const { offsetTop, bounds, targetOffset } = props;
      const currentActiveLink = getCurrentAnchor(
        targetOffset !== undefined ? targetOffset : offsetTop || 0,
        bounds,
      );
      setCurrentActiveLink(currentActiveLink);
    };

    const updateInk = () => {
      const linkNode = anchorRef.value.querySelector(`.${prefixCls.value}-link-title-active`);
      if (linkNode && spanLinkNode.value) {
        const horizontalAnchor = anchorDirection.value === 'horizontal';
        spanLinkNode.value.style.top = horizontalAnchor
          ? ''
          : `${linkNode.offsetTop + linkNode.clientHeight / 2}px`;
        spanLinkNode.value.style.height = horizontalAnchor ? '' : `${linkNode.clientHeight}px`;
        spanLinkNode.value.style.left = horizontalAnchor ? `${linkNode.offsetLeft}px` : '';
        spanLinkNode.value.style.width = horizontalAnchor ? `${linkNode.clientWidth}px` : '';
        if (horizontalAnchor) {
          scrollIntoView(linkNode, {
            scrollMode: 'if-needed',
            block: 'nearest',
          });
        }
      }
    };

    useProvideAnchor({
      registerLink: (link: string) => {
        if (!state.links.includes(link))
          state.links.push(link);
      },
      unregisterLink: (link: string) => {
        const index = state.links.indexOf(link);
        if (index !== -1)
          state.links.splice(index, 1);
      },
      activeLink,
      scrollTo: handleScrollTo,
      handleClick: (e, info) => {
        emit('click', e, info);
      },
      direction: anchorDirection,
    });

    onMounted(() => {
      nextTick(() => {
        const container = getContainer.value();
        state.scrollContainer = container;
        state.scrollEvent = addEventListenerWrap(state.scrollContainer, 'scroll', handleScroll);
        handleScroll();
      });
    });
    onBeforeUnmount(() => {
      if (state.scrollEvent)
        state.scrollEvent.remove();
    });
    onUpdated(() => {
      if (state.scrollEvent) {
        const currentContainer = getContainer.value();
        if (state.scrollContainer !== currentContainer) {
          state.scrollContainer = currentContainer;
          state.scrollEvent.remove();
          state.scrollEvent = addEventListenerWrap(state.scrollContainer, 'scroll', handleScroll);
          handleScroll();
        }
      }
      updateInk();
    });

    const createNestedLink = (options?: AnchorLinkItemProps[]) =>
      Array.isArray(options)
        ? options.map((option) => {
            const { children, key, href, target, class: cls, style, title } = option;
            return (
              <AnchorLink
                key={key}
                href={href}
                target={target}
                class={cls}
                style={style}
                title={title}
                customTitleProps={option}
                v-slots={{ customTitle: slots.customTitle }}
              >
                {anchorDirection.value === 'vertical' ? createNestedLink(children) : null}
              </AnchorLink>
            );
          })
        : null;

    const [wrapSSR, hashId] = useStyle(prefixCls);

    return () => {
      const { offsetTop, affix, showInkInFixed } = props;
      const pre = prefixCls.value;
      const inkClass = classNames(`${pre}-ink`, {
        [`${pre}-ink-visible`]: activeLink.value,
      });

      const wrapperClass = classNames(hashId.value, props.wrapperClass, `${pre}-wrapper`, {
        [`${pre}-wrapper-horizontal`]: anchorDirection.value === 'horizontal',
        [`${pre}-rtl`]: direction.value === 'rtl',
      });

      const anchorClass = classNames(pre, {
        [`${pre}-fixed`]: !affix && !showInkInFixed,
      });

      const wrapperStyle = {
        maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
        ...props.wrapperStyle,
      };
      const anchorContent = (
        <div class={wrapperClass} style={wrapperStyle} ref={anchorRef}>
          <div class={anchorClass}>
            <span class={inkClass} ref={spanLinkNode} />
            {Array.isArray(props.items) ? createNestedLink(props.items) : slots.default?.()}
          </div>
        </div>
      );

      return wrapSSR(
        !affix
          ? (
              anchorContent
            )
          : (
              <Affix {...attrs} offsetTop={offsetTop} target={getContainer.value}>
                {anchorContent}
              </Affix>
            ),
      );
    };
  },
});
