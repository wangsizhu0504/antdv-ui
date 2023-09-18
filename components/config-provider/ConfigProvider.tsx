import { computed, defineComponent, reactive, watch, watchEffect } from 'vue'

import defaultLocale from '../locale/lang/en_US'
import { createTheme } from '../cssinjs'
import LocaleProvider from '../locale-provider'

import LocaleReceiver from '../locale-provider/LocaleReceiver'

import message from '../message'
import { notification } from '../notification'
import defaultSeedToken from '../theme/themes/seed'
import { DesignTokenProvider } from '../theme/internal'
import { ANT_MARK, defaultIconPrefixCls } from '../constant'
import { getGlobalIconPrefixCls, getGlobalPrefixCls, globalConfigForApi } from './config'
import defaultRenderEmpty from './renderEmpty'
import { useProviderDisabled } from './DisabledContext'
import { useProviderSize } from './SizeContext'
import {
  useConfigContextInject,
  useConfigContextProvider,
  useProvideGlobalForm,
} from './context'
import useTheme from './hooks/useTheme'
import useStyle from './style'
import { registerTheme } from './cssVariables'

import { type ConfigProviderProps, configProviderProps } from './props'

import type { Locale, ValidateMessages } from '../locale'
import type { WatchStopHandle } from 'vue'
import type { ConfigProviderInnerProps, GlobalConfigProviderProps, RenderEmptyHandler, ThemeColor } from './types'

const globalConfigBySet = reactive<ConfigProviderProps>({}) // 权重最大

export const configConsumerProps = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
]

watchEffect(() => {
  Object.assign(globalConfigForApi, globalConfigBySet)
  globalConfigForApi.prefixCls = getGlobalPrefixCls()
  globalConfigForApi.iconPrefixCls = getGlobalIconPrefixCls()
  globalConfigForApi.getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls
    return suffixCls
      ? `${globalConfigForApi.prefixCls}-${suffixCls}`
      : globalConfigForApi.prefixCls
  }
  globalConfigForApi.getRootPrefixCls = () => {
    // If Global prefixCls provided, use this
    if (globalConfigForApi.prefixCls)
      return globalConfigForApi.prefixCls

    // Fallback to default prefixCls
    return getGlobalPrefixCls()
  }
})

let stopWatchEffect: WatchStopHandle

