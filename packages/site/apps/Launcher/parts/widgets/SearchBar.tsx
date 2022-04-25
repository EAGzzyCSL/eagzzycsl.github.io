import React, { useState } from 'react'

import { IconButton, Paper } from '@mui/material'

import IconAliHead from '../../assets/icon-ali-head.svg'
import IconSearch from '../../assets/icon-search.svg'

import styles from './SearchBar.module.scss'

interface SearchBarProps {
  onSearch: (keyword: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps): JSX.Element => {
  const [inputValue, setInputValue] = useState('')
  const handleTapSearch = (): void => {
    onSearch(inputValue)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  return (
    <Paper className={styles.searchBar}>
      <IconButton className={styles.startIcon} size='small'>
        <img src={IconAliHead} className={styles.iconImg} />
      </IconButton>
      <div className={styles.inputArea}>
        <input
          className={styles.input}
          placeholder='Search'
          value={inputValue}
          onChange={handleInput}
        />
      </div>
      <IconButton
        className={styles.endIcon}
        size='small'
        onClick={handleTapSearch}
      >
        <img src={IconSearch} className={styles.iconImg} />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
