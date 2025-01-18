import React, { useRef, useEffect, useState } from 'react'

import * as THREE from 'three'

import avatar from '@/assets/avatar.png'
import SimpleLoading from '@/share/SimpleLoading'
import { TextField, Button, Typography } from '@/ui/material'

import border from '../assets/rubik/border.svg'
import cat from '../assets/rubik/gua.jpg'
import ImageFrame from '../parts/ImageFrame'
import PanelContainer from '../parts/PanelContainer'
import Saver from '../parts/Saver'
import { mergeImages } from '../utils/merge'

import styles from './RubikCubePhoto.module.scss'
import { RubikCube } from './RubiksCube'

const RubikCubePhoto = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rubikCubeRef = useRef<RubikCube>()

  const [mergeLoading, setMergeLoading] = useState(false)
  const [fileName, setFileName] = useState('照片魔方')
  const [imgUrl, setImgUrl] = useState(avatar)

  useEffect(() => {
    if (typeof window === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }
    if (!canvasRef.current) {
      throw new Error('canvasRef.current 不存在')
    }
    if (!rubikCubeRef.current) {
      rubikCubeRef.current = new RubikCube(canvasRef.current)
    }

    const init = async () => {
      await handleImageChanged(imgUrl)
    }

    init().catch(e => {
      throw e
    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [imgUrl])

  const handleImageChanged = async (imgUrl: string) => {
    const size = 200

    setMergeLoading(true)

    const merged = await mergeImages([imgUrl, border], {
      width: size,
      height: size,
    })

    setMergeLoading(false)

    const mesh = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(merged),
    })

    rubikCubeRef.current?.updateMaterials([mesh, mesh, mesh, mesh, mesh, mesh])
  }

  return (
    <section className={styles.rubikCubePhoto}>
      <PanelContainer
        size='large'
        board={
          <Saver
            saveAction='saveOnly'
            fileName={fileName}
            imgUrlGetter={() => canvasRef.current?.toDataURL() ?? ''}
          >
            <div className={styles.card}>
              {mergeLoading && <SimpleLoading title='图片拼合中' />}
              <canvas className={styles.canvas} ref={canvasRef} />
            </div>
          </Saver>
        }
        control={
          <div className={styles.form}>
            <div className={styles.opt}>
              <Typography variant='caption' gutterBottom>
                上传图片生成照片魔方
              </Typography>
              <div className={styles.imagePreview}>
                <ImageFrame
                  fullSize
                  imgUrl={imgUrl}
                  aspect={1}
                  onImageChanged={imgUrl => {
                    // eslint-disable-next-line no-void
                    void handleImageChanged(imgUrl)
                  }}
                />
              </div>
            </div>
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
                  setFileName('头像')
                  setImgUrl(avatar)
                }}
              >
                示例1：头像
              </Button>
              <Button
                variant='contained'
                color='secondary'
                className={styles.demoButton}
                onClick={() => {
                  setFileName('猫猫')
                  setImgUrl(cat)
                }}
              >
                示例2：猫猫
              </Button>
            </div>
          </div>
        }
      />
    </section>
  )
}

export default RubikCubePhoto
