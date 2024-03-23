import React, { useCallback, useState } from 'react'

import { GetStaticPropsResult } from 'next'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'
import { Grid3x3RoundedIcon } from '@/ui/icons'
import { Drawer } from '@/ui/material'

import { metroLinesMapRaw, metroStationsRaw, metroSize } from './data'
import styles from './MetroConstellation.module.scss'
import LegendPanel from './parts/LegendPanel'
import MetroMap from './parts/MetroMap'
import theme from './theme'
import { IMetroLine, IMetroLinesMap } from './type'

const MetroConstellation = (): JSX.Element => {
  const [panelVisible, setPanelVisible] = useState(false)

  const [metroLinesMap, setMetroLinesMap] = useState<IMetroLinesMap>(() =>
    Object.fromEntries(
      Object.entries(metroLinesMapRaw).map(([no, line]) => [
        no,
        {
          ...line,
          no,
          colorful: false,
          active: false,
          lineate: true,
        },
      ]),
    ),
  )

  const updateMetroLine = useCallback(
    (no: string, metroLine: IMetroLine): void => {
      setMetroLinesMap(preState => ({
        ...preState,
        [no]: {
          ...metroLine,
        },
      }))
    },
    [setMetroLinesMap],
  )

  const [enableAdjust, setEnableAdjust] = useState(false)

  return (
    <AppPage title='地铁星座' theme={theme} fullHeight>
      <section className={styles.metroConstellation}>
        <SimpleAppBar
          title='地铁星座'
          inverse
          sticky
          extraIcons={[
            {
              visible: 'always',
              component: <Grid3x3RoundedIcon />,
              tooltip: '控制面板',
              onClick: () => {
                setPanelVisible(true)
              },
            },
          ]}
        />
        <MetroMap
          metroLinesMap={metroLinesMap}
          metroStationsRaw={metroStationsRaw}
          metroSize={metroSize}
          enableAdjust={enableAdjust}
        />
        <Drawer
          anchor='right'
          open={panelVisible}
          onClose={() => {
            setPanelVisible(false)
          }}
        >
          <LegendPanel
            metroLinesMap={metroLinesMap}
            updateMetroLine={updateMetroLine}
            enableAdjust={enableAdjust}
            setEnableAdjust={setEnableAdjust}
          />
        </Drawer>
      </section>
    </AppPage>
  )
}

export default MetroConstellation

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
