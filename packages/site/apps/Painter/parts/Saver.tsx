import React, { useRef, useState } from 'react'

import html2canvas from 'html2canvas'

import { CameraEnhanceRoundedIcon } from '@/ui/icons'
import { Fab, Paper } from '@/ui/material'
import { triggerDownload } from '@/utils'
import { dayjs } from '@/utils/date'

import styles from './Saver.module.scss'

interface SaverProps {
  fileName: string
  saveAction: 'shotAndSave' | 'saveOnly'
  imgUrlGetter?: () => string
  children: JSX.Element
}

const Saver = (props: SaverProps): JSX.Element => {
  const { children, fileName, saveAction, imgUrlGetter } = props
  const containerRef = useRef<null | HTMLDivElement>(null)
  const [isInShot, setIsInShot] = useState(false)

  const [shotImg, setShotImg] = useState('')

  const handleShot = async (): Promise<void> => {
    if (isInShot) {
      return
    }

    setIsInShot(true)

    let downloadUrl = ''
    if (saveAction === 'shotAndSave') {
      if (containerRef.current) {
        const result = await html2canvas(containerRef.current, {})
        downloadUrl = result.toDataURL()
      }
    } else {
      downloadUrl = imgUrlGetter ? imgUrlGetter() : ''
    }

    if (downloadUrl) {
      setShotImg(downloadUrl)
      const defaultFileName = dayjs().format('出图-HH:mm:ss')
      setTimeout(() => {
        setShotImg('')
        triggerDownload(`${fileName || defaultFileName}.png`, downloadUrl)
        setIsInShot(false)
      }, 400)
    } else {
      setIsInShot(false)
    }
  }
  return (
    <Paper elevation={3} className={styles.saver}>
      <div ref={containerRef} className={styles.container}>
        {children}
      </div>

      {shotImg && (
        <div className={styles.shot}>
          <img className={styles.shotImg} src={shotImg} />
        </div>
      )}

      <Fab
        color='primary'
        className={styles.fab}
        variant='extended'
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          handleShot()
        }}
      >
        <CameraEnhanceRoundedIcon />
        保存
      </Fab>
    </Paper>
  )
}

Saver.defaultProps = {
  imgUrlGetter: () => '',
}

export default Saver
