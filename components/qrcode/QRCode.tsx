import { computed, defineComponent, ref } from 'vue'
import { ReloadOutlined } from '@ant-design/icons-vue'
import useConfigInject from '../config-provider/hooks/useConfigInject'
import { useLocaleReceiver } from '../locale-provider'
import Spin from '../spin'
import Button from '../button'
import { useToken } from '../theme/internal'
import warning from '../_util/warning'
import QRCodeCanvas from './Canvas'
import QRCodeSVG from './SVG'
import useStyle from './style'
import { qrcodeProps } from './props'
import type { QRCodeProps } from './props'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'AQrcode',
  inheritAttrs: false,
  props: qrcodeProps(),
  emits: ['refresh'],
  setup(props, { emit, attrs, expose }) {
    if (process.env.NODE_ENV !== 'production') {
      warning(
        !(props.icon && props.errorLevel === 'L'),
        'QRCode',
        'ErrorLevel `L` is not recommended to be used with `icon`, for scanning result would be affected by low level.',
      )
    }
    const [locale] = useLocaleReceiver('QRCode')
    const { prefixCls } = useConfigInject('qrcode', props)
    const [wrapSSR, hashId] = useStyle(prefixCls)
    const [, token] = useToken()
    const qrCodeCanvas = ref()
    expose({
      toDataURL: (type?: string, quality?: any) => {
        return qrCodeCanvas.value?.toDataURL(type, quality)
      },
    })
    const qrCodeProps = computed(() => {
      const {
        value,
        icon = '',
        size = 160,
        iconSize = 40,
        color = token.value.colorText,
        bgColor = 'transparent',
        errorLevel = 'M',
      } = props
      const imageSettings: QRCodeProps['imageSettings'] = {
        src: icon,
        x: undefined,
        y: undefined,
        height: iconSize,
        width: iconSize,
        excavate: true,
      }
      return {
        value,
        size: size - (token.value.paddingSM + token.value.lineWidth) * 2,
        level: errorLevel,
        bgColor,
        fgColor: color,
        imageSettings: icon ? imageSettings : undefined,
      }
    })
    return () => {
      const pre = prefixCls.value
      return wrapSSR(
        <div
          {...attrs}
          style={[
            attrs.style as CSSProperties,
            {
              width: `${props.size}px`,
              height: `${props.size}px`,
              backgroundColor: qrCodeProps.value.bgColor,
            },
          ]}
          class={[
            hashId.value,
            pre,
            {
              [`${pre}-borderless`]: !props.bordered,
            },
          ]}
        >
          {props.status !== 'active' && (
            <div class={`${pre}-mask`}>
              {props.status === 'loading' && <Spin />}
              {props.status === 'expired' && (
                <>
                  <p class={`${pre}-expired`}>{locale.value.expired}</p>
                  <Button
                    type="link"
                    onClick={e => emit('refresh', e)}
                    v-slots={{ icon: () => <ReloadOutlined /> }}
                  >
                    {locale.value.refresh}
                  </Button>
                </>
              )}
            </div>
          )}
          {props.type === 'canvas'
            ? (
            <QRCodeCanvas ref={qrCodeCanvas} {...qrCodeProps.value} />
              )
            : (
            <QRCodeSVG {...qrCodeProps.value} />
              )}
        </div>,
      )
    }
  },
})
