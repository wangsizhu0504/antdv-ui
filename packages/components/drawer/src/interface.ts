import type { PlacementTypes } from './props';

export type ILevelMove = number | [number, number];

export type placementType = (typeof PlacementTypes)[number];

const SizeTypes = ['default', 'large'] as const;
export type sizeType = (typeof SizeTypes)[number];

export interface PushState {
  distance: string | number
}

export interface scrollLockOptions {
  container: HTMLElement
}
export type IPlacement = 'left' | 'top' | 'right' | 'bottom';
