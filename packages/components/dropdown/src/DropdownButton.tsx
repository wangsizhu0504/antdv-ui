import type { CustomSlotsType } from '@antdv/types';
import type { HTMLAttributes } from 'vue';
import type { DropdownButtonProps } from './props';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import { classNames, initDefaultProps } from '@antdv/utils';
import { computed, defineComponent } from 'vue';
import Button from '../../button';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import useStyle from '../style';
import Dropdown from './Dropdown';
import { dropdownButtonProps } from './props';

const ButtonGroup = Button.Group;

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ADropdownButton',
  inheritAttrs: false,
  __ANT_BUTTON: true,
  props: initDefaultProps(dropdownButtonProps(), {
    trigger: 'hover',
    placement: 'bottomRight',
    type: 'default',
  }),
  // emits: ['click', 'visibleChange', 'update:visible'],s
  slots: Object as CustomSlotsType<{
    icon: any
    leftButton: { button: any }
    rightButton: { button: any }
    overlay: any
    default: any
  }>,
  setup(props, { slots, attrs, emit }) {
    const handleVisibleChange = (val: boolean) => {
      emit('update:visible', val);
      emit('visibleChange', val);
      emit('update:open', val);
      emit('openChange', val);
    };

    const { prefixCls, direction, getPopupContainer } = useConfigInject('dropdown', props);
    const buttonPrefixCls = computed(() => `${prefixCls.value}-button`);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    return () => {
      const {
        type = 'default',
        disabled,
        danger,
        loading,
        htmlType,
        class: className = '',
        overlay = slots.overlay?.(),
        trigger,
        align,
        open,
        visible,
        onVisibleChange: _onVisibleChange,
        placement = direction.value === 'rtl' ? 'bottomLeft' : 'bottomRight',
        href,
        title,
        icon = slots.icon?.() || <EllipsisOutlined />,
        mouseEnterDelay,
        mouseLeaveDelay,
        overlayClassName,
        overlayStyle,
        destroyPopupOnHide,
        onClick,
        'onUpdate:open': _updateVisible,
        ...restProps
      } = { ...props, ...attrs } as DropdownButtonProps & HTMLAttributes;

      const dropdownProps = {
        align,
        disabled,
        trigger: disabled ? [] : trigger,
        placement,
        getPopupContainer: getPopupContainer?.value,
        onOpenChange: handleVisibleChange,
        mouseEnterDelay,
        mouseLeaveDelay,
        open: open ?? visible,
        overlayClassName,
        overlayStyle,
        destroyPopupOnHide,
      };

      const leftButton = (
        <Button
          danger={danger}
          type={type}
          disabled={disabled}
          loading={loading}
          onClick={onClick}
          htmlType={htmlType}
          href={href}
          title={title}
          v-slots={{ default: slots.default }}
        >
        </Button>
      );

      const rightButton = <Button danger={danger} type={type} icon={icon} />;

      return wrapSSR(
        <ButtonGroup
          {...restProps}
          class={classNames(buttonPrefixCls.value, className, hashId.value)}
        >
          {slots.leftButton ? slots.leftButton({ button: leftButton }) : leftButton}
          <Dropdown {...dropdownProps} v-slots={{ overlay: () => overlay }}>
            {slots.rightButton ? slots.rightButton({ button: rightButton }) : rightButton}
          </Dropdown>
        </ButtonGroup>,
      );
    };
  },
});
