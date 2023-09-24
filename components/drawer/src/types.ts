import type { PlacementTypes } from '../../constant'

export type ILevelMove = number | [number, number]

export type placementType = (typeof PlacementTypes)[number]

const SizeTypes = ['default', 'large'] as const
export type sizeType = (typeof SizeTypes)[number]

export interface PushState {
  distance: string | number
}
