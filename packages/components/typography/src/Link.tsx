import type { FunctionalComponent } from 'vue';
import type { LinkProps } from './props';
import { devWarning } from '@antdv/utils';
import Base from './Base';
import { linkProps } from './props';

const Link: FunctionalComponent<LinkProps> = (props, { slots, attrs }) => {
  const { ellipsis, rel, ...restProps } = { ...props, ...attrs };
  devWarning(
    typeof ellipsis !== 'object',
    'Typography.Link',
    '`ellipsis` only supports boolean value.',
  );
  const mergedProps = {
    ...restProps,
    rel: (rel === undefined && restProps.target === '_blank') ? 'noopener noreferrer' : rel,
    ellipsis: !!ellipsis,
    component: 'a',
  };
  // https://github.com/ant-design/ant-design/issues/26622

  // @ts-expect-error
  delete mergedProps.navigate;

  return <Base {...mergedProps} v-slots={slots}></Base>;
};

Link.displayName = 'ATypographyLink';
Link.inheritAttrs = false;
Link.props = linkProps();

export default Link;
