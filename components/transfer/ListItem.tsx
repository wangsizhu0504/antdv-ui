import { DeleteOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import defaultLocale from '../locale/lang/en_US'
import Checkbox from '../checkbox'
import LocaleReceiver from '../locale-provider/LocaleReceiver'
import TransButton from '../_util/components/transButton'
import classNames from '../_util/classNames'
import PropTypes from '../_util/vue-types'
import { booleanType } from '../_util/type'
import type { TransferLocale } from '../locale'
import type { ExtractPropTypes } from 'vue'

function noop() {}

export const transferListItemProps = {
  renderedText: PropTypes.any,
  renderedEl: PropTypes.any,
  item: PropTypes.any,
  checked: booleanType(),
  prefixCls: String,
  disabled: booleanType(),
  showRemove: booleanType(),
  onClick: Function,
  onRemove: Function,
}

export type TransferListItemProps = Partial<ExtractPropTypes<typeof transferListItemProps>>

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ListItem',
  inheritAttrs: false,
  props: transferListItemProps,
  emits: ['click', 'remove'],
  setup(props, { emit }) {
    return () => {
      const { renderedText, renderedEl, item, checked, disabled, prefixCls, showRemove } = props
      const className = classNames({
        [`${prefixCls}-content-item`]: true,
        [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
      })

      let title: string
      if (typeof renderedText === 'string' || typeof renderedText === 'number')
        title = String(renderedText)

      return (
        <LocaleReceiver componentName="Transfer" defaultLocale={defaultLocale.Transfer}>
          {(transferLocale: TransferLocale) => {
            const labelNode = <span class={`${prefixCls}-content-item-text`}>{renderedEl}</span>
            if (showRemove) {
              return (
                <li class={className} title={title}>
                  {labelNode}
                  <TransButton
                    disabled={disabled || item.disabled}
                    class={`${prefixCls}-content-item-remove`}
                    aria-label={transferLocale.remove}
                    onClick={() => {
                      emit('remove', item)
                    }}
                  >
                    <DeleteOutlined />
                  </TransButton>
                </li>
              )
            }

            return (
              <li
                class={className}
                title={title}
                onClick={
                  (disabled || item.disabled)
                    ? noop
                    : () => {
                        emit('click', item)
                      }
                }
              >
                <Checkbox
                  class={`${prefixCls}-checkbox`}
                  checked={checked}
                  disabled={disabled || item.disabled}
                />
                {labelNode}
              </li>
            )
          }}
        </LocaleReceiver>
      )
    }
  },
})
