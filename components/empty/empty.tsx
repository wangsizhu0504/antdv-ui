import { computed, defineComponent, inject } from 'vue'
import classNames from '../_util/classNames'
import LocaleReceiver from '../locale-provider/LocaleReceiver'
import { filterEmpty } from '../_util/props-util'

import { defaultConfigProvider } from '../config-provider/context'
import { configProviderKey } from '../constant'
import useStyle from './style'
import DefaultEmptyImg from './DefaultEmptyImg'
import SimpleEmptyImg from './SimpleEmptyImg'
import { emptyProps } from './props'
import type { EmptyProps } from './props'
import type { Locale } from './type'

const defaultEmptyImg = <DefaultEmptyImg />
const simpleEmptyImg = <SimpleEmptyImg />

export default defineComponent({
  name: 'AEmpty',
  compatConfig: { MODE: 3 },
  inheritAttrs: false,
  props: emptyProps(),
  PRESENTED_IMAGE_DEFAULT: defaultEmptyImg,
  PRESENTED_IMAGE_SIMPLE: simpleEmptyImg,
  setup(props, { slots = {}, attrs }) {
    const configProvider = inject(configProviderKey, defaultConfigProvider)
    const prefixClsRef = computed(() => configProvider.getPrefixCls('empty', props.prefixCls))
    const direction = computed(() => configProvider.direction?.value)
    const [wrapSSR, hashId] = useStyle(prefixClsRef)

    return () => {
      const prefixCls = prefixClsRef.value
      const {
        image = slots.image?.() || defaultEmptyImg,
        description = slots.description?.() || undefined,
        imageStyle,
        class: className = '',
        ...restProps
      } = { ...props, ...attrs }

      return wrapSSR(
        <LocaleReceiver
          componentName="Empty"
          children={(locale: Locale) => {
            const des = typeof description !== 'undefined' ? description : locale.description
            const alt = typeof des === 'string' ? des : 'empty'
            let imageNode: EmptyProps['image'] = null

            if (typeof image === 'string')
              imageNode = <img alt={alt} src={image} />
            else
              imageNode = image

            return (
              <div
                class={classNames(prefixCls, className, hashId.value, {
                  [`${prefixCls}-normal`]: image === simpleEmptyImg,
                  [`${prefixCls}-rtl`]: direction.value === 'rtl',
                })}
                {...restProps}
              >
                <div class={`${prefixCls}-image`} style={imageStyle}>
                  {imageNode}
                </div>
                {des && <p class={`${prefixCls}-description`}>{des}</p>}
                {slots.default && (
                  <div class={`${prefixCls}-footer`}>{filterEmpty(slots.default())}</div>
                )}
              </div>
            )
          }}
        />,
      )
    }
  },
})
