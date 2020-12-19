import AppBar from '@material-ui/core/AppBar'
import colorGrey from '@material-ui/core/colors/grey'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { createMuiTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded'
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded'
import { GetStaticPropsResult } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import AppPage from '@/shell/AppPage'

import dataOfChats from './data/chats'
import styles from './LittleCousinSpeakTheTruth.module.scss'
import AboutCard from './parts/AboutCard'
import ReferenceStatement from './parts/ReferenceStatement'
import WeChatShell from './parts/WeChatShell'
import { Chats } from './type'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: colorGrey[700],
      contrastText: '#fff',
    },
  },
})

interface LeftContentProps {
  onTapBack: () => void
}

const LeftContent = ({ onTapBack }: LeftContentProps): JSX.Element => (
  <div className={styles.contentAbout}>
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' onClick={onTapBack}>
          <ArrowBackRoundedIcon />
        </IconButton>
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

interface RightContentProps {
  onTapBack: () => void
}

const RightContent = ({ onTapBack }: RightContentProps): JSX.Element => (
  <div className={styles.contentReference}>
    <AppBar position='static'>
      <Toolbar>
        <div className={styles.navBack}>
          <IconButton edge='start' color='inherit' onClick={onTapBack}>
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
  onTapBack: () => void
  onTapAbout: () => void
  onTapReference: () => void
}

const CenterContent = ({
  chats,
  onTapBack,
  onTapAbout,
  onTapReference,
}: CenterContentProps): JSX.Element => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null,
  )

  const handleTapMore = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = (): void => {
    setMenuAnchorEl(null)
  }

  return (
    <div className={styles.contentCenter}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={onTapBack}>
            <NavigateBeforeRoundedIcon fontSize='large' />
          </IconButton>
          <Typography
            className={styles.headerTitle}
            component='h2'
            variant='h6'
          >
            {chats.leftName}
          </Typography>
          <div className={styles.headerMoreVert}>
            <IconButton color='inherit' onClick={handleTapMore}>
              <MoreVertRoundedIcon fontSize='large' />
            </IconButton>
          </div>
          <div className={styles.headerMoreHoriz}>
            <IconButton color='inherit'>
              <MoreHorizRoundedIcon fontSize='large' />
            </IconButton>
          </div>
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
        </Toolbar>
      </AppBar>
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
  const router = useRouter()

  const handleBack = (): void => {
    router.back()
  }

  const [aboutVisible, setAboutVisible] = useState(false)

  const [referenceVisible, setReferenceVisible] = useState(false)

  return (
    <AppPage title='他说破了事实' theme={theme}>
      <section className={styles.littleCousinSpeakTheTruth}>
        <div className={styles.leftPanel}>
          <LeftContent onTapBack={handleBack} />
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
              onTapBack={handleBack}
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
          <LeftContent onTapBack={() => setAboutVisible(false)} />
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

export const getStaticProps = (): GetStaticPropsResult<LittleCousinSpeakTheTruthProps> => ({
  props: {},
})
