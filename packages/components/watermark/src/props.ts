import type { ExtractPropTypes } from 'vue';
import type { WatermarkFontType } from './interface';
import { arrayType, objectType, someType } from '@antdv/utils';

export function watermarkProps() {
  return {
    zIndex: Number,
    rotate: Number,
    width: Number,
    height: Number,
    image: String,
    content: someType<string | string[]>([String, Array]),
    font: objectType<WatermarkFontType>(),
    rootClassName: String,
    gap: arrayType<[number, number]>(),
    offset: arrayType<[number, number]>(),
  };
}
export type WatermarkProps = Partial<ExtractPropTypes<ReturnType<typeof watermarkProps>>>;
