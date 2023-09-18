export interface CardTabListType {
  key: string
  tab: any
  /** @deprecated Please use `customTab` instead. */
  slots?: { tab: string }
  disabled?: boolean
}

export type CardType = 'inner'
export type CardSize = 'default' | 'small'
