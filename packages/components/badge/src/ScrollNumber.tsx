import type { CSSProperties, DefineComponent, HTMLAttributes } from 'vue';
import type { ScrollNumberProps } from './props';
import { classNames, cloneElement, filterEmpty } from '@antdv/utils';
import { defineComponent } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import { scrollNumberProps } from './props';
import SingleNumber from './SingleNumber';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ScrollNumber',
  inheritAttrs: false,
  props: scrollNumberProps(),
  setup(props, { attrs, slots }) {
    const { prefixCls } = useConfigInject('scroll-number', props);

    return () => {
      const {
        count,
        title,
        component: Tag = 'sup' as unknown as DefineComponent,
        class: className,
        style,
        ...restProps
      } = { ...props, ...attrs } as ScrollNumberProps & HTMLAttributes & { style: CSSProperties };
      // ============================ Render ============================
      const newProps = {
        ...restProps,
        style,
        'data-show': props.show,
        'class': classNames(prefixCls.value, className),
        'title': title as string,
      };

      // Only integer need motion
      let numberNodes: any = count;
      if (count && Number(count) % 1 === 0) {
        const numberList = String(count).split('');

        numberNodes = numberList.map((num, i) => {
          return (
            <SingleNumber
              prefixCls={prefixCls.value}
              count={Number(count)}
              value={num}
              key={numberList.length - i}
            />
          );
        });
      }

      // allow specify the border
      // mock border-color by box-shadow for compatible with old usage:
      // <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9' }} />
      if (style && style.borderColor) {
        newProps.style = {
          ...(style as CSSProperties),
          boxShadow: `0 0 0 1px ${style.borderColor} inset`,
        };
      }
      const children = filterEmpty(slots.default?.());
      if (children && children.length) {
        return cloneElement(
          children,
          {
            class: classNames(`${prefixCls.value}-custom-component`),
          },
          false,
        );
      }

      return <Tag {...newProps}>{numberNodes}</Tag>;
    };
  },
});
