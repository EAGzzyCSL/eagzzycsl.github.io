/* eslint-disable import/extensions */
import { IMetroLineRaw, IMetroStationRaw } from '../type'

import linesRaw from './lines.json'
import stationsRaw from './stations.json'

export const metroStationsRaw = stationsRaw as IMetroStationRaw[]

export const metroLinesMapRaw = linesRaw as Record<string, IMetroLineRaw>

// 画布的整体大小
export const metroSize: [number, number] = [1280, 1300]
