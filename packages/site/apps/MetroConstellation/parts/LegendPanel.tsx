import React, { useMemo } from 'react'

import {
  Typography,
  Checkbox,
  FormControlLabel,
  Switch,
  Divider,
} from '@/ui/material'

import { IMetroLine, IMetroLinesMap } from '../type'

import styles from './LegendPanel.module.scss'

interface LegendPanelProps {
  metroLinesMap: IMetroLinesMap
  updateMetroLine: (no: string, line: IMetroLine) => void
  enableAdjust: boolean
  setEnableAdjust: (e: boolean) => void
}

const LegendPanel = (props: LegendPanelProps): JSX.Element => {
  const { metroLinesMap, updateMetroLine, enableAdjust, setEnableAdjust } =
    props

  const metroLines = useMemo(
    () => Object.values(metroLinesMap),
    [metroLinesMap],
  )

  return (
    <section className={styles.legendPanel}>
      {metroLines.map(line => (
        <div className={styles.row} key={line.no}>
          <div
            className={styles.line}
            style={{
              backgroundColor: line.color,
            }}
          />
          <Typography className={styles.name} variant='button'>
            {line.no.length > 2 ? line.no : `${line.no} 号线`}
          </Typography>
          <div className={styles.options}>
            <FormControlLabel
              control={<Checkbox size='small' />}
              checked={line.active}
              label='active'
              labelPlacement='start'
              onChange={(_event, checked) => {
                updateMetroLine(line.no, {
                  ...line,
                  active: checked,
                })
              }}
            />
            <FormControlLabel
              control={<Checkbox size='small' color='info' />}
              checked={line.colorful}
              label='colorful'
              labelPlacement='start'
              onChange={(_event, checked) => {
                updateMetroLine(line.no, {
                  ...line,
                  colorful: checked,
                })
              }}
            />
          </div>
        </div>
      ))}
      <Divider variant='middle' />
      <FormControlLabel
        control={<Switch />}
        checked={enableAdjust}
        label='允许调节位置'
        labelPlacement='start'
        onChange={(_event, checked) => {
          setEnableAdjust(checked)
        }}
      />
    </section>
  )
}

export default LegendPanel
