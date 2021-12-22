import { IManifest, IAcknowledgementItem } from '@/types/app'

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
