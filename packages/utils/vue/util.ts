import type { VueNode } from '@antdv/types';
import { isFunction } from '../is';

const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);

// change from vue sourcecode
export function resolvePropValue(options, props, key, value) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, 'default');
    // default values
    if (hasDefault && value === undefined) {
      const defaultValue = opt.default;
      value = opt.type !== Function && isFunction(defaultValue) ? defaultValue() : defaultValue;
    }
    // boolean casting
    if (opt.type === Boolean) {
      if (!hasOwn(props, key) && !hasDefault)
        value = false;
      else if (value === '')
        value = true;
    }
  }
  return value;
}

export function getDataAndAriaProps(props: any) {
  return Object.keys(props).reduce((memo, key) => {
    if (key.startsWith('data-') || key.startsWith('aria-'))
      memo[key] = props[key];

    return memo;
  }, {});
}

export function toPx(val: any) {
  if (typeof val === 'number') return `${val}px`;
  return val;
}

export function renderHelper<T = Record<string, any>>(
  v: VueNode | ((arg0: T) => VueNode),
  props: T = {} as T,
  defaultV?: any,
) {
  if (typeof v === 'function')
    return v(props);

  return v ?? defaultV;
}

export function wrapPromiseFn(openFn: (resolve: VoidFunction) => VoidFunction) {
  let closeFn: VoidFunction;

  const closePromise = new Promise<boolean>((resolve) => {
    closeFn = openFn(() => {
      resolve(true);
    });
  });

  const result: any = () => {
    closeFn?.();
  };

  result.then = (filled: VoidFunction, rejected: VoidFunction) => closePromise.then(filled, rejected);
  result.promise = closePromise;

  return result;
}

export function withUndefined<T extends { default?: any }>(type: T): T {
  type.default = undefined;
  return type;
}
