import React, { useRef, useEffect, useState } from 'react'

import * as THREE from 'three'

import avatar from '@/assets/avatar.png'
import SimpleError from '@/share/SimpleError'
import SimpleLoading from '@/share/SimpleLoading'
import { TextField, Button, Typography } from '@/ui/material'

import cat from '../../assets/rubik/gua.jpg'
import ImageFrame from '../../parts/ImageFrame'
import PanelContainer from '../../parts/PanelContainer'
import Saver from '../../parts/Saver'
import { mergeImages } from '../../utils/merge'

import RotationPad from './RotationPad'
import styles from './RubikCubePhoto.module.scss'
import { DEFAULT_BODY_COLOR } from './rubikModel'
import { RubikCube } from './RubiksCube'
import { DEFAULT_VIEW } from './rubikView'
import type { RubikView } from './rubikView'

const RubikCubePhoto = (): React.JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rubikCubeRef = useRef<RubikCube | undefined>(undefined)

  const [mergeLoading, setMergeLoading] = useState(false)
  const [fileName, setFileName] = useState('照片魔方')
  const [imgUrl, setImgUrl] = useState(avatar)
  const [textureUrl, setTextureUrl] = useState(avatar)
  const [error, setError] = useState('')
  const [view, setView] = useState(DEFAULT_VIEW)
  const [bodyColor, setBodyColor] = useState(DEFAULT_BODY_COLOR)

  useEffect(() => {
    if (!canvasRef.current) return undefined
    const cube = new RubikCube(canvasRef.current)
    rubikCubeRef.current = cube
    return () => {
      rubikCubeRef.current = undefined
      cube.dispose()
    }
  }, [])

  useEffect(() => {
    const cube = rubikCubeRef.current
    if (!cube) return undefined
    let cancelled = false
    const isCancelled = (): boolean => cancelled
    const updateImage = async (): Promise<void> => {
      setMergeLoading(true)
      setError('')
      try {
        const merged = await mergeImages([textureUrl], {
          width: 200,
          height: 200,
        })
        if (isCancelled()) return
        const texture = await new THREE.TextureLoader().loadAsync(merged)
        if (isCancelled()) {
          texture.dispose()
          return
        }
        cube.updateTexture(texture)
      } catch (cause) {
        if (!isCancelled())
          setError(cause instanceof Error ? cause.message : '图片加载失败')
      } finally {
        if (!isCancelled()) setMergeLoading(false)
      }
    }
    // Errors are handled inside updateImage, including stale requests after unmount.
    // eslint-disable-next-line no-void
    void updateImage()
    return () => {
      cancelled = true
    }
  }, [textureUrl])

  useEffect(() => {
    rubikCubeRef.current?.setBodyColor(bodyColor)
  }, [bodyColor])

  const updateView = (next: RubikView): void => {
    setView(next)
    rubikCubeRef.current?.setView(next)
  }

  return (
    <section className={styles.rubikCubePhoto}>
      {error && (
        <SimpleError
          message={error}
          onConfirm={() => {
            setError('')
          }}
        />
      )}
      <PanelContainer
        size='large'
        board={
          <Saver
            saveAction='saveOnly'
            fileName={fileName}
            imgUrlGetter={() => rubikCubeRef.current?.toDataURL() ?? ''}
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
                  onImageChanged={setTextureUrl}
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
                  setTextureUrl(avatar)
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
                  setTextureUrl(cat)
                }}
              >
                示例2：猫猫
              </Button>
            </div>
            <label className={styles.colorControl}>
              <Typography component='span' variant='body2'>
                底座颜色
              </Typography>
              <input
                className={styles.colorInput}
                type='color'
                value={bodyColor}
                onChange={event => {
                  setBodyColor(event.target.value)
                }}
              />
            </label>
            <div
              className={styles.rotationControls}
              role='group'
              aria-label='魔方旋转'
            >
              <RotationPad value={view} onChange={updateView} />
              <Button
                size='small'
                variant='outlined'
                onClick={() => {
                  updateView(DEFAULT_VIEW)
                }}
              >
                复位
              </Button>
            </div>
          </div>
        }
      />
    </section>
  )
}

export default RubikCubePhoto
