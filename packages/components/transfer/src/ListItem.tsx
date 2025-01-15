import type { TransferLocale } from '@antdv/locale';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { enUS as defaultLocale } from '@antdv/locale';
import { classNames } from '@antdv/utils';
import { TransButton } from '@antdv/vue-components';
import { defineComponent } from 'vue';
import Checkbox from '../../checkbox';
import LocaleReceiver from '../../locale-provider/src/LocaleReceiver';
import { transferListItemProps } from './props';

function noop() {}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ListItem',
  inheritAttrs: false,
  props: transferListItemProps(),
  emits: ['click', 'remove'],
  setup(props, { emit }) {
    return () => {
      const { renderedText, renderedEl, item, checked, disabled, prefixCls, showRemove } = props;
      const className = classNames({
        [`${prefixCls}-content-item`]: true,
        [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
      });

      let title: string;
      if (typeof renderedText === 'string' || typeof renderedText === 'number')
        title = String(renderedText);

      return (
        <LocaleReceiver componentName="Transfer" defaultLocale={defaultLocale.Transfer}>
          {(transferLocale: TransferLocale) => {
            const labelNode = <span class={`${prefixCls}-content-item-text`}>{renderedEl}</span>;
            if (showRemove) {
              return (
                <li class={className} title={title}>
                  {labelNode}
                  <TransButton
                    disabled={disabled || item.disabled}
                    class={`${prefixCls}-content-item-remove`}
                    aria-label={transferLocale.remove}
                    onClick={() => {
                      emit('remove', item);
                    }}
                  >
                    <DeleteOutlined />
                  </TransButton>
                </li>
              );
            }

            return (
              <li
                class={className}
                title={title}
                onClick={
                  (disabled || item.disabled)
                    ? noop
                    : () => emit('click', item)
                }
              >
                <Checkbox
                  class={`${prefixCls}-checkbox`}
                  checked={checked}
                  disabled={disabled || item.disabled}
                />
                {labelNode}
              </li>
            );
          }}
        </LocaleReceiver>
      );
    };
  },
});
