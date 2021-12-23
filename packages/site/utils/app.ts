import { IManifest, IAcknowledgementItem, AppDescribe } from '@/types/app'

import { camel2kebab } from './string'

export class Manifest {
  public static acknowledgeIcon8icon(
    image: string,
    url = '',
  ): IAcknowledgementItem {
    return {
      type: 'icon',
      image,
      title: 'from icon8',
      // next不允许undefined作为props
      url,
    }
  }

  public static create<ROUTES extends string>(
    options: IManifest<ROUTES>,
  ): IManifest<ROUTES> {
    return options
  }
}

interface ISitemap<M> {
  appMap: M
  appList: AppDescribe[]
}

export const registerApps = <M extends Record<string, IManifest<string>>>(
  appMap: M,
): ISitemap<M> => ({
  appMap,
  appList: Object.entries(appMap).map(([key, app]) => {
    const appId = camel2kebab(key)
    return {
      ...app,
      // appId就是apps下的目录名
      appId: key,
      // 如果未声明root则使用appId作为root，且app的root均以/开头
      root: app.root || `/${appId}`,
      // 如果未声明shortId则使用appId作为替代
      shortId: app.shortId || appId || '#cannot-generate-shortId#',
    }
  }),
})
