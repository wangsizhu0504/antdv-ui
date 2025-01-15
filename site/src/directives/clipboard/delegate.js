import closest from './closest';

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {string} selector
 * @param {string} type
 * @param {Function} callback
 * @param {boolean} useCapture
 * @return {object}
 */
function _delegate(element, selector, type, callback, useCapture) {
  const listenerFn = listener.apply(this, arguments);

  element.addEventListener(type, listenerFn, useCapture);

  return {
    destroy() {
      element.removeEventListener(type, listenerFn, useCapture);
    },
  };
}

/**
 * Delegates event to a selector.
 *
 * @param {Element | string | Array} [elements]
 * @param {string} selector
 * @param {string} type
 * @param {Function} callback
 * @param {boolean} useCapture
 * @return {object}
 */
function delegate(elements, selector, type, callback, useCapture) {
  // Handle the regular Element usage
  if (typeof elements.addEventListener === 'function')
    // eslint-disable-next-line prefer-spread
    return _delegate.apply(null, arguments);

  // Handle Element-less usage, it defaults to global delegation
  if (typeof type === 'function') {
    // Use `document` as the first parameter, then apply arguments
    // This is a short way to .unshift `arguments` without running into deoptimizations
    // eslint-disable-next-line prefer-spread
    return _delegate.bind(null, document).apply(null, arguments);
  }

  // Handle Selector-based usage
  if (typeof elements === 'string')
    elements = document.querySelectorAll(elements);

  // Handle Array-like based usage
  return Array.prototype.map.call(elements, (element) => {
    return _delegate(element, selector, type, callback, useCapture);
  });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {string} selector
 * @param {string} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
  return function (e) {
    e.delegateTarget = closest(e.target, selector);

    if (e.delegateTarget)
      callback.call(element, e);
  };
}

export default delegate;
