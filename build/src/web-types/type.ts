import type { PathLike } from 'node:fs'

export interface VueSlot {
  name: string;
  description: string;
}

export interface VueEventArgument {
  name: string;
  type: string;
}

export interface VueEvent {
  name: string;
  description?: string;
  arguments?: VueEventArgument[];
}

export interface VueAttribute {
  name: string;
  default: string;
  description: string;
  value: {
    kind: 'expression';
    type: string;
  };
}

export interface VueTag {
  name: string;
  filename?: string;
  slots?: VueSlot[];
  events?: VueEvent[];
  attributes?: VueAttribute[];
  description?: string;
}

export interface Options {
  name: string;
  path: PathLike;
  typingsPath: PathLike;
  test: RegExp;
  version: string;
  outputDir?: string;
  tagPrefix?: string;
}

export interface ComponentData {
  props: Definition
  slots: Definition
  events: Definition
  exposed: Definition
  name: string
  fileName: string
}
export interface DirectiveData {
  name: string
  fileName: string
  argument: { value: Definition }
  modifiers: Record<string, Definition>
}

interface BaseDefinition {
  text: string
  formatted: string
  source?: string
  description?: Record<string, string>
  descriptionSource?: Record<string, string>
  default?: string
  optional?: boolean
}

export type ObjectDefinition = {
  type: 'object'
  properties: Record<string, Definition>
} & BaseDefinition

type BooleanDefinition = {
  type: 'boolean'
  literal?: string
} & BaseDefinition

type StringDefinition = {
  type: 'string'
  literal?: string
} & BaseDefinition

type NumberDefinition = {
  type: 'number'
  literal?: string
} & BaseDefinition

type UnionDefinition = {
  type: 'anyOf'
  items: Definition[]
} & BaseDefinition

type IntersectionDefinition = {
  type: 'allOf'
  items: Definition[]
} & BaseDefinition

type ArrayDefinition = {
  type: 'array'
  items: Definition[]
  length?: number
} & BaseDefinition

type FunctionDefinition = {
  type: 'function'
  parameters: NamedDefinition[]
  returnType: Definition
} & BaseDefinition

type RefDefinition = {
  type: 'ref'
  ref: string
} & BaseDefinition

type ConstructorDefinition = {
  type: 'constructor'
} & BaseDefinition

type RecordDefinition = {
  type: 'record'
  key: Definition
  value: Definition
} & BaseDefinition

type InterfaceDefinition = {
  type: 'interface'
  name: string
  parameters: NamedDefinition[]
} & BaseDefinition

type NamedDefinition = Definition & { name: string }

export type Definition =
  | ObjectDefinition
  | BooleanDefinition
  | StringDefinition
  | NumberDefinition
  | UnionDefinition
  | IntersectionDefinition
  | ArrayDefinition
  | FunctionDefinition
  | RefDefinition
  | ConstructorDefinition
  | RecordDefinition
  | InterfaceDefinition
