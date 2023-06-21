import type { App, ExtractPropTypes, Plugin, PropType, SlotsType, VNodeTypes } from 'vue'
import { computed, defineComponent } from 'vue'
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, WarningFilled } from '@ant-design/icons-vue'
import { useConfigInject } from '../hooks'
import classNames from '../_util/classNames'
import PropTypes from '../_util/vue-types'
import unauthorized from './unauthorized'
import noFound from './noFound'
import serverError from './serverError'

import useStyle from './style'

export const IconMap: {
  success: typeof CheckCircleFilled
  error: typeof CloseCircleFilled
  info: typeof ExclamationCircleFilled
  warning: typeof WarningFilled
} = {
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  info: ExclamationCircleFilled,
  warning: WarningFilled,
}

export const ExceptionMap = {
  404: noFound,
  500: serverError,
  403: unauthorized,
}

export type ExceptionStatusType = 403 | 404 | 500 | '403' | '404' | '500'
export type ResultStatusType = ExceptionStatusType | keyof typeof IconMap

// ExceptionImageMap keys
const ExceptionStatus = Object.keys(ExceptionMap)

export const resultProps = () => ({
  prefixCls: String,
  icon: PropTypes.any,
  status: { type: [Number, String] as PropType<ResultStatusType>, default: 'info' },
  title: PropTypes.any,
  subTitle: PropTypes.any,
  extra: PropTypes.any,
})

export type ResultProps = Partial<ExtractPropTypes<ReturnType<typeof resultProps>>>

const renderIcon = (prefixCls: string, { status, icon }) => {
  if (ExceptionStatus.includes(`${status}`)) {
    const SVGComponent = ExceptionMap[status]
    return (
      <div class={`${prefixCls}-icon ${prefixCls}-image`}>
        <SVGComponent />
      </div>
    )
  }
  const IconComponent = IconMap[status]
  const iconNode = icon || <IconComponent />
  return <div class={`${prefixCls}-icon`}>{iconNode}</div>
}

const renderExtra = (prefixCls: string, extra: VNodeTypes) =>
  extra && <div class={`${prefixCls}-extra`}>{extra}</div>

const Result = defineComponent({
  compatConfig: { MODE: 3 },
  name: 'AResult',
  inheritAttrs: false,
  props: resultProps(),
  slots: Object as SlotsType<{
    title?: any
    subTitle?: any
    icon?: any
    extra?: any
    default?: any
  }>,
  setup(props, { slots, attrs }) {
    const { prefixCls, direction } = useConfigInject('result', props)

    const [wrapSSR, hashId] = useStyle(prefixCls)

    const className = computed(() =>
      classNames(prefixCls.value, hashId.value, `${prefixCls.value}-${props.status}`, {
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
      }),
    )
    return () => {
      const title = props.title ?? slots.title?.()
      const subTitle = props.subTitle ?? slots.subTitle?.()
      const icon = props.icon ?? slots.icon?.()
      const extra = props.extra ?? slots.extra?.()
      const pre = prefixCls.value
      return wrapSSR(
        <div {...attrs} class={[className.value, attrs.class]}>
          {renderIcon(pre, { status: props.status, icon })}
          <div class={`${pre}-title`}>{title}</div>
          {subTitle && <div class={`${pre}-subtitle`}>{subTitle}</div>}
          {renderExtra(pre, extra)}
          {slots.default && <div class={`${pre}-content`}>{slots.default()}</div>}
        </div>,
      )
    }
  },
})

/* add resource */
Result.PRESENTED_IMAGE_403 = ExceptionMap[403]
Result.PRESENTED_IMAGE_404 = ExceptionMap[404]
Result.PRESENTED_IMAGE_500 = ExceptionMap[500]

/* istanbul ignore next */
Result.install = function (app: App) {
  app.component(Result.name, Result)
  return app
}

export default Result as typeof Result &
Plugin & {
  readonly PRESENTED_IMAGE_403: typeof unauthorized
  readonly PRESENTED_IMAGE_404: typeof noFound
  readonly PRESENTED_IMAGE_500: typeof serverError
}
