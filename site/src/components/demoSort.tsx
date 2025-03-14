import { GLOBAL_CONFIG } from '@/SymbolKey';
import { defineComponent, inject } from 'vue';

export default defineComponent({
  props: {
    cols: {
      type: [Number, String],
      default: 2,
    },
  },
  setup(props, { slots }) {
    const globalConfig = inject(GLOBAL_CONFIG);
    // 手机访问强制开启单行 demo 模式
    const isSingleCol = props.cols === 1 || (globalConfig as any).isMobile.value;
    const leftChildren: any = [];
    const rightChildren: any = [];
    const children = slots.default?.() || [];
    children.forEach((demo, index) => {
      if (index % 2 === 0 || isSingleCol)
        leftChildren.push(demo);
      else
        rightChildren.push(demo);
    });
    return () => {
      return (
        <a-row gutter={16}>
          <a-col
            span={isSingleCol ? 24 : 12}
            class={isSingleCol ? 'code-boxes-col-1-1' : 'code-boxes-col-2-1'}
          >
            {leftChildren}
          </a-col>
          {isSingleCol
            ? null
            : (
                <a-col class="code-boxes-col-2-1" span={12}>
                  {rightChildren}
                </a-col>
              )}
        </a-row>
      );
    };
  },
});
