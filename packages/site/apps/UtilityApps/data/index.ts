import { AppInfoItemRaw } from '../type'
import { generateAppsList } from '../utils'

import appsListData from './list.yml'

export const appsList = generateAppsList(appsListData as AppInfoItemRaw[])

export const LAST_UPDATED = '2021-12-12'
