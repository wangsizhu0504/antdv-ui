import type { LegacyButtonType } from './interface';
import type { ButtonProps } from './props';

export function convertLegacyProps(type?: LegacyButtonType): ButtonProps {
  switch (type) {
    case 'danger':
      return { danger: true };
    case 'warning':
      return { warning: true };
    case 'success':
      return { success: true };
    default :
      return { type };
  }
}

export const _ButtonVariantTypes = [
  'outlined',
  'dashed',
  'solid',
  'filled',
  'text',
  'link',
] as const;
export type ButtonVariantType = (typeof _ButtonVariantTypes)[number];
