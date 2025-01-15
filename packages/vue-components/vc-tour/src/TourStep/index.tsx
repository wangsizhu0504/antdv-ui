import { defineComponent } from 'vue';
import { tourStepProps } from '../interface';
import DefaultPanel from './DefaultPanel';

const TourStep = defineComponent({
  name: 'TourStep',
  inheritAttrs: false,
  props: tourStepProps(),
  setup(props, { attrs }) {
    return () => {
      const { current, renderPanel } = props;

      return (
        <>
          {typeof renderPanel === 'function'
            ? (
                renderPanel({ ...attrs, ...props }, current)
              )
            : (
                <DefaultPanel {...attrs} {...props} />
              )}
        </>
      );
    };
  },
});

export default TourStep;
