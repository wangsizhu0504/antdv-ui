import type { CustomSlotsType } from '@antdv/types';
import type { VNode } from 'vue';
import type { ButtonType } from './interface';
import { devWarning, flattenChildren, initDefaultProps } from '@antdv/utils';
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  shallowRef,
  Text,
  watch,
  watchEffect,
} from 'vue';
import { useInjectDisabled } from '../../config-provider';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';

import { useCompactItemContext } from '../../space';
import { Wave } from '../../wave';
import useStyle from '../style';
import { GroupSizeContext } from './context';
import LoadingIcon from './LoadingIcon';
import { buttonProps } from './props';

type Loading = boolean | number;

const rxTwoCNChar = /^[\u4E00-\u9FA5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isUnBorderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link';
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AButton',
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: initDefaultProps(buttonProps(), { type: 'default' }),
  slots: Object as CustomSlotsType<{
    icon: any
    default: any
  }>,
  // emits: ['click', 'mousedown'],
  setup(props, { slots, attrs, emit, expose }) {
    const { prefixCls, autoInsertSpaceInButton, direction, size } = useConfigInject('btn', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const groupSizeContext = GroupSizeContext.useInject();
    const disabledContext = useInjectDisabled();
    const mergedDisabled = computed(() => props.disabled ?? disabledContext.value);
    const buttonNodeRef = shallowRef<HTMLElement>(null);
    const delayTimeoutRef = shallowRef(undefined);
    let isNeedInserted = false;

    const innerLoading = shallowRef<Loading>(false);
    const hasTwoCNChar = shallowRef(false);

    const autoInsertSpace = computed(() => autoInsertSpaceInButton.value !== false);
    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

    // =============== Update Loading ===============
    const loadingOrDelay = computed(() =>
      typeof props.loading === 'object' && props.loading.delay
        ? props.loading.delay || true
        : !!props.loading,
    );

    watch(
      loadingOrDelay,
      (val) => {
        clearTimeout(delayTimeoutRef.value);
        if (typeof loadingOrDelay.value === 'number') {
          delayTimeoutRef.value = setTimeout(() => {
            innerLoading.value = val;
          }, loadingOrDelay.value);
        } else {
          innerLoading.value = val;
        }
      },
      {
        immediate: true,
      },
    );

    const classes = computed(() => {
      const { type, shape = 'default', ghost, block, danger, success } = props;
      const pre = prefixCls.value;

      const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };
      const sizeFullname = compactSize.value || groupSizeContext?.size || size.value;
      const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';

      return [
        compactItemClassnames.value,
        {
          [hashId.value]: true,
          [`${pre}`]: true,
          [`${pre}-${shape}`]: shape !== 'default' && shape,
          [`${pre}-${type}`]: type,
          [`${pre}-${sizeCls}`]: sizeCls,
          [`${pre}-loading`]: innerLoading.value,
          [`${pre}-background-ghost`]: ghost && !isUnBorderedButtonType(type),
          [`${pre}-two-chinese-chars`]: hasTwoCNChar.value && autoInsertSpace.value,
          [`${pre}-block`]: block,
          [`${pre}-dangerous`]: !!danger,
          [`${pre}-warning`]: !!props.warning,
          [`${pre}-success`]: !!success,
          [`${pre}-rtl`]: direction.value === 'rtl',
        },
      ];
    });

    const fixTwoCNChar = () => {
      // Fix for HOC usage like <FormatMessage />
      const node = buttonNodeRef.value!;
      if (!node || autoInsertSpaceInButton.value === false)
        return;

      const buttonText = node.textContent;

      if (isNeedInserted && isTwoCNChar(buttonText)) {
        if (!hasTwoCNChar.value)
          hasTwoCNChar.value = true;
      } else if (hasTwoCNChar.value) {
        hasTwoCNChar.value = false;
      }
    };
    const handleClick = (event: Event) => {
      // https://github.com/ant-design/ant-design/issues/30207
      if (innerLoading.value || mergedDisabled.value) {
        event.preventDefault();
        return;
      }
      emit('click', event);
    };
    const handleMousedown = (event: Event) => {
      emit('mousedown', event);
    };

    const insertSpace = (child: VNode, needInserted: boolean) => {
      const SPACE = needInserted ? ' ' : '';
      if (child.type === Text) {
        let text = (child.children as string).trim();
        if (isTwoCNChar(text))
          text = text.split('').join(SPACE);

        return <span>{text}</span>;
      }
      return child;
    };

    watchEffect(() => {
      devWarning(
        !(props.ghost && isUnBorderedButtonType(props.type)),
        'Button',
        '`link` or `text` button can\'t be a `ghost` button.',
      );
    });

    onMounted(fixTwoCNChar);
    onUpdated(fixTwoCNChar);

    onBeforeUnmount(() => {
      delayTimeoutRef.value && clearTimeout(delayTimeoutRef.value);
    });

    const focus = () => {
      buttonNodeRef.value?.focus();
    };
    const blur = () => {
      buttonNodeRef.value?.blur();
    };
    expose({
      focus,
      blur,
    });

    return () => {
      const { icon = slots.icon?.() } = props;
      const children = flattenChildren(slots.default?.());

      isNeedInserted = children.length === 1 && !icon && !isUnBorderedButtonType(props.type);

      const { type, htmlType, href, title, target } = props;

      const iconType = innerLoading.value ? 'loading' : icon;
      const getButtonProps = {
        ...attrs,
        title,
        disabled: mergedDisabled.value,
        class: [
          classes.value,
          attrs.class,
          { [`${prefixCls.value}-icon-only`]: children.length === 0 && !!iconType },
        ],
        onClick: handleClick,
        onMousedown: handleMousedown,
      };
      // https://github.com/vueComponent/ant-design-vue/issues/4930
      if (!mergedDisabled.value)
        delete getButtonProps.disabled;

      const iconNode
        = icon && !innerLoading.value
          ? (
              icon
            )
          : (
              <LoadingIcon
                existIcon={!!icon}
                prefixCls={prefixCls.value}
                loading={!!innerLoading.value}
              />
            );

      const kids = children.map(child =>
        insertSpace(child, isNeedInserted && autoInsertSpace.value),
      );

      if (href !== undefined) {
        return wrapSSR(
          <a {...getButtonProps} href={href} target={target} ref={buttonNodeRef}>
            {iconNode}
            {kids}
          </a>,
        );
      }

      let buttonNode = (
        <button {...getButtonProps} ref={buttonNodeRef} type={htmlType}>
          {iconNode}
          {kids}
        </button>
      );

      if (!isUnBorderedButtonType(type)) {
        buttonNode = (
          <Wave ref="wave" disabled={!!innerLoading.value}>
            {buttonNode}
          </Wave>
        );
      }

      return wrapSSR(buttonNode);
    };
  },
});
