export interface Manifest {
  // 路由根目录
  root?: string
  icon: string
  title: string
  // app下的子路由
  router: Record<string, string>
}

export interface AppDescribe {
  appId: string
  root: string
  icon: string
  title: string
  router: Record<string, string>
}
