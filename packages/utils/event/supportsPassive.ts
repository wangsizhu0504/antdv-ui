// Test via a getter in the options object to see if the passive property is accessed
// eslint-disable-next-line import/no-mutable-exports
let supportsPassive = false
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true
    },
  })
  window.addEventListener('testPassive', null, opts)
  window.removeEventListener('testPassive', null, opts)
} catch (e) {}

export { supportsPassive }
