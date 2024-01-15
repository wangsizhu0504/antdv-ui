import type { BaseTransitionProps, SlotsType } from 'vue'

/**
 * https://stackoverflow.com/a/59187769
 * Extract the type of an element of an array/tuple without performing indexing
 */
export type ElementOf<T> = T extends Array<infer E> ? E : T extends ReadonlyArray<infer F> ? F : never

/**
 * https://github.com/Microsoft/TypeScript/issues/29729
 */
export type LiteralUnion<T extends string> = T | (string & {})

export type Data = Record<string, unknown>

export type Key = string | number

export type getContainerFunc = () => HTMLElement

export type RawValue = string | number
export interface LabeledValue {
  key?: string
  value: RawValue
  label?: any
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined

export type Recordable<T = any> = Record<string, T>

export type CustomSlotsType<T> = SlotsType<T>

export interface AdjustOverflow {
  adjustX?: 0 | 1
  adjustY?: 0 | 1
}

export interface PlacementsConfig {
  arrowWidth?: number
  horizontalArrowShift?: number
  verticalArrowShift?: number
  arrowPointAtCenter?: boolean
  autoAdjustOverflow?: boolean | AdjustOverflow
}

export interface CSSMotionProps extends Partial<BaseTransitionProps<Element>> {
  name?: string
  css?: boolean
}
