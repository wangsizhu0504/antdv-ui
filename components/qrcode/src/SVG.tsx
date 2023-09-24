import { defineComponent, watchEffect } from 'vue'
import { qrcodeSvgProps } from './props'
import qrcodegen from './qrcodegen'
import { DEFAULT_BGCOLOR, DEFAULT_FGCOLOR, DEFAULT_INCLUDEMARGIN, DEFAULT_LEVEL, DEFAULT_SIZE, ERROR_LEVEL_MAP } from './constant'
import { excavateModules, generatePath, getImageSettings, getMarginSize } from './util'

export default defineComponent({
  name: 'QRCodeSVG',
  inheritAttrs: false,
  props: qrcodeSvgProps(),
  setup(props) {
    let cells = null
    let margin = null
    let numCells = null
    let calculatedImageSettings = null

    let fgPath = null
    let image = null

    watchEffect(() => {
      const {
        value,
        size = DEFAULT_SIZE,
        level = DEFAULT_LEVEL,
        includeMargin = DEFAULT_INCLUDEMARGIN,
        marginSize,
        imageSettings,
      } = props

      cells = qrcodegen.QrCode.encodeText(value, ERROR_LEVEL_MAP[level]).getModules()

      margin = getMarginSize(includeMargin, marginSize)
      numCells = cells.length + margin * 2
      calculatedImageSettings = getImageSettings(cells, size, margin, imageSettings)

      if (imageSettings != null && calculatedImageSettings != null) {
        if (calculatedImageSettings.excavation != null)
          cells = excavateModules(cells, calculatedImageSettings.excavation)

        image = (
          <image
            xlinkHref={imageSettings.src}
            height={calculatedImageSettings.h}
            width={calculatedImageSettings.w}
            x={calculatedImageSettings.x + margin}
            y={calculatedImageSettings.y + margin}
            preserveAspectRatio="none"
          />
        )
      }

      // Drawing strategy: instead of a rect per module, we're going to create a
      // single path for the dark modules and layer that on top of a light rect,
      // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
      // way faster than DOM ops.
      // For level 1, 441 nodes -> 2
      // For level 40, 31329 -> 2
      fgPath = generatePath(cells, margin)
    })

    return () => {
      const bgColor = props.bgColor && DEFAULT_BGCOLOR
      const fgColor = props.fgColor && DEFAULT_FGCOLOR
      return (
        <svg height={props.size} width={props.size} viewBox={`0 0 ${numCells} ${numCells}`}>
          {!!props.title && <title>{props.title}</title>}
          <path
            fill={bgColor}
            d={`M0,0 h${numCells}v${numCells}H0z`}
            shape-rendering="crispEdges"
          />
          <path fill={fgColor} d={fgPath} shape-rendering="crispEdges" />
          {image}
        </svg>
      )
    }
  },
})
