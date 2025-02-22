import { FileTextOutlined } from '@ant-design/icons-vue';
import { filterEmpty } from '@antdv/utils';
import { defineComponent } from 'vue';
import { floatButtonContentProps } from './props';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AFloatButtonContent',
  inheritAttrs: false,
  props: floatButtonContentProps(),
  setup(props, { attrs, slots }) {
    return () => {
      const { prefixCls } = props;
      const description = filterEmpty(slots.description?.());

      return (
        <div {...attrs} class={[attrs.class, `${prefixCls}-content`]}>
          {slots.icon || description.length
            ? (
                <>
                  {slots.icon && <div class={`${prefixCls}-icon`}>{slots.icon()}</div>}
                  {description.length
                    ? (
                        <div class={`${prefixCls}-description`}>{description}</div>
                      )
                    : null}
                </>
              )
            : (
                <div class={`${prefixCls}-icon`}>
                  <FileTextOutlined />
                </div>
              )}
        </div>
      );
    };
  },
});
