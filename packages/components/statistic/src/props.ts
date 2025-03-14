import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import type { countdownValueType, Formatter, valueType } from './interface';
import { anyType, booleanType, functionType, someType, vNodeType } from '@antdv/utils';

export function statisticProps() {
  return {
    prefixCls: String,
    decimalSeparator: String,
    groupSeparator: String,
    format: String,
    value: someType<valueType>([Number, String, Object]),
    valueStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    valueRender: functionType<(node: VNode) => VNode>(),
    formatter: anyType<Formatter>(),
    precision: Number,
    prefix: vNodeType(),
    suffix: vNodeType(),
    title: vNodeType(),
    loading: booleanType(),
  };
}

export function countdownProps() {
  return {
    ...statisticProps(),
    value: someType<countdownValueType>([Number, String, Object]),
    format: String,
    onFinish: Function as PropType<() => void>,
    onChange: Function as PropType<(value?: countdownValueType) => void>,
  };
}

export type StatisticProps = Partial<ExtractPropTypes<ReturnType<typeof statisticProps>>>;

export type CountdownProps = Partial<ExtractPropTypes<ReturnType<typeof countdownProps>>>;
