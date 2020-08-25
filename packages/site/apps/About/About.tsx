import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import colorBlue from '@material-ui/core/colors/blue'
import colorRed from '@material-ui/core/colors/red'
import Paper from '@material-ui/core/Paper'
import { createMuiTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import GitHubIcon from '@material-ui/icons/GitHub'
import TelegramIcon from '@material-ui/icons/Telegram'
import { GetStaticPropsResult } from 'next'
import React from 'react'

import avatarPng from '@/assets/avatar.png'
import AppPage from '@/shell/AppPage'
import Discussion from '@/shell/Discussion'
import SimpleAppBar from '@/shell/SimpleAppBar'

import styles from './About.module.scss'
import dataOfInfo, { Info } from './data'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: colorBlue[500],
    },
    secondary: {
      main: colorRed[500],
    },
  },
})

const ContactButton = ({
  title,
  url,
  icon,
}: {
  icon: React.ReactNode
  title: string
  url: string
}): JSX.Element => {
  return (
    <Button
      size='small'
      color='secondary'
      className={styles.contactButton}
      startIcon={icon}
      onClick={() => {
        window.open(url)
      }}
    >
      {title}
    </Button>
  )
}
interface AboutProps {
  info?: Info
}

const About = ({ info = dataOfInfo }: AboutProps): JSX.Element => {
  return (
    <AppPage title='关于' theme={theme}>
      <section className={styles.about}>
        <SimpleAppBar title='关于' inverse />
        <div className={styles.main}>
          <Box className={styles.basicInfoPanel}>
            <Paper className={styles.avatarWrapper} elevation={3}>
              <img className={styles.avatar} src={avatarPng} />
            </Paper>

            <div className={styles.labelAndContacts}>
              <Typography color='primary' component='h1' variant='h4'>
                程序员
                <Typography
                  component='span'
                  variant='inherit'
                  color='textSecondary'
                >
                  {' '}
                  /{' '}
                </Typography>
                前端
              </Typography>
              <div className={styles.contacts}>
                <ContactButton
                  title='GitHub'
                  icon={<GitHubIcon />}
                  url={info.github}
                />
                <ContactButton
                  title='Telegram'
                  icon={<TelegramIcon />}
                  url={info.telegram}
                />
              </div>
            </div>
          </Box>
          <Box className={styles.faqPanel}>
            {info.faq.map(({ q, a }) => (
              <Accordion key={q}>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                  <Typography>{q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color='textSecondary'>{a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
            {/* TODO: 添加评论功能 */}
          </Box>
        </div>
        <footer className={styles.footer}>
          <Typography color='textSecondary'>EAGzzyCSL@2020</Typography>
        </footer>
        <Discussion title='关于' sidesMargin />
      </section>
    </AppPage>
  )
}

export default About

About.defaultProps = {
  info: dataOfInfo,
}

export const getStaticProps = (): GetStaticPropsResult<AboutProps> => {
  return {
    props: {
      info: dataOfInfo,
    },
  }
}
