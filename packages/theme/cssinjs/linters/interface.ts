export interface LinterInfo {
  path?: string
  hashId?: string
  parentSelectors: string[]
}

export type Linter = (key: string, value: string | number, info: LinterInfo) => void;
