import React, { useState } from 'react'

import { GetStaticPropsResult } from 'next'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'
import { ToggleButtonGroup, ToggleButton } from '@/ui/material'

import Earth from './parts/Earth'
import theme from './theme'
import { TMode } from './type'
import styles from './ViewInEarth.module.scss'

const ViewInEarth = (): JSX.Element => {
  const [mode, setMode] = useState<TMode>('light')

  return (
    <AppPage title='如果地球是向内的' theme={theme} fullHeight>
      <section className={styles.viewInEarth}>
        <div className={styles.earthContainer}>
          <Earth mode={mode} />
        </div>
        <div className={styles.appBarContainer}>
          <SimpleAppBar title='如果地球是向内的' inverse>
            <div className={styles.appBarContent}>
              <ToggleButtonGroup
                color='secondary'
                exclusive
                size='small'
                value={mode}
                onChange={(e, newValue) => {
                  if (newValue) {
                    setMode(newValue)
                  }
                }}
              >
                <ToggleButton
                  value='dark'
                  sx={{
                    color: 'white',
                  }}
                >
                  深色
                </ToggleButton>
                <ToggleButton
                  value='light'
                  sx={{
                    color: 'white',
                  }}
                >
                  浅色
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </SimpleAppBar>
        </div>
      </section>
    </AppPage>
  )
}

export default ViewInEarth

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
