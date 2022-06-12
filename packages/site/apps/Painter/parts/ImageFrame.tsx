import React, { useState, useRef, useEffect } from 'react'

import {
  PhotoCameraRounded as PhotoCameraIconRounded,
  CropRounded as CropIconRounded,
} from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material'
import cx from 'classnames'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import { createImageDataUrlFromCrop } from '../utils/crop'

import styles from './ImageFrame.module.scss'

export interface CropDialogProps {
  open: boolean
  onClose: (withConfirm: boolean) => void
  imgUrl: string
  crop?: Crop
  onCropChange: (crop: Crop) => void
  onCropDone: (imgUrl: string) => void
}

const CropDialog = (props: CropDialogProps): JSX.Element => {
  const { open, onClose, imgUrl, crop, onCropChange, onCropDone } = props

  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  const imageRef = useRef<HTMLImageElement>(null)

  const handleConfirm = (): void => {
    onClose(true)
    if (imageRef.current && completedCrop) {
      const imageDataUrl = createImageDataUrlFromCrop(
        imageRef.current,
        completedCrop,
      )
      onCropDone(imageDataUrl)
    }
  }
  return (
    <Dialog
      onClose={() => onClose(false)}
      open={open}
      className={styles.cropDialog}
    >
      <DialogTitle>修剪图片</DialogTitle>
      <DialogContent>
        <ReactCrop
          crop={crop}
          // 拖拽中
          onChange={c => onCropChange(c)}
          // 拖拽完
          onComplete={c => setCompletedCrop(c)}
        >
          <img ref={imageRef} src={imgUrl} className={styles.imageToCrop} />
        </ReactCrop>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant='text' onClick={handleConfirm}>
          确认
        </Button>
      </DialogActions>
    </Dialog>
  )
}

CropDialog.defaultProps = {
  crop: undefined,
}

interface ImageFrameProps {
  imgUrl?: string
}

const ImageFrame = (props: ImageFrameProps): JSX.Element => {
  const { imgUrl } = props

  const [originImageUrl, setOriginImageUrl] = useState(imgUrl || '')
  const [croppedUrl, setCroppedUrl] = useState(originImageUrl)

  useEffect(() => {
    setOriginImageUrl(imgUrl || '')
    setCroppedUrl(imgUrl || '')
  }, [imgUrl])

  const inputRef = useRef<HTMLInputElement>(null)

  const [crop, setCrop] = useState<Crop>()

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleStartCrop = (): void => {
    setDialogOpen(true)
  }

  return (
    <div className={styles.imageFrame}>
      {/* 使用背景图会导致html2canvas模糊
       * issue: https://github.com/niklasvh/html2canvas/issues/1464
       */}
      {croppedUrl && (
        <div className={styles.imageContainer}>
          <img className={styles.imageShow} src={croppedUrl} />
        </div>
      )}
      <div
        className={cx(styles.uploadButton, {
          [styles.alwaysBorder]: !originImageUrl,
        })}
      >
        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          className={styles.input}
          placeholder=''
          title=''
          onChange={e => {
            if (e.target.files && e.target.files.length > 0) {
              const reader = new FileReader()
              reader.addEventListener('load', () => {
                if (reader.result) {
                  const selectedImage = reader.result.toString()
                  setOriginImageUrl(selectedImage)
                  setCroppedUrl(selectedImage)
                  setDialogOpen(true)
                } else {
                  // eslint-disable-next-line no-alert
                  alert('读取文件失败')
                }
              })
              reader.readAsDataURL(e.target.files[0])
              // 避免下次选同样图片时onChange不触发
              e.target.value = ''
            }
          }}
        />
        <div className={styles.iconContainer}>
          <Tooltip title={originImageUrl ? '重选图片' : '选择图片'}>
            <IconButton onClick={() => inputRef.current?.click()}>
              <PhotoCameraIconRounded fontSize='large' color='secondary' />
            </IconButton>
          </Tooltip>
          {originImageUrl && (
            <Tooltip title='重新裁剪'>
              <IconButton onClick={handleStartCrop}>
                <CropIconRounded fontSize='large' color='secondary' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
      <CropDialog
        open={dialogOpen}
        imgUrl={originImageUrl}
        crop={crop}
        onCropChange={setCrop}
        onClose={() => {
          setDialogOpen(false)
        }}
        onCropDone={setCroppedUrl}
      />
    </div>
  )
}

ImageFrame.defaultProps = {
  imgUrl: '',
}

export default ImageFrame
