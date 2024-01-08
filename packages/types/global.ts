import type { PropType, Ref, SlotsType, VNode } from 'vue'

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

type DefaultFactory<T> = (props: Data) => T | null | undefined

export interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null
  required?: boolean
  default?: D | DefaultFactory<D> | null | undefined | object
  validator?(value: unknown): boolean
}

declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void
export type VueNode = VNodeChildAtom | VNodeChildAtom[] | JSX.Element

export type MaybeRef<T> = T | Ref<T>

export type getContainerFunc = () => HTMLElement

export type RawValue = string | number
export interface LabeledValue {
  key?: string
  value: RawValue
  label?: any
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined

export type Recordable<T = any> = Record<string, T>

export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Record<Breakpoint, string>
export type ScreenMap = Partial<Record<Breakpoint, boolean>>
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>

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
