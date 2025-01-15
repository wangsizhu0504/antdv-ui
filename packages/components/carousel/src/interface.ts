export type SwipeDirection = 'left' | 'down' | 'right' | 'up' | string;

export type LazyLoadTypes = 'ondemand' | 'progressive';

export type CarouselEffect = 'scrollx' | 'fade';
export type DotPosition = 'top' | 'bottom' | 'left' | 'right';

export interface CarouselRef {
  goTo: (slide: number, dotAnimate?: boolean) => void
  next: () => void
  prev: () => void
  autoplay: (palyType?: 'update' | 'leave' | 'blur') => void
  innerSlider: any
}
