import React from 'react'

import Discussion from '@/shell/Discussion'
import { Typography } from '@/ui/material'

import { LAST_UPDATED } from '../data'
import { TraitSpecifications } from '../data/specifications'

import styles from './AboutDrawer.module.scss'
import { SpecIcon } from './Spec'

const NormalList = ({
  title,
  contents,
}: {
  title: string
  contents: string[]
}): JSX.Element => (
  <div>
    <Typography variant='h5' gutterBottom color='secondary'>
      {title}
    </Typography>
    <ol>
      {contents.map(item => (
        <Typography component='li' key={item} gutterBottom>
          {item}
        </Typography>
      ))}
    </ol>
  </div>
)

const TraitList = (): JSX.Element => (
  <div className={styles.traitList}>
    <Typography variant='h5' gutterBottom color='secondary'>
      图例
    </Typography>
    <ol className={styles.list}>
      {Object.values(TraitSpecifications).map(item => (
        <li className={styles.listItem} key={item.brief}>
          <SpecIcon icon={item.icon} />
          <Typography gutterBottom className={styles.particular}>
            {item.particular}
          </Typography>
        </li>
      ))}
    </ol>
  </div>
)

const AboutDrawer = (): JSX.Element => (
  <section className={styles.aboutDrawer}>
    <Typography variant='h4' gutterBottom color='primary'>
      关于此页
    </Typography>
    <NormalList
      title='页面目的'
      contents={[
        '收集与分享特定功能领域高质量的应用程序，方便有需求的过路人。',
        '满足收集癖，勤笔免思防遗忘。',
      ]}
    />
    <NormalList
      title='挑选原则'
      contents={[
        '功能完整：能够解决需求是第一要义。',
        '体验友好：稳定性、兼容性、用户界面等要让人满意。',
        '不耍流氓：允许有适度的广告，不接受无度的广告。',
        '免费更好：接受物有所值的付费。',
      ]}
    />
    <TraitList />
    <Typography
      className={styles.footer}
      variant='overline'
      display='block'
      color='textSecondary'
    >
      lastUpdated: {LAST_UPDATED}
    </Typography>
    <Discussion title='工具应用集' sidesMargin />
  </section>
)

export default AboutDrawer
