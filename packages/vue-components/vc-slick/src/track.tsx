import type { CSSProperties } from 'vue';
import { classNames, deepCloneElement, flattenChildren } from '@antdv/utils';
import { createVNode } from 'vue';
import { getPreClones, lazyEndIndex, lazyStartIndex } from './utils/innerSliderUtils';

// given specifications/props for a slide, fetch all the classes that need to be applied to the slide
function getSlideClasses(spec) {
  let slickActive, slickCenter;
  let centerOffset, index;

  if (spec.rtl)
    index = spec.slideCount - 1 - spec.index;
  else
    index = spec.index;

  const slickCloned = index < 0 || index >= spec.slideCount;
  if (spec.centerMode) {
    centerOffset = Math.floor(spec.slidesToShow / 2);
    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;
    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset)
      slickActive = true;
  } else {
    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
  }
  let focusedSlide;
  if (spec.targetSlide < 0)
    focusedSlide = spec.targetSlide + spec.slideCount;
  else if (spec.targetSlide >= spec.slideCount)
    focusedSlide = spec.targetSlide - spec.slideCount;
  else
    focusedSlide = spec.targetSlide;

  const slickCurrent = index === focusedSlide;
  return {
    'slick-slide': true,
    'slick-active': slickActive,
    'slick-center': slickCenter,
    'slick-cloned': slickCloned,
    'slick-current': slickCurrent, // dubious in case of RTL
  };
}

const getSlideStyle = function (spec) {
  const style: CSSProperties = {};

  if (spec.variableWidth === undefined || spec.variableWidth === false)
    style.width = spec.slideWidth + (typeof spec.slideWidth === 'number' ? 'px' : '');

  if (spec.fade) {
    style.position = 'relative';
    if (spec.vertical)
      style.top = `${-spec.index * Number.parseInt(spec.slideHeight)}px`;
    else
      style.left = `${-spec.index * Number.parseInt(spec.slideWidth)}px`;

    style.opacity = spec.currentSlide === spec.index ? 1 : 0;
    if (spec.useCSS) {
      style.transition
        = `opacity ${
          spec.speed
        }ms ${
          spec.cssEase
        }, `
        + `visibility ${
          spec.speed
        }ms ${
          spec.cssEase}`;
    }
  }

  return style;
};

const getKey = (child, fallbackKey) => `${child.key}-${fallbackKey}`;

const renderSlides = function (spec, children) {
  let key;
  const slides = [];
  const preCloneSlides = [];
  const postCloneSlides = [];
  const childrenCount = children.length;
  const startIndex = lazyStartIndex(spec);
  const endIndex = lazyEndIndex(spec);
  children.forEach((elem, index) => {
    let child;
    const childOnClickOptions = {
      message: 'children',
      index,
      slidesToScroll: spec.slidesToScroll,
      currentSlide: spec.currentSlide,
    };

    // in case of lazyLoad, whether or not we want to fetch the slide
    if (!spec.lazyLoad || (spec.lazyLoad && spec.lazyLoadedList.includes(index)))
      child = elem;
    else
      child = createVNode('div');

    const childStyle = getSlideStyle({ ...spec, index });
    const slideClass = child.props.class || '';
    let slideClasses = getSlideClasses({ ...spec, index });
    // push a cloned element of the desired slide
    slides.push(
      deepCloneElement(child, {
        'key': `original${getKey(child, index)}`,
        'tabindex': '-1',
        'data-index': index,
        'aria-hidden': !slideClasses['slick-active'],
        'class': classNames(slideClasses, slideClass),
        'style': { outline: 'none', ...(child.props.style || {}), ...childStyle },
        'onClick': () => {
          // child.props && child.props.onClick && child.props.onClick(e)
          if (spec.focusOnSelect)
            spec.focusOnSelect(childOnClickOptions);
        },
      }),
    );

    // if slide needs to be precloned or postcloned
    if (spec.infinite && spec.fade === false) {
      const preCloneNo = childrenCount - index;
      if (preCloneNo <= getPreClones(spec) && childrenCount !== spec.slidesToShow) {
        key = -preCloneNo;
        if (key >= startIndex)
          child = elem;

        slideClasses = getSlideClasses({ ...spec, index: key });
        preCloneSlides.push(
          deepCloneElement(child, {
            'key': `precloned${getKey(child, key)}`,
            'class': classNames(slideClasses, slideClass),
            'tabindex': '-1',
            'data-index': key,
            'aria-hidden': !slideClasses['slick-active'],
            'style': { ...(child.props.style || {}), ...childStyle },
            'onClick': () => {
              // child.props && child.props.onClick && child.props.onClick(e)
              if (spec.focusOnSelect)
                spec.focusOnSelect(childOnClickOptions);
            },
          }),
        );
      }

      if (childrenCount !== spec.slidesToShow) {
        key = childrenCount + index;
        if (key < endIndex)
          child = elem;

        slideClasses = getSlideClasses({ ...spec, index: key });
        postCloneSlides.push(
          deepCloneElement(child, {
            'key': `postcloned${getKey(child, key)}`,
            'tabindex': '-1',
            'data-index': key,
            'aria-hidden': !slideClasses['slick-active'],
            'class': classNames(slideClasses, slideClass),
            'style': { ...(child.props.style || {}), ...childStyle },
            'onClick': () => {
              // child.props && child.props.onClick && child.props.onClick(e)
              if (spec.focusOnSelect)
                spec.focusOnSelect(childOnClickOptions);
            },
          }),
        );
      }
    }
  });
  if (spec.rtl)
    return preCloneSlides.concat(slides, postCloneSlides).reverse();
  else
    return preCloneSlides.concat(slides, postCloneSlides);
};

function Track(_, { attrs, slots }) {
  const slides = renderSlides(attrs, flattenChildren(slots?.default()));
  // const slides = renderSlides(attrs,  slots?.default);
  const { onMouseenter, onMouseover, onMouseleave } = attrs;
  const mouseEvents = { onMouseenter, onMouseover, onMouseleave };
  const trackProps = {
    class: 'slick-track',
    style: attrs.trackStyle,
    ...mouseEvents,
  };
  return <div {...trackProps}>{slides}</div>;
}

Track.inheritAttrs = false;

export default Track;
