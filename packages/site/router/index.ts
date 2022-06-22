import { useMemo } from 'react'

import path from 'path'

import { NextRouter, useRouter as useNextRouter } from 'next/router'

import { AppDescribe } from '@/types/app'
import Logger from '@/utils/logger'
import { camel2kebab } from '@/utils/string'

import sitemap from '../sitemap'

type RouteMap = {
  [K in keyof typeof sitemap.appMap]: keyof typeof sitemap.appMap[K]['router']
}

/**
 * 获取路由的上层app对应的appPath
 * /404 => /
 * /blog => /
 * /blog/[postId] => /blog
 *
 * 目前路由构建比较简单暂时使用path方式实现
 * TODO: 利用appMap生成路由与上层页面的映射关系
 */
export const getParentAppPath = (route: string): string =>
  path.resolve('/', route, '../')

const HistoryRecordOfRouteContext: Record<string, boolean> = Object.create({})

export class MyRouter {
  private router: NextRouter

  private historyRecordOfRoute: Record<string, boolean>

  constructor(
    router: NextRouter,
    historyRecordOfRoute: Record<string, boolean>,
  ) {
    this.router = router
    this.historyRecordOfRoute = historyRecordOfRoute
  }

  /**
   * 跳转到App
   */
  navToApp(app: AppDescribe): void {
    if (app.root !== '/') {
      this.router.push(app.root)
    }
  }

  /**
   *
   * @param appName 目标app名
   * @param pageName 目标app页面路由名（也就是路径，如果是动态路由的话就是[postId]这种）
   * @param pageAs 目标页面真实路径（动态路由的情况下使用）
   */
  push<A extends keyof RouteMap>(
    appName: A,
    pageName: RouteMap[A],
    options?: {
      pageAs?: string
      newWindow?: boolean
    },
  ): void {
    const { router } = this

    // 如果 app 自定义了 root（启动器），以 app 自定义的 root 作为 appPath
    const appPath = sitemap.appMap[appName].root
      ? ''
      : `/${camel2kebab(appName)}`

    // 如果是动态路由，以 pageAs 为准
    const realPage = options?.pageAs ? `/${options.pageAs}` : pageName

    // 拼接喂给 nextRouter 的 url 和 urlAs
    const url = `${appPath}${String(pageName)}`
    const urlAs = `${appPath}${realPage}`

    Logger.myRouter.log('myRouter.push', {
      app: appName,
      pageName,
      pageAs: options?.pageAs,
      url,
      urlAs,
    })

    if (options?.newWindow) {
      window.open(document.location.origin + urlAs, '_blank')
    } else {
      router.push(url, urlAs)
    }
  }

  /**
   * 路由的返回，
   * 如果上级页面在history中存在，那么直接go到对应history
   * 否则使用replace跳到上级页面
   */
  backToParent(): void {
    // 如果父页面在历史中有记录，那就正常返回，如果父页面在历史中没记录，那就直接push，这样才符合浏览器的习惯
    // blog目录的问题另外解决
    const { router } = this

    const parentAppPath = getParentAppPath(router.route)
    Logger.myRouter.log('myRouter.backToParent', {
      route: router.route,
      parentAppPath,
      currentHistoryLength: window.history.length,
    })
    if (this.couldBack()) {
      router.back()
    } else {
      router.replace(parentAppPath)
    }
  }

  /**
   * 是否可以通过返回的方式返回上级页面
   */
  couldBack(): boolean {
    const { router } = this

    const parentAppPath = getParentAppPath(router.route)
    const cloudBack = this.historyRecordOfRoute[parentAppPath]

    Logger.myRouter.log('myRouter.couldBack', {
      route: router.route,
      parentAppPath,
    })
    Logger.myRouter.log(
      'myRouter.couldBack.historyRecordOfRoute',
      this.historyRecordOfRoute,
    )
    return !!cloudBack
  }

  getQuery<T>(): T {
    const { router } = this

    return router.query as unknown as T
  }

  recordRouteLoaded(route: string, from: 'routeChange' | 'windowLoad'): void {
    // 统一去掉route的结尾slash，避免和getParentAppPath得到的结果不一致
    const routeWithoutEndSlash = path.resolve('/', route)
    this.historyRecordOfRoute[routeWithoutEndSlash] = true
    Logger.myRouter.log('recordRouteLoaded', { route, from })
    Logger.myRouter.log(
      'historyRecordOfRouteAfterRecordRouteLoaded',
      this.historyRecordOfRoute,
    )
  }
}

export const useMyRouter = (): MyRouter => {
  const router = useNextRouter()
  const myRouter = useMemo(
    () => new MyRouter(router, HistoryRecordOfRouteContext),
    [router],
  )
  return myRouter
}
