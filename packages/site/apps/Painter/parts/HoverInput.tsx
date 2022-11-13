import React, { useEffect, useState } from 'react'

import cx from 'classnames'

import { Typography, TypographyProps } from '@/ui/material'

import styles from './HoverInput.module.scss'

interface HoverInputProps {
  children: JSX.Element
  initValue: string
  placeholder?: string
  displayVariant?: TypographyProps['variant']
}

const HoverInput = (props: HoverInputProps): JSX.Element => {
  const { children, initValue, placeholder, displayVariant } = props
  const [value, setValue] = useState(initValue)

  useEffect(() => {
    setValue(initValue)
  }, [initValue])

  const [isEdit, setIsEdit] = useState(false)
  return (
    <div className={styles.hoverInput}>
      <div
        className={cx(styles.container, {
          [styles.isEdit]: isEdit,
        })}
      >
        {isEdit ? (
          <children.type
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...children.props}
            autoFocus
            value={value}
            placeholder={placeholder}
            onInput={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
            ) => {
              setValue(event.target.value)
            }}
            onChange={(
              event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
              newValue: string,
            ) => {
              if (newValue) {
                setValue(newValue)
              }
            }}
            onBlurCapture={() => {
              setIsEdit(false)
            }}
          />
        ) : (
          <Typography
            onClick={() => {
              setIsEdit(true)
            }}
            variant={displayVariant}
            className={styles.display}
          >
            {(value || placeholder || '')
              .split('\n')
              .map((s: string, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={index}>{s}</span>
              ))}
          </Typography>
        )}
      </div>
    </div>
  )
}

HoverInput.defaultProps = {
  placeholder: '',
  displayVariant: 'h6',
}

export default HoverInput
