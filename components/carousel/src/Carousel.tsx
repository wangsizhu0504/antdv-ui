import { computed, defineComponent, ref, watchEffect } from 'vue'
import { warning } from '../../_utils/log'
import { classNames } from '../../_utils/dom'
import { useConfigInject } from '../../hooks'
import useStyle from '../style'
import SlickCarousel from './Slider'
import { carouselProps } from './props'
import type { CarouselRef } from './types'
import type { CSSProperties } from 'vue'

// Carousel
export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ACarousel',
  inheritAttrs: false,
  props: carouselProps(),
  setup(props, { slots, attrs, expose }) {
    const slickRef = ref()

    const goTo = (slide: number, dontAnimate = false) => {
      slickRef.value?.slickGoTo(slide, dontAnimate)
    }

    expose({
      goTo,
      autoplay: (palyType) => {
        slickRef.value?.innerSlider?.handleAutoPlay(palyType)
      },
      prev: () => {
        slickRef.value?.slickPrev()
      },
      next: () => {
        slickRef.value?.slickNext()
      },
      innerSlider: computed(() => {
        return slickRef.value?.innerSlider
      }),
    } as CarouselRef)
    watchEffect(() => {
      warning(
        props.vertical === undefined,
        'Carousel',
        '`vertical` is deprecated, please use `dotPosition` instead.',
      )
    })
    const { prefixCls, direction } = useConfigInject('carousel', props)

    // style
    const [wrapSSR, hashId] = useStyle(prefixCls)

    const dotPosition = computed(() => {
      if (props.dotPosition) return props.dotPosition
      if (props.vertical !== undefined) return props.vertical ? 'right' : 'bottom'
      return 'bottom'
    })
    const vertical = computed(() => dotPosition.value === 'left' || dotPosition.value === 'right')
    const dsClass = computed(() => {
      const dotsClass = 'slick-dots'
      return classNames({
        [dotsClass]: true,
        [`${dotsClass}-${dotPosition.value}`]: true,
        [`${props.dotsClass}`]: !!props.dotsClass,
      })
    })
    return () => {
      const { dots, arrows, draggable, effect } = props
      const { class: cls, style, ...restAttrs } = attrs
      const fade = effect === 'fade' ? true : props.fade
      const className = classNames(
        prefixCls.value,
        {
          [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
          [`${prefixCls.value}-vertical`]: vertical.value,
          [`${cls}`]: !!cls,
        },
        hashId.value,
      )
      return wrapSSR(
        <div class={className} style={style as CSSProperties}>
          <SlickCarousel
            ref={slickRef}
            {...props}
            {...restAttrs}
            dots={!!dots}
            dotsClass={dsClass.value}
            arrows={arrows}
            draggable={draggable}
            fade={fade}
            vertical={vertical.value}
            v-slots={slots}
          />
        </div>,
      )
    }
  },
})
