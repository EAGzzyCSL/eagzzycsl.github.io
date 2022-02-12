import React, { useState } from 'react'

import { QuestionMarkRounded as QuestionMarkRoundedIcon } from '@mui/icons-material/'
import {
  Typography,
  Drawer,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { teal as colorTeal, red as colorRed } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { GetStaticPropsResult } from 'next'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import { appsList } from './data'
import {
  PlatformSpecifications,
  TraitSpecifications,
} from './data/specifications'
import AboutDrawer from './parts/AboutDrawer'
import { SpecIcons } from './parts/Spec'
import { AppInfoItem } from './type'
import styles from './UtilityApps.module.scss'
import { getSpecifications } from './utils'

const theme = createTheme({
  palette: {
    primary: {
      main: colorRed[500],
    },
    secondary: {
      main: colorTeal[500],
    },
  },
})

const MainTable = (): JSX.Element => (
  <TableContainer>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell align='center'>功能领域</TableCell>
          <TableCell align='center'>应用名</TableCell>
          <TableCell align='center'>适配平台</TableCell>
          <TableCell align='center'>功能之外</TableCell>
          <TableCell align='center'>简评</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {appsList.map((appGroup: AppInfoItem[]) =>
          appGroup.map((app: AppInfoItem, appIndex: number) => (
            <TableRow key={app.name}>
              {appIndex === 0 && (
                <TableCell
                  component='th'
                  scope='row'
                  rowSpan={appGroup.length}
                  align='center'
                >
                  {app.domain}
                </TableCell>
              )}
              <TableCell align='center'>
                <Link
                  href={app.link}
                  rel='noreferrer'
                  target='_blank'
                  color='secondary'
                >
                  {app.name}
                </Link>
              </TableCell>
              <TableCell align='center'>
                <SpecIcons
                  specs={getSpecifications(
                    app.platform,
                    PlatformSpecifications,
                  )}
                />
              </TableCell>
              <TableCell align='center'>
                <SpecIcons
                  specs={getSpecifications(app.trait, TraitSpecifications)}
                />
              </TableCell>
              <TableCell>
                <ul>
                  {app.remarks.map(item => (
                    <li key={item}>
                      <Typography
                        component='p'
                        variant='caption'
                        color='textSecondary'
                        gutterBottom
                      >
                        {item}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          )),
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

const UtilityApps = (): JSX.Element => {
  const [aboutVisible, setAboutVisible] = useState(false)
  return (
    <AppPage title='工具应用集' theme={theme}>
      <section className={styles.utilityApps}>
        <SimpleAppBar
          title='工具应用集'
          inverse
          sticky
          whiteBg
          extraIcons={[
            {
              visible: 'always',
              component: <QuestionMarkRoundedIcon />,
              tooltip: '关于此页',
              onClick: () => setAboutVisible(true),
            },
          ]}
        />
        <MainTable />
        <Drawer
          anchor='right'
          open={aboutVisible}
          onClose={() => setAboutVisible(false)}
        >
          <AboutDrawer />
        </Drawer>
      </section>
    </AppPage>
  )
}

export default UtilityApps

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
