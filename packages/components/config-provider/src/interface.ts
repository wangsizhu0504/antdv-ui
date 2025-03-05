import type { DerivativeFunc } from '@antdv/cssinjs';
import type { Locale, ValidateMessages } from '@antdv/locale';
import type { SizeType, VueNode } from '@antdv/types';
import type { ComputedRef, MaybeRef, Ref } from 'vue';
import type { RequiredMark } from '../../form';

import type { TransformCellTextProps } from '../../table';
import type { AliasToken, SeedToken } from '../../theme';
import type { MapToken, OverrideToken } from '../../theme/interface';
import type { ConfigProviderProps } from './props';
import type renderEmpty from './renderEmpty';

export type DisabledType = boolean | undefined;
export interface GlobalFormCOntextProps {
  validateMessages?: Ref<ValidateMessages>
}

export type DirectionType = 'ltr' | 'rtl' | undefined;

export interface CSPConfig {
  nonce?: string
}

export interface ThemeColor {
  primaryColor?: string
  infoColor?: string
  successColor?: string
  processingColor?: string
  errorColor?: string
  warningColor?: string
}

export type Direction = 'ltr' | 'rtl';
export type MappingAlgorithm = DerivativeFunc<SeedToken, MapToken>;
export type RenderEmptyHandler = typeof renderEmpty;

export interface RenderEmptyProps {
  componentName?: string
  prefixCls?: string
}

export interface GlobalConfigProviderProps {
  prefixCls?: MaybeRef<ConfigProviderProps['prefixCls']>
  iconPrefixCls?: MaybeRef<ConfigProviderProps['iconPrefixCls']>
  getPopupContainer?: ConfigProviderProps['getPopupContainer']
}

export interface ThemeConfig {
  /**
   * @descCN 用于修改 Design Token。
   * @descEN Modify Design Token.
   */
  token?: Partial<AliasToken>
  /**
   * @descCN 用于修改各个组件的 Component Token 以及覆盖该组件消费的 Alias Token。
   * @descEN Modify Component Token and Alias Token applied to components.
   */
  components?: OverrideToken
  /**
   * @descCN 用于修改 Seed Token 到 Map Token 的算法。
   * @descEN Modify the algorithms of theme.
   * @default defaultAlgorithm
   */
  algorithm?: MappingAlgorithm | MappingAlgorithm[]
  /**
   * @descCN 是否继承外层 `ConfigProvider` 中配置的主题。
   * @descEN Whether to inherit the theme configured in the outer layer `ConfigProvider`.
   * @default true
   */
  inherit?: boolean
  /**
   * @descCN 是否开启 `hashed` 属性。如果你的应用中只存在一个版本的 antd，你可以设置为 `false` 来进一步减小样式体积。
   * @descEN Whether to enable the `hashed` attribute. If there is only one version of antd in your application, you can set `false` to reduce the bundle size.
   * @default true
   */
  hashed?: boolean
  /**
   * @descCN 通过 `cssVar` 配置来开启 CSS 变量模式，这个配置会被继承。
   * @descEN Enable CSS variable mode through `cssVar` configuration, This configuration will be inherited.
   * @default false
   */
  cssVar?:
    | {
      /**
       * @descCN css 变量的前缀
       * @descEN Prefix for css variable.
       * @default ant
       */
      prefix?: string;
      /**
       * @descCN 主题的唯一 key，版本低于 react@18 时需要手动设置。
       * @descEN Unique key for theme, should be set manually < react@18.
       */
      key?: string;
    }
    | boolean;
}

export interface ConfigProviderInnerProps {
  csp?: ComputedRef<CSPConfig>
  autoInsertSpaceInButton?: ComputedRef<boolean>
  locale?: ComputedRef<Locale>
  direction?: ComputedRef<'ltr' | 'rtl'>
  space?: ComputedRef<{
    size?: number | SizeType
  }>
  virtual?: ComputedRef<boolean>
  dropdownMatchSelectWidth?: ComputedRef<number | boolean>
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
  iconPrefixCls: ComputedRef<string>
  theme?: ComputedRef<ThemeConfig>
  renderEmpty?: (name?: string) => VueNode
  getTargetContainer?: ComputedRef<() => HTMLElement | Window>
  getPopupContainer?: ComputedRef<(triggerNode?: HTMLElement) => HTMLElement>
  pageHeader?: ComputedRef<{
    ghost?: boolean
  }>
  input?: ComputedRef<{
    autocomplete?: string
  }>
  pagination?: ComputedRef<{
    showSizeChanger?: boolean
  }>
  form?: ComputedRef<{
    validateMessages?: ValidateMessages
    requiredMark?: RequiredMark
    colon?: boolean
  }>
  select?: ComputedRef<{
    showSearch?: boolean
  }>
  componentSize?: ComputedRef<SizeType>
  componentDisabled?: ComputedRef<boolean>
  transformCellText?: ComputedRef<(tableProps: TransformCellTextProps) => any>
  wave?: ComputedRef<{
    disabled?: boolean
  }>
  flex?: ComputedRef<{
    vertical?: boolean
  }>
}
