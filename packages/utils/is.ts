import { Comment, Fragment, Text } from 'vue';
import { warningOnce } from './log';

export function isNumeric(value: any): boolean {
  return !Number.isNaN(Number.parseFloat(value)) && Number.isFinite(value);
}
export function isValidValue(val: any) {
  return val !== undefined && val !== null;
}
export function isValid(value: any): boolean {
  return value !== undefined && value !== null && value !== '';
}
export function isWindow(obj: any): obj is Window {
  return obj !== null && obj !== undefined && obj === obj.window;
}
export const isFunction = val => typeof val === 'function';
export const controlDefaultValue = Symbol('controlDefaultValue') as any;
export const isArray = Array.isArray;
export const isString = val => typeof val === 'string';
export const isSymbol = val => typeof val === 'symbol';
export const isObject = val => val !== null && typeof val === 'object';
const onRE = /^on[^a-z]/;
export const isOn = key => onRE.test(key);

export function isFragment(c: any) {
  return c.length === 1 && c[0].type === Fragment;
}

export function isEmptyContent(c: any) {
  return c === undefined || c === null || c === '' || (Array.isArray(c) && c.length === 0);
}

export function isEmptyElement(c: any) {
  return (
    c
    && (c.type === Comment
      || (c.type === Fragment && c.children.length === 0)
      || (c.type === Text && c.children.trim() === ''))
  );
}

export function isEmptySlot(c: any) {
  return !c || c().every(isEmptyElement);
}

export function isStringElement(c: any) {
  return c && c.type === Text;
}

export function isValidElement(element: any) {
  if (Array.isArray(element) && element.length === 1)
    element = element[0];

  return element && element.__v_isVNode && typeof element.type !== 'symbol'; // remove text node
}
export function isVisible(element: HTMLElement | SVGGraphicsElement): boolean {
  if (!element)
    return false;

  if ((element as HTMLElement).offsetParent)
    return true;

  if ((element as SVGGraphicsElement).getBBox) {
    const box = (element as SVGGraphicsElement).getBBox();
    if (box.width || box.height)
      return true;
  }

  if ((element as HTMLElement).getBoundingClientRect) {
    const box = (element as HTMLElement).getBoundingClientRect();
    if (box.width || box.height)
      return true;
  }

  return false;
}

/**
 * Deeply compares two object literals.
 * @param obj1 object 1
 * @param obj2 object 2
 * @param shallow shallow compare
 * @returns
 */
export function isEqual(obj1: any, obj2: any, shallow = false): boolean {
  // https://github.com/mapbox/mapbox-gl-js/pull/5979/files#diff-fde7145050c47cc3a306856efd5f9c3016e86e859de9afbd02c879be5067e58f
  const refSet = new Set<any>();
  function deepEqual(a: any, b: any, level = 1): boolean {
    const circular = refSet.has(a);
    warningOnce(!circular, 'Warning: There may be circular references');
    if (circular)
      return false;

    if (a === b)
      return true;

    if (shallow && level > 1)
      return false;

    refSet.add(a);
    const newLevel = level + 1;
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length)
        return false;

      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i], newLevel))
          return false;
      }
      return true;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      const keys = Object.keys(a);
      if (keys.length !== Object.keys(b).length)
        return false;

      return keys.every(key => deepEqual(a[key], b[key], newLevel));
    }
    // other
    return false;
  }

  return deepEqual(obj1, obj2);
}

export function isMobile() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined')
    return false;

  const agent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      agent,
    )
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-([mpt])|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c([\- _agpst])|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac([ \-/])|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/([klu])|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t([\- ov])|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50([025])|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan([adt])|pdxg|pg(13|-([1-8c]))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c([\-01])|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      agent?.substring(0, 4),
    )
  );
}
