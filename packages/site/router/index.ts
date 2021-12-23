import path from 'path'

import { NextRouter, useRouter as useNextRouter } from 'next/router'
import { useMemo } from 'react'

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
   *
   * @param app 目标app
   * @param page 目标app页面
   * @param pageAs 目标页面真实路径（动态路由的情况）
   */
  push<A extends keyof RouteMap>(
    app: A,
    page: RouteMap[A],
    pageAs?: string,
  ): void {
    const { router } = this

    const appPath = sitemap.appMap[app].root
      ? sitemap.appMap[app].root
      : `/${camel2kebab(app)}`
    const realPage = pageAs ? `/${pageAs}` : page

    const url = appPath === '/' ? page : `${appPath}${page}`
    const urlAs = appPath === '/' ? realPage : `${appPath}${realPage}`

    Logger.myRouter.log('myRouter.push', { app, page, pageAs, url, urlAs })

    router.push(url, urlAs)
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
