import { computed, defineComponent, inject } from 'vue'
import { classNames, filterEmpty } from '@antdv/utils'
import LocaleReceiver from '../../locale-provider/src/LocaleReceiver'

import { configProviderKey, defaultConfigProvider } from '../../config-provider/src/context'

import useStyle from '../style'
import DefaultEmptyImg from './DefaultEmptyImg'
import SimpleEmptyImg from './SimpleEmptyImg'
import { emptyProps } from './props'
import type { EmptyProps } from './props'

const defaultEmptyImg = <DefaultEmptyImg />
const simpleEmptyImg = <SimpleEmptyImg />

interface Locale {
  description?: string
}

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
