import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import { VcTrigger } from '@antdv/vue-components'
import DropdownMenu from './DropdownMenu'
import type { OptionProps } from './Option'

const BUILT_IN_PLACEMENTS = {
  bottomRight: {
    points: ['tl', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  bottomLeft: {
    points: ['tr', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topRight: {
    points: ['bl', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['br', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'KeywordTrigger',
  props: {
    loading: { type: Boolean, default: undefined },
    options: {
      type: Array as PropType<OptionProps[]>,
      default: () => [],
    },
    prefixCls: String,
    placement: String,
    visible: { type: Boolean, default: undefined },
    transitionName: String,
    getPopupContainer: Function,
    direction: String,
    dropdownClassName: String,
  },
  setup(props, { slots }) {
    const getDropdownPrefix = () => {
      return `${props.prefixCls}-dropdown`
    }
    const getDropdownElement = () => {
      const { options } = props
      return (
        <DropdownMenu
          prefixCls={getDropdownPrefix()}
          options={options}
          v-slots={{ notFoundContent: slots.notFoundContent, option: slots.option }}
        />
      )
    }

    const getPopupPlacement = computed(() => {
      const { placement, direction } = props
      let popupPlacement = 'topRight'
      if (direction === 'rtl')
        popupPlacement = placement === 'top' ? 'topLeft' : 'bottomLeft'
      else
        popupPlacement = placement === 'top' ? 'topRight' : 'bottomRight'

      return popupPlacement
    })
    return () => {
      const { visible, transitionName, getPopupContainer } = props
      return (
        <VcTrigger
          prefixCls={getDropdownPrefix()}
          popupVisible={visible}
          popup={getDropdownElement()}
          popupClassName={props.dropdownClassName}
          popupPlacement={getPopupPlacement.value}
          popupTransitionName={transitionName}
          builtinPlacements={BUILT_IN_PLACEMENTS}
          getPopupContainer={getPopupContainer}
          v-slots={{ default: slots.default }}
        >
        </VcTrigger>
      )
    }
  },
})
