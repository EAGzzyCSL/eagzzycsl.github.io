export interface Manifest<ROUTES extends string> {
  // 路由根目录
  root?: string
  icon: string
  title: string
  // app下的子路由
  router: Record<ROUTES, string>
}

export interface StaticPath<P> {
  params: P
}

export interface StaticPathsResponse<P> {
  paths: StaticPath<P>[]
  fallback: boolean
}

export interface AppDescribe {
  appId: string
  root: string
  icon: string
  title: string
  router: Record<string, string>
}
