import type { FunctionalComponent } from 'vue';
import type { TitleProps } from './props';
import { devWarning } from '@antdv/utils';
import Base from './Base';
import { TITLE_ELE_LIST, titleProps } from './props';

const Title: FunctionalComponent<TitleProps> = (props, { slots, attrs }) => {
  const { level = 1, ...restProps } = props;
  let component: string;
  if (TITLE_ELE_LIST.includes(level)) {
    component = `h${level}`;
  } else {
    devWarning(false, 'Typography', 'Title only accept `1 | 2 | 3 | 4 | 5` as `level` value.');
    component = 'h1';
  }

  const getTitleProps = {
    ...restProps,
    component,
    ...attrs,
  };

  return <Base {...getTitleProps} v-slots={slots}></Base>;
};

Title.displayName = 'ATypographyTitle';
Title.inheritAttrs = false;
Title.props = titleProps();

export default Title;
