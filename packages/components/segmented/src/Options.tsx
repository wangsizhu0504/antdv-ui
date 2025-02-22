import type { ChangeEvent } from '@antdv/types';
import type { FunctionalComponent } from 'vue';
import type { SegmentedOptionType, SegmentedValue } from './interface';
import { classNames } from '@antdv/utils';

const SegmentedOption: FunctionalComponent<
  SegmentedOptionType & {
    prefixCls: string
    checked: boolean
    onChange: (_event: ChangeEvent, val: SegmentedValue) => void
  }
> = (props, { slots, emit }) => {
  const {
    value,
    disabled,
    payload,
    title,
    prefixCls,
    label = slots.label,
    checked,
    className,
  } = props;
  const handleChange = (event: InputEvent) => {
    if (disabled)
      return;

    emit('change', event, value);
  };

  return (
    <label
      class={classNames(
        {
          [`${prefixCls}-item-disabled`]: disabled,
        },
        className,
      )}
    >
      <input
        class={`${prefixCls}-item-input`}
        type="radio"
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
      />
      <div class={`${prefixCls}-item-label`} title={typeof title === 'string' ? title : ''}>
        {typeof label === 'function'
          ? label({
              value,
              disabled,
              payload,
              title,
            })
          : label ?? value}
      </div>
    </label>
  );
};
SegmentedOption.inheritAttrs = false;

export default SegmentedOption;
