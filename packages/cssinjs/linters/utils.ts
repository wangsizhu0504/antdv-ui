import type { LinterInfo } from './interface';
import { warning } from '@antdv/utils';

export function lintWarning(message: string, info: LinterInfo) {
  const { path, parentSelectors } = info;

  warning(
    false,
    `[CSS-in-JS] ${path ? `Error in '${path}': ` : ''}${message}${
      parentSelectors.length ? ` Selector info: ${parentSelectors.join(' -> ')}` : ''
    }`,
  );
}
