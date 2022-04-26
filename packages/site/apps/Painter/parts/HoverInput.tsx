import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import styles from './HoverInput.module.scss'

interface HoverInputProps {
  children: JSX.Element
  initValue: string
  placeholder?: string
}

const HoverInput = (props: HoverInputProps): JSX.Element => {
  const { children, initValue, placeholder } = props
  const [value, setValue] = useState(initValue)

  useEffect(() => {
    setValue(initValue)
  }, [initValue])

  const [isEdit, setIsEdit] = useState(false)
  return (
    <div className={styles.hoverInput}>
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
          variant='h6'
          className={styles.display}
        >
          {(value || placeholder || '')
            .split('\n')
            .map((s: string, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>{s}</div>
            ))}
        </Typography>
      )}
    </div>
  )
}

HoverInput.defaultProps = {
  placeholder: '',
}

export default HoverInput
