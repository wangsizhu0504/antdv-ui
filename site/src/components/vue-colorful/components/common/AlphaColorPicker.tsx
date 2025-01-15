import type { PropType } from 'vue'
import type { AnyColor, ColorModel, ColorPickerBaseProps } from '../../types'

import { computed, defineComponent, ref, toRefs } from 'vue'
import { useColorManipulation } from '../../hooks/useColorManipulation'
import { useStyleSheet } from '../../hooks/useStyleSheet'
import { formatClassName } from '../../utils/format'
import { Alpha } from './Alpha'
import { Hue } from './Hue'
import { Saturation } from './Saturation'

export interface AlphaColorPickerProps<T extends AnyColor>
  extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>
}

export const AlphaColorPicker = defineComponent({
  name: 'AlphaColorPicker',
  props: {
    colorModel: { type: Object as PropType<ColorModel<AnyColor>> },
    color: { type: [String, Object] as PropType<AnyColor> },
    onChange: { type: Function as PropType<(newColor: AnyColor) => void> },
  },
  setup(props, { attrs }) {
    const { colorModel, color } = toRefs(props)

    const nodeRef = ref<HTMLDivElement>(null)
    useStyleSheet(nodeRef)

    const mergedColor = computed(() => color.value || colorModel.value.defaultColor)

    const [hsva, updateHsva] = useColorManipulation<AnyColor>(
      colorModel,
      mergedColor,
      props.onChange,
    )

    return () => {
      const nodeClassName = formatClassName(['vue-colorful', attrs.class])

      return (
        <div {...attrs} ref={nodeRef} class={nodeClassName}>
          <Saturation hsva={hsva.value} onChange={updateHsva} />
          <Hue hue={hsva.value.h} onChange={updateHsva} />
          <Alpha hsva={hsva.value} onChange={updateHsva} class="vue-colorful__last-control" />
        </div>
      )
    }
  },
})
