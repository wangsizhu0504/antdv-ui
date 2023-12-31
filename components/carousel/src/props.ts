import { PropTypes, booleanType, functionType, stringType } from '../../_utils/vue'
import type { CarouselEffect, DotPosition, LazyLoadTypes, SwipeDirection } from './types'
import type { ExtractPropTypes } from 'vue'

export const carouselProps = () => ({
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
})

export const carouselSliderProps = () => ({
  accessibility: { type: Boolean, default: true },
  // 自定义高度
  adaptiveHeight: { type: Boolean, default: false },
  afterChange: PropTypes.any.def(null),
  arrows: { type: Boolean, default: true },
  autoplay: { type: Boolean, default: false },
  autoplaySpeed: PropTypes.number.def(3000),
  beforeChange: PropTypes.any.def(null),
  centerMode: { type: Boolean, default: false },
  centerPadding: PropTypes.string.def('50px'),
  cssEase: PropTypes.string.def('ease'),
  dots: { type: Boolean, default: false },
  dotsClass: PropTypes.string.def('slick-dots'),
  draggable: { type: Boolean, default: true },
  unslick: { type: Boolean, default: false },
  easing: PropTypes.string.def('linear'),
  edgeFriction: PropTypes.number.def(0.35),
  fade: { type: Boolean, default: false },
  focusOnSelect: { type: Boolean, default: false },
  infinite: { type: Boolean, default: true },
  initialSlide: PropTypes.number.def(0),
  lazyLoad: PropTypes.any.def(null),
  verticalSwiping: { type: Boolean, default: false },
  asNavFor: PropTypes.any.def(null),
  // 圆点hover是否暂停
  pauseOnDotsHover: { type: Boolean, default: false },
  // focus是否暂停
  pauseOnFocus: { type: Boolean, default: false },
  // hover是否暂停
  pauseOnHover: { type: Boolean, default: true },
  responsive: PropTypes.array,
  rows: PropTypes.number.def(1),
  rtl: { type: Boolean, default: false },
  slide: PropTypes.string.def('div'),
  slidesPerRow: PropTypes.number.def(1),
  slidesToScroll: PropTypes.number.def(1),
  slidesToShow: PropTypes.number.def(1),
  speed: PropTypes.number.def(500),
  swipe: { type: Boolean, default: true },
  swipeEvent: PropTypes.any.def(null),
  swipeToSlide: { type: Boolean, default: false },
  touchMove: { type: Boolean, default: true },
  touchThreshold: PropTypes.number.def(5),
  useCSS: { type: Boolean, default: true },
  useTransform: { type: Boolean, default: true },
  variableWidth: { type: Boolean, default: false },
  vertical: { type: Boolean, default: false },
  waitForAnimate: { type: Boolean, default: true },
  children: PropTypes.array,
  __propsSymbol__: PropTypes.any,
})

export type CarouselProps = Partial<ExtractPropTypes<ReturnType<typeof carouselProps>>>
