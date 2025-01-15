import type { ExtractPropTypes } from 'vue'
import type { CarouselEffect, DotPosition, LazyLoadTypes, SwipeDirection } from './interface'
import { booleanType, functionType, PropTypes, stringType } from '@antdv/utils'

// Carousel
export function carouselProps() {
  return {
    effect: stringType<CarouselEffect>(),
    dots: booleanType(true),
    vertical: booleanType(),
    autoplay: booleanType(),
    easing: String,
    beforeChange: functionType<(currentSlide: number, nextSlide: number) => void>(),
    afterChange: functionType<(currentSlide: number) => void>(),
    // style: PropTypes.React.CSSProperties,
    prefixCls: String,
    accessibility: booleanType(),
    nextArrow: PropTypes.any,
    prevArrow: PropTypes.any,
    pauseOnHover: booleanType(),
    // className: String,
    adaptiveHeight: booleanType(),
    arrows: booleanType(false),
    autoplaySpeed: Number,
    centerMode: booleanType(),
    centerPadding: String,
    cssEase: String,
    dotsClass: String,
    draggable: booleanType(false),
    fade: booleanType(),
    focusOnSelect: booleanType(),
    infinite: booleanType(),
    initialSlide: Number,
    lazyLoad: stringType<LazyLoadTypes>(),
    rtl: booleanType(),
    slide: String,
    slidesToShow: Number,
    slidesToScroll: Number,
    speed: Number,
    swipe: booleanType(),
    swipeToSlide: booleanType(),
    swipeEvent: functionType<(swipeDirection: SwipeDirection) => void>(),
    touchMove: booleanType(),
    touchThreshold: Number,
    variableWidth: booleanType(),
    useCSS: booleanType(),
    slickGoTo: Number,
    responsive: Array,
    dotPosition: stringType<DotPosition>(),
    verticalSwiping: booleanType(false),
  }
}
export type CarouselProps = Partial<ExtractPropTypes<ReturnType<typeof carouselProps>>>
