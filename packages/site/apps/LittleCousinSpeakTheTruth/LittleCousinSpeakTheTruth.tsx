import {
  ArrowBackRounded as ArrowBackRoundedIcon,
  MoreHorizRounded as MoreHorizRoundedIcon,
  MoreVertRounded as MoreVertRoundedIcon,
} from '@mui/icons-material'
import {
  AppBar,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material'
import { grey as colorGrey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { GetStaticPropsResult } from 'next'
import React, { useState, useRef } from 'react'

import AppBarHomeButton from '@/shell/AppBarHomeButton'
import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import dataOfChats from './data/chats'
import styles from './LittleCousinSpeakTheTruth.module.scss'
import AboutCard from './parts/AboutCard'
import ReferenceStatement from './parts/ReferenceStatement'
import WeChatShell from './parts/WeChatShell'
import { Chats } from './type'

const theme = createTheme({
  palette: {
    primary: {
      main: colorGrey[700],
      contrastText: '#fff',
    },
  },
})

interface LeftContentProps {
  useCustomBack?: boolean
  onTapBack?: () => void
}

const LeftContent = (props: LeftContentProps): JSX.Element => {
  const { useCustomBack, onTapBack } = props
  return (
    <div className={styles.contentAbout}>
      <AppBar position='static'>
        <Toolbar>
          {useCustomBack ? (
            <div className={styles.navBack}>
              <IconButton
                edge='start'
                color='inherit'
                onClick={onTapBack}
                size='large'
              >
                <ArrowBackRoundedIcon />
              </IconButton>
            </div>
          ) : (
            <AppBarHomeButton />
          )}

          <Typography component='h1' variant='h6'>
            他说破了事实
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={styles.about}>
        <AboutCard />
      </div>
    </div>
  )
}

LeftContent.defaultProps = {
  useCustomBack: false,
  onTapBack: () => {},
}
interface RightContentProps {
  onTapBack: () => void
}

const RightContent = ({ onTapBack }: RightContentProps): JSX.Element => (
  <div className={styles.contentReference}>
    <AppBar position='static'>
      <Toolbar>
        <div className={styles.navBack}>
          <IconButton
            edge='start'
            color='inherit'
            onClick={onTapBack}
            size='large'
          >
            <ArrowBackRoundedIcon />
          </IconButton>
        </div>
        <Typography component='h1' variant='h6'>
          参考
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={styles.reference}>
      <ReferenceStatement
        title='插图来源'
        content='Illustration from Icons8'
        linkTitle='Icons8'
        href='https://icons8.com/'
      />
      <ReferenceStatement
        title='微信语音处理'
        content='silk v3编码转换'
        linkTitle='V2EX'
        href='https://www.v2ex.com/t/171735'
      />
    </div>
  </div>
)

interface CenterContentProps {
  chats: Chats
  onTapAbout: () => void
  onTapReference: () => void
}

const CenterContent = ({
  chats,
  onTapAbout,
  onTapReference,
}: CenterContentProps): JSX.Element => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  )

  const moreIconVert = useRef<SVGSVGElement>(null)
  const moreIconHoriz = useRef<SVGSVGElement>(null)

  const handleTapMore = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (event.target === moreIconVert.current) {
      setMenuAnchorEl(event.currentTarget)
    }
  }

  const handleCloseMenu = (): void => {
    setMenuAnchorEl(null)
  }

  return (
    <div className={styles.contentCenter}>
      <SimpleAppBar
        title={chats.leftName}
        endIcon={
          <>
            <MoreVertRoundedIcon
              ref={moreIconVert}
              className={styles.headerMoreVert}
              fontSize='large'
            />
            <MoreHorizRoundedIcon
              ref={moreIconHoriz}
              className={styles.headerMoreHoriz}
              fontSize='large'
            />
          </>
        }
        onEndIconClick={handleTapMore}
      />
      <Menu
        anchorEl={menuAnchorEl}
        keepMounted
        open={!!menuAnchorEl}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu()
            onTapAbout()
          }}
        >
          关于
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu()
            onTapReference()
          }}
        >
          参考
        </MenuItem>
      </Menu>
      <div className={styles.containerWeChat}>
        <WeChatShell chats={chats} />
      </div>
    </div>
  )
}

interface LittleCousinSpeakTheTruthProps {
  chats?: Chats
}

const LittleCousinSpeakTheTruth = ({
  chats = dataOfChats,
}: LittleCousinSpeakTheTruthProps): JSX.Element => {
  const [aboutVisible, setAboutVisible] = useState(false)

  const [referenceVisible, setReferenceVisible] = useState(false)

  return (
    <AppPage title='他说破了事实' theme={theme}>
      <section className={styles.littleCousinSpeakTheTruth}>
        <div className={styles.leftPanel}>
          <LeftContent />
        </div>
        <div className={styles.centerPanel}>
          <Paper
            elevation={2}
            style={{
              height: '100%',
            }}
          >
            <CenterContent
              chats={chats}
              onTapAbout={() => setAboutVisible(true)}
              onTapReference={() => setReferenceVisible(true)}
            />
          </Paper>
        </div>
        <div className={styles.rightPanel}>
          <RightContent onTapBack={() => {}} />
        </div>
        <Drawer
          anchor='right'
          open={aboutVisible}
          onClose={() => setAboutVisible(false)}
        >
          <LeftContent useCustomBack onTapBack={() => setAboutVisible(false)} />
        </Drawer>
        <Drawer
          anchor='right'
          open={referenceVisible}
          onClose={() => setReferenceVisible(false)}
        >
          <RightContent onTapBack={() => setReferenceVisible(false)} />
        </Drawer>
      </section>
    </AppPage>
  )
}

LittleCousinSpeakTheTruth.defaultProps = {
  chats: dataOfChats,
}
export default LittleCousinSpeakTheTruth

export const getStaticProps =
  (): GetStaticPropsResult<LittleCousinSpeakTheTruthProps> => ({
    props: {},
  })
