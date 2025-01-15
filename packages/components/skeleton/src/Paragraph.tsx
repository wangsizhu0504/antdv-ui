import { defineComponent } from 'vue';
import { skeletonParagraphProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'SkeletonParagraph',
  props: skeletonParagraphProps(),
  setup(props) {
    const getWidth = (index: number) => {
      const { width, rows = 2 } = props;
      if (Array.isArray(width))
        return width[index];

      // last paragraph
      if (rows - 1 === index)
        return width;

      return undefined;
    };
    return () => {
      const { prefixCls, rows } = props;
      const rowList = [...Array(rows)].map((_, index) => {
        const width = getWidth(index);
        return (
          <li key={index} style={{ width: typeof width === 'number' ? `${width}px` : width }} />
        );
      });
      return <ul class={prefixCls}>{rowList}</ul>;
    };
  },
});
