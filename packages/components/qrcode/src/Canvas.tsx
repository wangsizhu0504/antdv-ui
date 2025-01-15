import type { CSSProperties } from 'vue'
import { computed, defineComponent, shallowRef, watch, watchEffect } from 'vue'
import {
  DEFAULT_BGCOLOR,
  DEFAULT_FGCOLOR,
  DEFAULT_INCLUDEMARGIN,
  DEFAULT_LEVEL,
  DEFAULT_SIZE,
  ERROR_LEVEL_MAP,
} from './constant'
import { qrcodeCanvasProps } from './props'
import QrcodeGen from './qrcodegen'
import { excavateModules, generatePath, getImageSettings, getMarginSize, SUPPORTS_PATH2D } from './util'

export default defineComponent({
  name: 'QRCodeCanvas',
  inheritAttrs: false,
  props: qrcodeCanvasProps(),
  setup(props, { attrs, expose }) {
    const imgSrc = computed(() => props.imageSettings?.src)
    const _canvas = shallowRef<HTMLCanvasElement>(null)
    const _image = shallowRef<HTMLImageElement>(null)
    const isImgLoaded = shallowRef(false)
    expose({
      toDataURL: (type?: string, quality?: any) => {
        return _canvas.value?.toDataURL(type, quality)
      },
    })
    watchEffect(
      () => {
        const {
          value,
          size = DEFAULT_SIZE,
          level = DEFAULT_LEVEL,
          bgColor = DEFAULT_BGCOLOR,
          fgColor = DEFAULT_FGCOLOR,
          includeMargin = DEFAULT_INCLUDEMARGIN,
          marginSize,
          imageSettings,
        } = props
        if (_canvas.value != null) {
          const canvas = _canvas.value

          const ctx = canvas.getContext('2d')
          if (!ctx)
            return

          let cells = QrcodeGen.QrCode.encodeText(value, ERROR_LEVEL_MAP[level]).getModules()
          const margin = getMarginSize(includeMargin, marginSize)
          const numCells = cells.length + margin * 2
          const calculatedImageSettings = getImageSettings(cells, size, margin, imageSettings)

          const image = _image.value
          const haveImageToRender
            = isImgLoaded.value
            && calculatedImageSettings != null
            && image !== null
            && image.complete
            && image.naturalHeight !== 0
            && image.naturalWidth !== 0

          if (haveImageToRender) {
            if (calculatedImageSettings.excavation != null)
              cells = excavateModules(cells, calculatedImageSettings.excavation)
          }

          // We're going to scale this so that the number of drawable units
          // matches the number of cells. This avoids rounding issues, but does
          // result in some potentially unwanted single pixel issues between
          // blocks, only in environments that don't support Path2D.
          const pixelRatio = window.devicePixelRatio || 1
          canvas.height = canvas.width = size * pixelRatio
          const scale = (size / numCells) * pixelRatio
          ctx.scale(scale, scale)

          // Draw solid background, only paint dark modules.
          ctx.fillStyle = bgColor
          ctx.fillRect(0, 0, numCells, numCells)

          ctx.fillStyle = fgColor
          if (SUPPORTS_PATH2D) {
            // $FlowFixMe: Path2D c'tor doesn't support args yet.
            ctx.fill(new Path2D(generatePath(cells, margin)))
          } else {
            cells.forEach((row, rdx) => {
              row.forEach((cell, cdx) => {
                if (cell)
                  ctx.fillRect(cdx + margin, rdx + margin, 1, 1)
              })
            })
          }

          if (haveImageToRender) {
            ctx.drawImage(
              image,
              calculatedImageSettings.x + margin,
              calculatedImageSettings.y + margin,
              calculatedImageSettings.w,
              calculatedImageSettings.h,
            )
          }
        }
      },
      { flush: 'post' },
    )
    watch(imgSrc, () => {
      isImgLoaded.value = false
    })

    return () => {
      const size = props.size ?? DEFAULT_SIZE
      const canvasStyle = { height: `${size}px`, width: `${size}px` }

      let img = null
      if (imgSrc.value != null) {
        img = (
          <img
            src={imgSrc.value}
            key={imgSrc.value}
            style={{ display: 'none' }}
            onLoad={() => {
              isImgLoaded.value = true
            }}
            ref={_image}
          />
        )
      }
      return (
        <>
          <canvas {...attrs} style={[canvasStyle, attrs.style as CSSProperties]} ref={_canvas} />
          {img}
        </>
      )
    }
  },
})
