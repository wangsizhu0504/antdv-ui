import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';
import type { CardSize, CardTabListType, CardType } from './interface';
import { PropTypes, vNodeType } from '@antdv/utils';

export function cardProps() {
  return {
    prefixCls: String,
    title: PropTypes.any,
    extra: PropTypes.any,
    bordered: { type: Boolean, default: true },
    bodyStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    headStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
    loading: { type: Boolean, default: false },
    hoverable: { type: Boolean, default: false },
    type: { type: String as PropType<CardType> },
    size: { type: String as PropType<CardSize> },
    actions: PropTypes.any,
    tabList: {
      type: Array as PropType<CardTabListType[]>,
    },
    tabBarExtraContent: PropTypes.any,
    activeTabKey: String,
    defaultActiveTabKey: String,
    cover: PropTypes.any,
    onTabChange: {
      type: Function as PropType<(key: string) => void>,
    },
  };
}

export function cardGridProps() {
  return {
    prefixCls: String,
    hoverable: { type: Boolean, default: true },
  };
}

export function cardMetaProps() {
  return {
    prefixCls: String,
    title: vNodeType(),
    description: vNodeType(),
    avatar: vNodeType(),
  };
}
export type CardMetaProps = Partial<ExtractPropTypes<ReturnType<typeof cardMetaProps>>>;

export type CardGridProps = Partial<ExtractPropTypes<ReturnType<typeof cardGridProps>>>;

export type CardProps = Partial<ExtractPropTypes<ReturnType<typeof cardProps>>>;
