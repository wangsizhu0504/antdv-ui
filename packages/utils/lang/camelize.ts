export function cacheStringFunction(fn: Function) {
  const cache = Object.create(null);
  return (str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
const camelizeRE = /-(\w)/g;
export const camelize = cacheStringFunction((str: string) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cacheStringFunction((str: string) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

export const capitalize = cacheStringFunction((str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
