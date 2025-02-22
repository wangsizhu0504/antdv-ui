import { defineComponent } from 'vue';
import { uploadProps } from './interface';
import Upload from './Upload';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AUploadDragger',
  inheritAttrs: false,
  props: uploadProps(),
  setup(props, { slots, attrs }) {
    return () => {
      const { height, ...restProps } = props;
      const { style, ...restAttrs } = attrs;
      const draggerProps = {
        ...restProps,
        ...restAttrs,
        type: 'drag',
        style: { ...(style as any), height: typeof height === 'number' ? `${height}px` : height },
      } as any;
      return <Upload {...draggerProps} v-slots={slots}></Upload>;
    };
  },
});
