import React, { useState } from 'react'

import cx from 'classnames'

import { TextField, Button } from '@/ui/material'

import HoverInput from '../parts/HoverInput'
import PanelContainer from '../parts/PanelContainer'
import Saver from '../parts/Saver'

import styles from './ImpossibleTrinity.module.scss'

interface IImpossibleTrinityData {
  alpha: string
  beta: string
  gamma: string
  alphaBeta: string
  betaGamma: string
  gammaAlpha: string
  center: string
}

const initTrinityData = {
  alpha: 'alpha',
  beta: 'beta',
  gamma: 'gamma',
  alphaBeta: 'alpha&beta',
  betaGamma: 'beta&gamma',
  gammaAlpha: 'gamma&alpha',
  center: 'impossible',
}

const ImpossibleTrinity = (): JSX.Element => {
  const [trinityData, setTrinityData] =
    useState<IImpossibleTrinityData>(initTrinityData)

  const [fileName, setFileName] = useState('不可能三角')

  return (
    <section className={styles.impossibleTrinity}>
      <PanelContainer
        size='large'
        board={
          <Saver saveAction='shotAndSave' fileName={fileName}>
            <div className={styles.board}>
              {/* 三个圆 */}
              <div className={cx(styles.dimension, styles.alpha)}>
                <div className={styles.alphaArea}>
                  <HoverInput
                    initValue={trinityData.alpha}
                    placeholder={initTrinityData.alpha}
                  >
                    <TextField
                      multiline
                      inputProps={{ style: { textAlign: 'center' } }}
                    />
                  </HoverInput>
                </div>
              </div>
              <div className={cx(styles.dimension, styles.beta)}>
                <div className={styles.betaArea}>
                  <HoverInput
                    initValue={trinityData.beta}
                    placeholder={initTrinityData.beta}
                  >
                    <TextField
                      multiline
                      inputProps={{ style: { textAlign: 'center' } }}
                    />
                  </HoverInput>
                </div>
              </div>
              <div className={cx(styles.dimension, styles.gamma)}>
                <div className={styles.gammaArea}>
                  <HoverInput
                    initValue={trinityData.gamma}
                    placeholder={initTrinityData.gamma}
                  >
                    <TextField
                      multiline
                      inputProps={{ style: { textAlign: 'center' } }}
                    />
                  </HoverInput>
                </div>
              </div>
              {/* 三个相交点 */}
              <div className={styles.alphaBetaArea}>
                <HoverInput
                  initValue={trinityData.alphaBeta}
                  placeholder={initTrinityData.alphaBeta}
                >
                  <TextField
                    multiline
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </HoverInput>
              </div>
              <div className={styles.betaGammaArea}>
                <HoverInput
                  initValue={trinityData.betaGamma}
                  placeholder={initTrinityData.betaGamma}
                >
                  <TextField
                    multiline
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </HoverInput>
              </div>
              <div className={styles.gammaAlphaArea}>
                <HoverInput initValue={trinityData.gammaAlpha}>
                  <TextField
                    multiline
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </HoverInput>
              </div>
              {/* 中心部分 */}
              <div className={styles.center}>
                <HoverInput initValue={trinityData.center}>
                  <TextField
                    multiline
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </HoverInput>
              </div>
            </div>
          </Saver>
        }
        control={
          <div className={styles.quickDemo}>
            <TextField
              className={styles.input}
              variant='outlined'
              size='small'
              label='文件名'
              value={fileName}
              onChange={event => {
                setFileName(event.target.value)
              }}
            />
            <Button
              variant='contained'
              color='secondary'
              className={styles.demoButton}
              onClick={() => {
                setFileName('蒙代尔不可能三角')
                setTrinityData({
                  alpha: '资本自由流动',
                  beta: '货币政策独立',
                  gamma: '固定汇率',
                  alphaBeta: '浮动汇率',
                  betaGamma: '资本管制',
                  gammaAlpha: '货币政策非独立',
                  center: 'you can you up',
                })
              }}
            >
              示例1：蒙代尔不可能三角
            </Button>
            <Button
              variant='contained'
              color='secondary'
              className={styles.demoButton}
              onClick={() => {
                setFileName('罗氏不可能三角')
                setTrinityData({
                  alpha: '销量',
                  beta: '诚实',
                  gamma: '要脸',
                  alphaBeta: '不要脸',
                  betaGamma: '没销量',
                  gammaAlpha: '不诚实',
                  center: 'you can you up',
                })
              }}
            >
              示例2：罗氏不可能三角
            </Button>
          </div>
        }
      />
    </section>
  )
}

export default ImpossibleTrinity
