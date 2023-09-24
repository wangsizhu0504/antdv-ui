export interface Route {
  path: string
  breadcrumbName: string
  children?: Omit<Route, 'children'>[]
}
