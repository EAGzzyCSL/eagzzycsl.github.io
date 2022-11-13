import React, { useState } from 'react'

import cx from 'classnames'

import { QuestionMarkRoundedIcon } from '@/ui/icons'
import {
  TextField,
  Button,
  IconButton,
  Paper,
  Link,
  Typography,
} from '@/ui/material'

import CampCell from '../parts/CampCell'
import CampTitle from '../parts/CampTitle'
import HoverInput from '../parts/HoverInput'
import PanelContainer from '../parts/PanelContainer'
import Saver from '../parts/Saver'

import demo from './CampNineDemo'
import styles from './CampNineSquare.module.scss'

const CampNineSquare = (): JSX.Element => {
  const [camp, setCamp] = useState({
    mainTitle: '',
    ht1: '',
    hst1: '',
    ht2: '',
    hst2: '',
    ht3: '',
    hst3: '',
    vt1: '',
    vst1: '',
    vt2: '',
    vst2: '',
    vt3: '',
    vst3: '',
    cell11: {
      imgUrl: '',
      description: '',
    },
    cell12: {
      imgUrl: '',
      description: '',
    },
    cell13: {
      imgUrl: '',
      description: '',
    },
    cell21: {
      imgUrl: '',
      description: '',
    },
    cell22: {
      imgUrl: '',
      description: '',
    },
    cell23: {
      imgUrl: '',
      description: '',
    },
    cell31: {
      imgUrl: '',
      description: '',
    },
    cell32: {
      imgUrl: '',
      description: '',
    },
    cell33: {
      imgUrl: '',
      description: '',
    },
  })

  return (
    <section className={styles.campNineSquare}>
      <PanelContainer
        size='large'
        board={
          <Saver saveAction='shotAndSave' fileName={camp.mainTitle}>
            <div className={styles.content}>
              <div className={styles.card}>
                {/* 表头行 */}
                <div className={styles.row}>
                  <div className={cx(styles.columnItem)}>
                    <HoverInput initValue={camp.mainTitle} displayVariant='h6'>
                      <TextField
                        inputProps={{ style: { textAlign: 'center' } }}
                      />
                    </HoverInput>
                  </div>
                  <div className={cx(styles.columnItem, styles.title)}>
                    <CampTitle title={camp.ht1} subTitle={camp.hst1} />
                  </div>
                  <div className={cx(styles.columnItem, styles.title)}>
                    <CampTitle title={camp.ht2} subTitle={camp.hst2} />
                  </div>
                  <div className={cx(styles.columnItem, styles.title)}>
                    <CampTitle title={camp.ht3} subTitle={camp.hst3} />
                  </div>
                </div>
                {/* 第一行 */}
                <div className={styles.row}>
                  <div className={styles.columnItem}>
                    <CampTitle title={camp.vt1} subTitle={camp.vst1} />
                  </div>
                  <div className={cx(styles.columnItem, styles.cell)}>
                    <CampCell
                      imgUrl={camp.cell11.imgUrl}
                      description={camp.cell11.description}
                    />
                  </div>
                  <div className={cx(styles.columnItem, styles.cell)}>
                    <CampCell
                      imgUrl={camp.cell12.imgUrl}
                      description={camp.cell12.description}
                    />
                  </div>
                  <div className={cx(styles.columnItem, styles.cell)}>
                    <CampCell
                      imgUrl={camp.cell13.imgUrl}
                      description={camp.cell13.description}
                    />
                  </div>
                </div>
                {/* 第二行 */}
                <div className={styles.row}>
                  <div className={styles.columnItem}>
                    <CampTitle title={camp.vt2} subTitle={camp.vst2} />
                  </div>
                  <div className={cx(styles.columnItem, styles.cell)}>
                    <CampCell
                      imgUrl={camp.cell21.imgUrl}
                      description={camp.cell21.description}
                    />
                  </div>
                  <div className={cx(styles.columnItem, styles.cell)}>
                    <CampCell
                      imgUrl={camp.cell22.imgUrl}
                      description={camp.cell22.description}
                    />
                  </div>
                  <div className={cx(styles.columnItem, styles.cell)}>
                    <CampCell
                      imgUrl={camp.cell23.imgUrl}
                      description={camp.cell23.description}
                    />
                  </div>
                </div>
                {/* 第三行 */}
                <div className={styles.row}>
                  <div className={styles.columnItem}>
                    <CampTitle title={camp.vt3} subTitle={camp.vst3} />
                  </div>
                  <div className={cx(styles.columnItem, styles.cell)}>
                    <CampCell
                      imgUrl={camp.cell31.imgUrl}
                      description={camp.cell31.description}
                    />
                  </div>
                  <div className={cx(styles.columnItem, styles.cell)}>
                    <CampCell
                      imgUrl={camp.cell32.imgUrl}
                      description={camp.cell32.description}
                    />
                  </div>
                  <div className={cx(styles.columnItem, styles.cell)}>
                    <CampCell
                      imgUrl={camp.cell33.imgUrl}
                      description={camp.cell33.description}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.notAvailable}>
                <Typography variant='body2' color='secondary'>
                  页面过窄，功能不可用
                </Typography>
              </div>
            </div>
          </Saver>
        }
        control={
          <div className={styles.control}>
            <Button
              variant='contained'
              color='secondary'
              className={styles.demoButton}
              onClick={() => {
                setCamp(demo.square)
              }}
            >
              示例1：{demo.square.mainTitle}
            </Button>
            <Button
              variant='contained'
              color='secondary'
              className={styles.demoButton}
              onClick={() => {
                setCamp(demo.jsTruthy)
              }}
            >
              示例2：{demo.jsTruthy.mainTitle}
            </Button>

            <div className={styles.about}>
              <Paper className={styles.icon}>
                <IconButton size='small'>
                  <QuestionMarkRoundedIcon />
                </IconButton>
              </Paper>
              <Link
                color='primary'
                target='_blank'
                rel='noopener'
                underline='hover'
                href='https://mzh.moegirl.org.cn/zh-hans/%E5%AE%9A%E4%B9%89%E9%98%B5%E8%90%A5%E5%9B%BE'
              >
                什么是定义阵营图
              </Link>
            </div>
          </div>
        }
      />
    </section>
  )
}

export default CampNineSquare
