import type { RefObject } from '../types'

export function createRef(): any {
  const func: RefObject = (node: any) => {
    func.current = node
  }
  return func
}

export function fillRef<T>(ref: any, node: T) {
  if (typeof ref === 'function')
    ref(node)
  else if (typeof ref === 'object' && ref && 'current' in ref)
    (ref as any).current = node
}

/**
 * Merge refs into one ref function to support ref passing.
 */
export function composeRef<T>(...refs: any[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      fillRef(ref, node)
    })
  }
}
