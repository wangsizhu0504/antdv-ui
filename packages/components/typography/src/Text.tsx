import type { FunctionalComponent } from 'vue';
import type { TextProps } from './props';
import { devWarning, omit } from '@antdv/utils';
import Base from './Base';
import { textProps } from './props';

const Text: FunctionalComponent<TextProps> = (props, { slots, attrs }) => {
  const { ellipsis } = props;
  devWarning(
    typeof ellipsis !== 'object'
      || !ellipsis
      || (!('expandable' in ellipsis) && !('rows' in ellipsis)),
    'Typography.Text',
    '`ellipsis` do not support `expandable` or `rows` props.',
  );
  const textProps = {
    ...props,
    ellipsis:
      (ellipsis && typeof ellipsis === 'object')
        ? omit(ellipsis as any, ['expandable', 'rows'])
        : ellipsis,
    component: 'span',
    ...attrs,
  };
  return <Base {...textProps} v-slots={slots}></Base>;
};

Text.displayName = 'ATypographyText';
Text.inheritAttrs = false;
Text.props = textProps();

export default Text;
