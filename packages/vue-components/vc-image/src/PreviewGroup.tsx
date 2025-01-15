import type { PropType } from 'vue';
import type { ImagePreviewType, PreviewGroupPreview, PreviewUrl } from './interface';
import type { PreviewProps } from './Preview';

import { useMergedState } from '@antdv/hooks';
import {
  computed,
  defineComponent,
  reactive,
  ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue';
import { imageContext } from './context';
import Preview from './Preview';
import { mergeDefaultValue } from './utils';

export function imageGroupProps() {
  return {
    previewPrefixCls: String,
    preview: {
      type: [Boolean, Object] as PropType<boolean | ImagePreviewType>,
      default: true as boolean | ImagePreviewType,
    },
    icons: {
      type: Object as PropType<PreviewProps['icons']>,
      default: () => ({}),
    },
  };
}

const Group = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'PreviewGroup',
  inheritAttrs: false,
  props: imageGroupProps(),
  setup(props, { slots }) {
    const preview = computed<PreviewGroupPreview>(() => {
      const defaultValues = {
        visible: undefined,
        onVisibleChange: () => {},
        getContainer: undefined,
        current: 0,
      };
      return typeof props.preview === 'object'
        ? mergeDefaultValue(props.preview, defaultValues)
        : defaultValues;
    });
    const previewUrls = reactive(new Map<number, PreviewUrl>());
    const current = ref<number>();

    const previewVisible = computed(() => preview.value.visible);
    const getPreviewContainer = computed(() => preview.value.getContainer);
    const onPreviewVisibleChange = (val, preVal) => {
      preview.value.onVisibleChange?.(val, preVal);
    };
    const [isShowPreview, setShowPreview] = useMergedState(!!previewVisible.value, {
      value: previewVisible,
      onChange: onPreviewVisibleChange,
    });

    const mousePosition = ref<{ x: number; y: number }>(null);
    const isControlled = computed(() => previewVisible.value !== undefined);
    const previewUrlsKeys = computed(() => Array.from(previewUrls.keys()));
    const currentControlledKey = computed(() => previewUrlsKeys.value[preview.value.current]);
    const canPreviewUrls = computed(
      () =>
        new Map<number, string>(
          Array.from(previewUrls as Map<number, any>)
            .filter(([, { canPreview }]) => !!canPreview)
            .map(([id, { url }]) => [id, url]),
        ),
    );

    const setPreviewUrls = (id: number, url: string, canPreview = true) => {
      previewUrls.set(id, {
        url,
        canPreview,
        imgCommonProps: {},
      });
    };
    const setCurrent = (val: number) => {
      current.value = val;
    };
    const setMousePosition = (val: null | { x: number; y: number }) => {
      mousePosition.value = val;
    };

    const registerImage = (id: number, url: string, canPreview = true, imgCommonProps = {}) => {
      const unRegister = () => {
        previewUrls.delete(id);
      };
      previewUrls.set(id, {
        url,
        canPreview,
        imgCommonProps,
      });
      return unRegister;
    };

    const onPreviewClose = (e: any) => {
      e?.stopPropagation();
      setShowPreview(false);
      setMousePosition(null);
    };

    watch(
      currentControlledKey,
      (val) => {
        setCurrent(val);
      },
      {
        immediate: true,
        flush: 'post',
      },
    );
    watchEffect(
      () => {
        if (isShowPreview.value && isControlled.value)
          setCurrent(currentControlledKey.value);
      },
      {
        flush: 'post',
      },
    );

    imageContext.provide({
      isPreviewGroup: shallowRef(true),
      previewUrls: canPreviewUrls,
      setPreviewUrls,
      current,
      setCurrent,
      setShowPreview,
      setMousePosition,
      registerImage,
    });

    return () => {
      const { ...dialogProps } = preview.value;
      return (
        <>
          {slots.default && slots.default()}
          <Preview
            {...dialogProps}
            ria-hidden={!isShowPreview.value}
            visible={isShowPreview.value}
            prefixCls={props.previewPrefixCls}
            onClose={onPreviewClose}
            mousePosition={mousePosition.value}
            src={canPreviewUrls.value.get(current.value)}
            icons={props.icons}
            getContainer={getPreviewContainer.value}
            imgCommonProps={previewUrls.get(current.value)?.imgCommonProps}
          />
        </>
      );
    };
  },
});

export default Group;
