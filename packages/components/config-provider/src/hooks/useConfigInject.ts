import type { SizeType } from '@antdv/types';
import type { InjectionKey } from 'vue';
import type { ConfigProviderInnerProps } from '../interface';
import { computed, h, inject } from 'vue';
import { defaultConfigProvider, useInjectDisabled, useInjectSize } from '../context';
import { DefaultRenderEmpty } from '../renderEmpty';

export const configProviderKey: InjectionKey<ConfigProviderInnerProps> = Symbol('configProvider');

export default (name: string, props: Record<any, any>) => {
  const sizeContext = useInjectSize();
  const disabledContext = useInjectDisabled();
  const configProvider = inject(configProviderKey, {
    ...defaultConfigProvider,
    renderEmpty: (n?: string) => h(DefaultRenderEmpty, { componentName: n, prefixCls: props.prefixCls }),
  });
  const prefixCls = computed(() => configProvider.getPrefixCls(name, props.prefixCls));
  const customizePrefixCls = computed(() => props.customizePrefixCls);
  const direction = computed(() => props.direction ?? configProvider.direction?.value);
  const iconPrefixCls = computed(() => props.iconPrefixCls ?? configProvider.iconPrefixCls.value);
  const rootPrefixCls = computed(() => configProvider.getPrefixCls());
  const autoInsertSpaceInButton = computed(() => configProvider.autoInsertSpaceInButton?.value);
  const renderEmpty = configProvider.renderEmpty;
  const space = configProvider.space;
  const pageHeader = configProvider.pageHeader;
  const form = configProvider.form;
  const getTargetContainer = computed(
    () => props.getTargetContainer ?? configProvider.getTargetContainer?.value,
  );
  const getPopupContainer = computed(
    () => props.getContainer ?? props.getPopupContainer ?? configProvider.getPopupContainer?.value,
  );

  const dropdownMatchSelectWidth = computed<boolean | number>(
    () => props.dropdownMatchSelectWidth ?? configProvider.dropdownMatchSelectWidth?.value,
  );
  const virtual = computed(
    () =>
      (props.virtual === undefined
        ? configProvider.virtual?.value !== false
        : props.virtual !== false) && dropdownMatchSelectWidth.value !== false,
  );
  const size = computed(() => (props.size as SizeType) || sizeContext.value);
  const autocomplete = computed(
    () => props.autocomplete ?? configProvider.input?.value?.autocomplete,
  );
  const disabled = computed<boolean>(() => props.disabled ?? disabledContext.value);
  const csp = computed(() => props.csp ?? configProvider.csp);
  const wave = computed<{
    disabled?: boolean
  }>(() => props.wave ?? configProvider?.wave?.value);
  return {
    configProvider,
    prefixCls,
    customizePrefixCls,
    direction,
    size,
    getTargetContainer,
    getPopupContainer,
    space,
    pageHeader,
    form,
    autoInsertSpaceInButton,
    renderEmpty,
    virtual,
    dropdownMatchSelectWidth,
    rootPrefixCls,
    getPrefixCls: configProvider.getPrefixCls,
    autocomplete,
    csp,
    iconPrefixCls,
    disabled,
    select: configProvider.select,
    wave,
  };
};
