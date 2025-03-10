import { unit } from '@antdv/cssinjs';

function genMaxMin(type: 'css' | 'js') {
  if (type === 'js') {
    return { max: Math.max, min: Math.min };
  }
  return {
    max: (...args: Array<string | number>) => `max(${args.map(value => unit(value)).join(',')})`,
    min: (...args: Array<string | number>) => `min(${args.map(value => unit(value)).join(',')})`,
  };
}

export default genMaxMin;