export const setGlobalConfig = (params: GlobalConfigProviderProps & { theme?: ThemeColor }) => {
  if (stopWatchEffect)
    stopWatchEffect()

  stopWatchEffect = watchEffect(() => {
    Object.assign(globalConfigBySet, reactive(params))
    Object.assign(globalConfigForApi, reactive(params))
  })
  if (params.theme)
    registerTheme(getGlobalPrefixCls(), params.theme)
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AConfigProvider',
  inheritAttrs: false,
  props: configProviderProps(),
  config: setGlobalConfig,
  setup(props, { slots }) {
    const parentContext = useConfigContextInject()
    const getPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
      const { prefixCls = 'ant' } = props
      if (customizePrefixCls) return customizePrefixCls
      const mergedPrefixCls = prefixCls || parentContext.getPrefixCls('')
      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls
    }
    const iconPrefixCls = computed(
      () => props.iconPrefixCls || parentContext.iconPrefixCls.value || defaultIconPrefixCls,
    )
    const shouldWrapSSR = computed(() => iconPrefixCls.value !== parentContext.iconPrefixCls.value)
    const csp = computed(() => props.csp || parentContext.csp?.value)

    const wrapSSR = useStyle(iconPrefixCls)

    const mergedTheme = useTheme(
      computed(() => props.theme),
      computed(() => parentContext.theme?.value),
    )
    const renderEmptyComponent = (name?: string) => {
      const renderEmpty = (props.renderEmpty
        || slots.renderEmpty
        || parentContext.renderEmpty
        || defaultRenderEmpty) as RenderEmptyHandler
      return renderEmpty(name)
    }
    const autoInsertSpaceInButton = computed(
      () => props.autoInsertSpaceInButton ?? parentContext.autoInsertSpaceInButton?.value,
    )
    const locale = computed(() => props.locale || parentContext.locale?.value)
    watch(
      locale,
      () => {
        globalConfigBySet.locale = locale.value
      },
      { immediate: true },
    )
    const direction = computed(() => props.direction || parentContext.direction?.value)
    const space = computed(() => props.space ?? parentContext.space?.value)
    const virtual = computed(() => props.virtual ?? parentContext.virtual?.value)
    const dropdownMatchSelectWidth = computed(
      () => props.dropdownMatchSelectWidth ?? parentContext.dropdownMatchSelectWidth?.value,
    )
    const getTargetContainer = computed(() =>
      props.getTargetContainer !== undefined
        ? props.getTargetContainer
        : parentContext.getTargetContainer?.value,
    )
    const getPopupContainer = computed(() =>
      props.getPopupContainer !== undefined
        ? props.getPopupContainer
        : parentContext.getPopupContainer?.value,
    )
    const pageHeader = computed(() =>
      props.pageHeader !== undefined ? props.pageHeader : parentContext.pageHeader?.value,
    )
    const input = computed(() =>
      props.input !== undefined ? props.input : parentContext.input?.value,
    )
    const pagination = computed(() =>
      props.pagination !== undefined ? props.pagination : parentContext.pagination?.value,
    )
    const form = computed(() =>
      props.form !== undefined ? props.form : parentContext.form?.value,
    )
    const select = computed(() =>
      props.select !== undefined ? props.select : parentContext.select?.value,
    )
    const componentSize = computed(() => props.componentSize)
    const componentDisabled = computed(() => props.componentDisabled)
    const configProvider: ConfigProviderInnerProps = {
      csp,
      autoInsertSpaceInButton,
      locale,
      direction,
      space,
      virtual,
      dropdownMatchSelectWidth,
      getPrefixCls,
      iconPrefixCls,
      theme: computed(() => {
        return mergedTheme.value ?? parentContext.theme?.value
      }),
      renderEmpty: renderEmptyComponent,
      getTargetContainer,
      getPopupContainer,
      pageHeader,
      input,
      pagination,
      form,
      select,
      componentSize,
      componentDisabled,
      transformCellText: computed(() => props.transformCellText),
    }

    // ================================ Dynamic theme ================================
    const memoTheme = computed(() => {
      const { algorithm, token, ...rest } = mergedTheme.value || {}
      const themeObj
        = algorithm && (!Array.isArray(algorithm) || algorithm.length > 0)
          ? createTheme(algorithm)
          : undefined

      return {
        ...rest,
        theme: themeObj,

        token: {
          ...defaultSeedToken,
          ...token,
        },
      }
    })
    const validateMessagesRef = computed(() => {
      // Additional Form provider
      let validateMessages: ValidateMessages = {}

      if (locale.value) {
        validateMessages
          = locale.value.Form?.defaultValidateMessages
          || defaultLocale.Form?.defaultValidateMessages
          || {}
      }
      if (props.form && props.form.validateMessages)
        validateMessages = { ...validateMessages, ...props.form.validateMessages }

      return validateMessages
    })
    useConfigContextProvider(configProvider)
    useProvideGlobalForm({ validateMessages: validateMessagesRef })
    useProviderSize(componentSize)
    useProviderDisabled(componentDisabled)

    const renderProvider = (legacyLocale: Locale) => {
      let childNode = shouldWrapSSR.value ? wrapSSR(slots.default?.()) : slots.default?.()
      if (props.theme)
        childNode = <DesignTokenProvider value={memoTheme.value}>{childNode}</DesignTokenProvider>
      return (
        <LocaleProvider locale={locale.value || legacyLocale} ANT_MARK__={ANT_MARK}>
          {childNode}
        </LocaleProvider>
      )
    }

    watchEffect(() => {
      if (direction.value) {
        message.config({
          rtl: direction.value === 'rtl',
        })
        notification.config({
          rtl: direction.value === 'rtl',
        })
      }
    })

    return () => (
      <LocaleReceiver children={(_, __, legacyLocale) => renderProvider(legacyLocale as Locale)} />
    )
  },
})
