import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons-vue';
import { getTransitionName, VcPreviewGroup } from '@antdv/vue-components';
import { computed, defineComponent } from 'vue';
import useConfigInject from '../../config-provider/src/hooks/useConfigInject';
import useStyle from '../style';
import { previewGroupProps } from './props';

export const icons = {
  rotateLeft: <RotateLeftOutlined />,
  rotateRight: <RotateRightOutlined />,
  zoomIn: <ZoomInOutlined />,
  zoomOut: <ZoomOutOutlined />,
  close: <CloseOutlined />,
  left: <LeftOutlined />,
  right: <RightOutlined />,
  flipX: <SwapOutlined />,
  flipY: <SwapOutlined rotate={90} />,
};

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AImagePreviewGroup',
  inheritAttrs: false,
  props: previewGroupProps(),
  setup(props, { attrs, slots }) {
    const { prefixCls, rootPrefixCls } = useConfigInject('image', props);
    const previewPrefixCls = computed(() => `${prefixCls.value}-preview`);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const mergedPreview = computed(() => {
      const { preview } = props;
      if (preview === false)
        return preview;

      const _preview = typeof preview === 'object' ? preview : {};

      return {
        ..._preview,
        rootClassName: hashId.value,
        transitionName: getTransitionName(rootPrefixCls.value, 'zoom', _preview.transitionName),
        maskTransitionName: getTransitionName(
          rootPrefixCls.value,
          'fade',
          _preview.maskTransitionName,
        ),
      };
    });
    return () => {
      return wrapSSR(
        <VcPreviewGroup
          {...{ ...attrs, ...props }}
          preview={mergedPreview.value}
          icons={icons}
          previewPrefixCls={previewPrefixCls.value}
          v-slots={slots}
        >
        </VcPreviewGroup>,
      );
    };
  },
});
