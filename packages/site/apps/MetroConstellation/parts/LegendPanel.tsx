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

  const metroLines: IMetroLine[] = useMemo(
    () => Object.values(metroLinesMap),
    [metroLinesMap],
  )

  const allLineate = metroLines.every(line => line.lineate)
  const allActive = metroLines.every(line => line.active)
  const allColorful = metroLines.every(line => line.colorful)

  return (
    <section className={styles.legendPanel}>
      <div className={styles.all}>
        <div className={styles.label}>
          <Typography className={styles.name} variant='button'>
            全部线路
          </Typography>
        </div>
        <div className={styles.options}>
          <FormControlLabel
            control={<Checkbox size='small' />}
            checked={allLineate}
            label='lineate'
            labelPlacement='start'
            onChange={(_event, checked) => {
              metroLines.forEach(l => {
                updateMetroLine(l.no, {
                  ...l,
                  lineate: checked,
                })
              })
            }}
          />
          <FormControlLabel
            control={<Checkbox size='small' />}
            checked={allActive}
            label='active'
            labelPlacement='start'
            onChange={(_event, checked) => {
              metroLines.forEach(l => {
                updateMetroLine(l.no, {
                  ...l,
                  active: checked,
                })
              })
            }}
          />
          <FormControlLabel
            control={<Checkbox size='small' color='secondary' />}
            checked={allColorful}
            label='colorful'
            labelPlacement='start'
            onChange={(_event, checked) => {
              metroLines.forEach(l => {
                updateMetroLine(l.no, {
                  ...l,
                  colorful: checked,
                })
              })
            }}
          />
        </div>
      </div>

      {metroLines.map(line => (
        <div className={styles.row} key={line.no}>
          <div className={styles.label}>
            <div
              className={styles.line}
              style={{
                backgroundColor: line.color,
              }}
            />
            <Typography className={styles.name} variant='button'>
              {line.no.length > 2 ? line.no : `${line.no} 号线`}
            </Typography>
          </div>
          <div className={styles.options}>
            <FormControlLabel
              control={<Checkbox size='small' />}
              checked={line.lineate}
              label='lineate'
              labelPlacement='start'
              onChange={(_event, checked) => {
                updateMetroLine(line.no, {
                  ...line,
                  lineate: checked,
                })
              }}
            />
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
              control={<Checkbox size='small' color='secondary' />}
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
