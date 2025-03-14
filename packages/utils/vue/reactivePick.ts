import type { UnwrapRef } from 'vue';
import fromPairs from 'lodash-es/fromPairs';
import { reactive, toRef } from 'vue';

/**
 * Reactively pick fields from a reactive object
 *
 * @see https://vueuse.js.org/reactivePick
 */
export function reactivePick<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): { [S in K]: UnwrapRef<T[S]> } {
  return reactive(fromPairs(keys.map(k => [k, toRef(obj, k)]))) as any;
}
