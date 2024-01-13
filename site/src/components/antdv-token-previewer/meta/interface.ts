import type { ComponentTokenMap } from '@antdv/components/theme/interface'

export interface TokenMeta {
  type: string

  // Name
  name: string
  nameEn: string

  // Description
  desc: string
  descEn: string

  // Source
  source: 'seed' | 'map' | 'alias' | 'custom' | keyof ComponentTokenMap
}

export type TokenMetaMap = Record<string, TokenMeta>

// 二级分类，如品牌色、中性色等
export interface TokenGroup<T> {
  key: string

  // Group name
  name: string
  nameEn: string

  // Description
  desc: string
  descEn: string

  // Type
  type?: string

  // Seed token
  seedToken?: T[]
  mapToken?: T[]
  aliasToken?: T[]

  // Children Group
  groups?: Array<TokenGroup<T>>

  // Extra
  mapTokenGroups?: string[]
  aliasTokenDescription?: string
}

// 一级分类，如颜色、尺寸等
export interface TokenCategory<T> {
  // Category name
  name: string
  nameEn: string

  // Description
  desc: string
  descEn: string

  groups: Array<TokenGroup<T>>
}

export type TokenTree<T extends string = string> = Array<TokenCategory<T>>
