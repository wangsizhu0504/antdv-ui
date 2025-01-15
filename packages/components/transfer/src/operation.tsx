import type { FunctionalComponent } from 'vue';
import type { TransferOperationProps } from './props';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import Button from '../../button';

function noop() {}

const Operation: FunctionalComponent<TransferOperationProps> = (props) => {
  const {
    disabled,
    moveToLeft = noop,
    moveToRight = noop,
    leftArrowText = '',
    rightArrowText = '',
    leftActive,
    rightActive,
    class: className,
    style,
    direction,
    oneWay,
  } = props;

  return (
    <div class={className} style={style}>
      <Button
        type="primary"
        size="small"
        disabled={disabled || !rightActive}
        onClick={moveToRight}
        icon={direction !== 'rtl' ? <RightOutlined /> : <LeftOutlined />}
      >
        {rightArrowText}
      </Button>
      {!oneWay && (
        <Button
          type="primary"
          size="small"
          disabled={disabled || !leftActive}
          onClick={moveToLeft}
          icon={direction !== 'rtl' ? <LeftOutlined /> : <RightOutlined />}
        >
          {leftArrowText}
        </Button>
      )}
    </div>
  );
};
Operation.displayName = 'Operation';
Operation.inheritAttrs = false;

export default Operation;
