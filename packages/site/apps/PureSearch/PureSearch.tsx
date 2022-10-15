import React, { useState } from 'react'

import {
  ButtonGroup,
  Button,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
  Typography,
} from '@mui/material'
import { GetStaticPropsResult } from 'next'

import AppPage from '@/shell/AppPage'
import SimpleAppBar from '@/shell/SimpleAppBar'

import icon from './icon.png'
import styles from './PureSearch.module.scss'
import theme from './theme'

interface ISearchEngineer {
  name: string
  url: string
}

const SearchEngineers: ISearchEngineer[] = [
  {
    name: '百度',
    url: 'https://www.baidu.com/s?wd=',
  },
  {
    name: '必应',
    url: 'https://cn.bing.com/search?q=',
  },
  {
    name: '搜狗',
    url: 'https://www.sogou.com/web?query=',
  },
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=',
  },
]

const PureSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState('')
  const [openInNewTab, setOpenInNewTab] = useState(true)
  const handleSearch = (buttonItem: ISearchEngineer): void => {
    const url = `${buttonItem.url}${encodeURIComponent(keyword)}`
    if (openInNewTab) {
      window.open(url, '_blank')
    } else {
      document.location.href = url
    }
  }
  const handleButtonClick = (buttonItem: ISearchEngineer): void => {
    handleSearch(buttonItem)
  }

  const handleEnter = (): void => {
    handleSearch(SearchEngineers[0])
  }

  return (
    <AppPage title='纯粹搜索' theme={theme} fullHeight>
      <section className={styles.pureSearch}>
        <SimpleAppBar title='纯粹搜索' inverse sticky />
        <div className={styles.content}>
          <div className={styles.center}>
            <div className={styles.titleBar}>
              <img src={icon} className={styles.logo} />
              <div className={styles.right}>
                <Typography variant='h4' color='secondary'>
                  Pure Search
                </Typography>
                <Typography
                  color='text.secondary'
                  variant='caption'
                  sx={{
                    marginTop: '4px',
                  }}
                >
                  只是跳一下对应的搜索引擎
                </Typography>
              </div>
            </div>
            <div className={styles.input}>
              <OutlinedInput
                placeholder=''
                value={keyword}
                onChange={e => {
                  setKeyword(e.target.value)
                }}
                onKeyDown={e => {
                  if (e.code === 'Enter') {
                    handleEnter()
                  }
                }}
              />
            </div>
            <div className={styles.buttons}>
              <ButtonGroup variant='contained'>
                {SearchEngineers.map(item => (
                  <Button
                    key={item.name}
                    onClick={() => {
                      handleButtonClick(item)
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <FormControlLabel
              label={
                <Typography color='text.secondary' variant='body2'>
                  在新标签页中打开
                </Typography>
              }
              control={<Checkbox size='small' />}
              checked={openInNewTab}
              onChange={(e, checked) => {
                setOpenInNewTab(checked)
              }}
            />
          </div>
        </div>
      </section>
    </AppPage>
  )
}

export default PureSearch

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})