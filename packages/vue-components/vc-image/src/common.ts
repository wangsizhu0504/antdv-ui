import type { ImgHTMLAttributes } from 'vue';

export const COMMON_PROPS: Array<keyof Omit<ImgHTMLAttributes, 'src'>> = [
  'crossorigin',
  'decoding',
  'draggable',
  'loading',
  'referrerpolicy',
  'sizes',
  'srcset',
  'usemap',
  'alt',
];
