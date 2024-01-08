declare module '*.json' {
  const value: any
  export const version: string
  export default value
}

declare module '@vue/runtime-core' {

  export interface GlobalComponents {
    Component: (props: { is: Component | string }) => void
  }

}

export {}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | (new () => ComponentPublicInstance<Props>)
    | FunctionalComponent<Props>
}
