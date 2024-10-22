import is from './is'
import delegate from './delegate'

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {string | HTMLElement | HTMLCollection | NodeList} target
 * @param {string} type
 * @param {Function} callback
 * @return {object}
 */
function listen(target, type, callback) {
  if (!target && !type && !callback)
    throw new Error('Missing required arguments')

  if (!is.string(type))
    throw new TypeError('Second argument must be a String')

  if (!is.fn(callback))
    throw new TypeError('Third argument must be a Function')

  if (is.node(target)) {
    return listenNode(target, type, callback)
  } else if (is.nodeList(target)) {
    return listenNodeList(target, type, callback)
  } else if (is.string(target)) {
    return listenSelector(target, type, callback)
  } else {
    throw new TypeError(
      'First argument must be a String, HTMLElement, HTMLCollection, or NodeList',
    )
  }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {string} type
 * @param {Function} callback
 * @return {object}
 */
function listenNode(node, type, callback) {
  node.addEventListener(type, callback)

  return {
    destroy() {
      node.removeEventListener(type, callback)
    },
  }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {string} type
 * @param {Function} callback
 * @return {object}
 */
function listenNodeList(nodeList, type, callback) {
  Array.prototype.forEach.call(nodeList, (node) => {
    node.addEventListener(type, callback)
  })

  return {
    destroy() {
      Array.prototype.forEach.call(nodeList, (node) => {
        node.removeEventListener(type, callback)
      })
    },
  }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {string} selector
 * @param {string} type
 * @param {Function} callback
 * @return {object}
 */
function listenSelector(selector, type, callback) {
  return delegate(document.body, selector, type, callback)
}

export default listen
