import type { VNodeTypes } from 'vue'

export type valueType = number | string
export type countdownValueType = number | string

export type Formatter =
  | false
  | 'number'
  | 'countdown'
  | (({ value, config }: { value: valueType, config?: FormatConfig }) => VNodeTypes)

export interface FormatConfig {
  formatter?: Formatter
  decimalSeparator?: string
  groupSeparator?: string
  precision?: number
  prefixCls?: string
}

export interface CountdownFormatConfig extends FormatConfig {
  format?: string
}

export interface NumberProps extends FormatConfig {
  value: valueType
}
