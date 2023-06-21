import type { PropType } from 'vue'
import { computed, defineComponent, ref, toRefs } from 'vue'

import type { AnyColor, ColorModel, ColorPickerBaseProps } from '../../types'
import { useColorManipulation } from '../../hooks/useColorManipulation'
import { useStyleSheet } from '../../hooks/useStyleSheet'
import { formatClassName } from '../../utils/format'
import { Saturation } from './Saturation'
import { Hue } from './Hue'

export interface ColorPickerProps<T extends AnyColor> extends Partial<ColorPickerBaseProps<T>> {
  colorModel: ColorModel<T>
}

export const ColorPicker = defineComponent({
  name: 'ColorPicker',
  props: {
    colorModel: { type: Object as PropType<ColorModel<AnyColor>> },
    color: { type: [String, Object] as PropType<AnyColor> },
    onChange: { type: Function as PropType<(newColor: AnyColor) => void> },
  },
  setup(props, { attrs }) {
    const { colorModel, color } = toRefs(props)

    const nodeRef = ref<HTMLDivElement>()
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
          <Hue hue={hsva.value.h} onChange={updateHsva} class="vue-colorful__last-control" />
        </div>
      )
    }
  },
})
