import { classNames, initDefaultProps } from '@antdv/utils';
import { defineComponent } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import useStyle from '../style';
import Element from './Element';
import Paragraph from './Paragraph';
import {
  type SkeletonAvatarProps as AvatarProps,
  type SkeletonParagraphProps,
  skeletonProps,
  type SkeletonTitleProps,
} from './props';
import Title from './Title';

/* This only for skeleton internal. */
type SkeletonAvatarProps = Omit<AvatarProps, 'active'>;

function getComponentProps<T>(prop: T | boolean | undefined): T | {} {
  if (prop && typeof prop === 'object')
    return prop;

  return {};
}

function getAvatarBasicProps(hasTitle: boolean, hasParagraph: boolean): SkeletonAvatarProps {
  if (hasTitle && !hasParagraph) {
    // Square avatar
    return { size: 'large', shape: 'square' };
  }

  return { size: 'large', shape: 'circle' };
}

function getTitleBasicProps(hasAvatar: boolean, hasParagraph: boolean): SkeletonTitleProps {
  if (!hasAvatar && hasParagraph)
    return { width: '38%' };

  if (hasAvatar && hasParagraph)
    return { width: '50%' };

  return {};
}

function getParagraphBasicProps(hasAvatar: boolean, hasTitle: boolean): SkeletonParagraphProps {
  const basicProps: SkeletonParagraphProps = {};

  // Width
  if (!hasAvatar || !hasTitle)
    basicProps.width = '61%';

  // Rows
  if (!hasAvatar && hasTitle)
    basicProps.rows = 3;
  else
    basicProps.rows = 2;

  return basicProps;
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ASkeleton',
  inheritAttrs: false,
  props: initDefaultProps(skeletonProps(), {
    avatar: false,
    title: true,
    paragraph: true,
  }),
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('skeleton', props);
    const [wrapSSR, hashId] = useStyle(prefixCls);

    return () => {
      const { loading, avatar, title, paragraph, active, round } = props;
      const pre = prefixCls.value;
      if (loading || props.loading === undefined) {
        const hasAvatar = !!avatar || (avatar as string) === '';
        const hasTitle = !!title || (title as string) === '';
        const hasParagraph = !!paragraph || (paragraph as string) === '';

        // Avatar
        let avatarNode;
        if (hasAvatar) {
          const avatarProps = {
            prefixCls: `${pre}-avatar`,
            ...getAvatarBasicProps(hasTitle, hasParagraph),
            ...getComponentProps(avatar),
          };

          avatarNode = (
            <div class={`${pre}-header`}>
              <Element {...avatarProps} />
            </div>
          );
        }

        let contentNode;
        if (hasTitle || hasParagraph) {
          // Title
          let $title;
          if (hasTitle) {
            const titleProps = {
              prefixCls: `${pre}-title`,
              ...getTitleBasicProps(hasAvatar, hasParagraph),
              ...getComponentProps(title),
            };

            $title = <Title {...titleProps} />;
          }

          // Paragraph
          let paragraphNode;
          if (hasParagraph) {
            const paragraphProps = {
              prefixCls: `${pre}-paragraph`,
              ...getParagraphBasicProps(hasAvatar, hasTitle),
              ...getComponentProps(paragraph),
            };

            paragraphNode = <Paragraph {...paragraphProps} />;
          }

          contentNode = (
            <div class={`${pre}-content`}>
              {$title}
              {paragraphNode}
            </div>
          );
        }

        const cls = classNames(pre, {
          [`${pre}-with-avatar`]: hasAvatar,
          [`${pre}-active`]: active,
          [`${pre}-rtl`]: direction.value === 'rtl',
          [`${pre}-round`]: round,
          [hashId.value]: true,
          [`${attrs.class}`]: true,
        });

        return wrapSSR(
          <div class={cls}>
            {avatarNode}
            {contentNode}
          </div>,
        );
      }
      return slots.default?.();
    };
  },
});
