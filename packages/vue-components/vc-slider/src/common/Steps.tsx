import type { VueNode } from '@antdv/types';
import type { CSSProperties } from 'vue';
import { classNames, devWarning } from '@antdv/utils';

function calcPoints(_vertical: boolean, marks: Record<number, VueNode | { style?: CSSProperties; label?: string }>, dots: boolean, step: number, min: number, max: number) {
  devWarning(
    dots ? step > 0 : true,
    'Slider',
    '`Slider[step]` should be a positive number in order to make Slider[dots] work.',
  );
  const points = Object.keys(marks)
    .map(Number.parseFloat)
    .sort((a, b) => a - b);
  if (dots && step) {
    for (let i = min; i <= max; i += step) {
      if (!points.includes(i))
        points.push(i);
    }
  }
  return points;
}

function Steps(_: any, { attrs }) {
  const {
    prefixCls,
    vertical,
    reverse,
    marks,
    dots,
    step,
    included,
    lowerBound,
    upperBound,
    max,
    min,
    dotStyle,
    activeDotStyle,
  } = attrs;
  const range = max - min;
  const elements = calcPoints(vertical, marks, dots, step, min, max).map((point) => {
    const offset = `${(Math.abs(point - min) / range) * 100}%`;

    const isActived
      = (!included && point === upperBound)
      || (included && point <= upperBound && point >= lowerBound);
    let style = vertical
      ? { ...dotStyle, [reverse ? 'top' : 'bottom']: offset }
      : { ...dotStyle, [reverse ? 'right' : 'left']: offset };
    if (isActived)
      style = { ...style, ...activeDotStyle };

    const pointClassName = classNames({
      [`${prefixCls}-dot`]: true,
      [`${prefixCls}-dot-active`]: isActived,
      [`${prefixCls}-dot-reverse`]: reverse,
    });

    return <span class={pointClassName} style={style} key={point} />;
  });

  return <div class={`${prefixCls}-step`}>{elements}</div>;
}

Steps.inheritAttrs = false;
export default Steps;
