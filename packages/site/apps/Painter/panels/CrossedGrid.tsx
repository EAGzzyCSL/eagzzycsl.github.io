import React, { useState } from 'react'

import { TextField, Button } from '@mui/material'

import imageBlank from '../assets/crossed/blank.jpg'
import imageButter from '../assets/crossed/butter.jpeg'
import imageButterfly from '../assets/crossed/butterfly.png'
import imageCraneGreen from '../assets/crossed/crane_green.jpg'
import imageCraneRed from '../assets/crossed/crane_red.png'
import imageKongQin from '../assets/crossed/kong_qin.jpeg'
import HoverInput from '../parts/HoverInput'
import ImageFrame from '../parts/ImageFrame'
import PanelContainer from '../parts/PanelContainer'
import Saver from '../parts/Saver'

import styles from './CrossedGrid.module.scss'

interface IDemoItem {
  title: string
  text1: string
  text2: string
  img1: string
  img2: string
}

const demos: IDemoItem[] = [
  {
    title: 'butter&butterfly',
    text1: 'butter',
    text2: 'butterfly',
    img1: imageButter,
    img2: imageButterfly,
  },
  {
    title: '空白&空青',
    text1: '空白',
    text2: '空青',
    img1: imageBlank,
    img2: imageKongQin,
  },
  {
    title: '鹤顶红&鹤顶绿',
    text1: '鹤顶红',
    text2: '鹤顶绿',
    img1: imageCraneRed,
    img2: imageCraneGreen,
  },
]

const CrossedGrid = (): JSX.Element => {
  const [fileName, setFileName] = useState('')

  const [demo, setDemo] = useState<IDemoItem>({
    title: '',
    text1: '',
    text2: '',
    img1: '',
    img2: '',
  })

  return (
    <section className={styles.crossedGrid}>
      <PanelContainer
        size='normal'
        board={
          <Saver saveAction='shotAndSave' fileName={fileName}>
            <div className={styles.card}>
              <div className={styles.row}>
                <div className={styles.leftTop}>
                  <HoverInput displayVariant='h3' initValue={demo.text1}>
                    <TextField
                      multiline
                      inputProps={{ style: { textAlign: 'center' } }}
                    />
                  </HoverInput>
                </div>
                <div className={styles.rightTop}>
                  <ImageFrame fullSize imgUrl={demo.img1} />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.leftBottom}>
                  <HoverInput displayVariant='h3' initValue={demo.text2}>
                    <TextField
                      multiline
                      inputProps={{
                        style: {
                          textAlign: 'center',
                        },
                      }}
                    />
                  </HoverInput>
                </div>
                <div className={styles.rightBottom}>
                  <ImageFrame fullSize imgUrl={demo.img2} />
                </div>
              </div>
            </div>
          </Saver>
        }
        control={
          <div className={styles.form}>
            <TextField
              label='文件名'
              variant='outlined'
              value={fileName}
              onChange={event => {
                setFileName(event.target.value)
              }}
            />
            {demos.map((demo, index) => (
              <Button
                key={demo.title}
                variant='contained'
                color='secondary'
                className={styles.demoButton}
                onClick={() => {
                  setFileName(demo.title)
                  setDemo({
                    ...demo,
                  })
                }}
              >
                示例{index}：{demo.title}
              </Button>
            ))}
          </div>
        }
      />
    </section>
  )
}

export default CrossedGrid
