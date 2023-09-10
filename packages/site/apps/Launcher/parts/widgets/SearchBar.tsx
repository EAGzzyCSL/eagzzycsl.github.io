import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'

import cx from 'classnames'

import { useMyRouter } from '@/router'
import { AppDescribe } from '@/types/app'
import {
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Backdrop,
  Typography,
} from '@/ui/material'

import IconAliHead from '../../assets/icon-ali-head.svg'
import IconSearch from '../../assets/icon-search.svg'
import useStore from '../../store'

import styles from './SearchBar.module.scss'

interface SearchBarProps {
  onSearch: (keyword: string) => void
  apps: AppDescribe[]
}

const SearchBar = ({ onSearch, apps }: SearchBarProps): JSX.Element => {
  const router = useMyRouter()

  const [inputValue, setInputValue] = useState('')

  const handleTapSearch = (): void => {
    onSearch(inputValue)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  const handleNavToApp = useCallback(
    async (app: AppDescribe): Promise<void> => {
      await router.navToApp(app)
    },
    [router],
  )

  const [selectedAppIndex, setSelectedAppIndex] = useState(0)

  const [searchVisible, setSearchVisible] = useState(false)

  const appItemRef = useRef<HTMLDivElement>(null)

  const store = useStore()

  const handleCloseSearchResult = useCallback(() => {
    store.updateShellMaskVisible(false)
    setSearchVisible(false)
    setInputValue('')
  }, [store])

  const handleSearchBarFocus = (): void => {
    store.updateShellMaskVisible(true)
    setSelectedAppIndex(0)
    setSearchVisible(true)
  }

  const handleClickAppItem = async (index: number): Promise<void> => {
    setSelectedAppIndex(index)
    await handleNavToApp(appsInList[index])
    handleCloseSearchResult()
  }

  const handleClickBackdrop = (): void => {
    handleCloseSearchResult()
  }

  const appsInList = useMemo(
    () =>
      apps.filter(
        app =>
          app.title.includes(inputValue) ||
          app.appId.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    [apps, inputValue],
  )

  useEffect(() => {
    const handleKeyUpDown = (event: KeyboardEvent): void => {
      if (!searchVisible) {
        return
      }
      switch (event.code) {
        case 'ArrowDown': {
          setSelectedAppIndex(
            Math.min(selectedAppIndex + 1, appsInList.length - 1),
          )
          appItemRef.current?.scrollIntoView({
            block: 'end',
            inline: 'nearest',
            behavior: 'smooth',
          })
          break
        }
        case 'ArrowUp': {
          setSelectedAppIndex(Math.max(selectedAppIndex - 1, 0))
          appItemRef.current?.scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth',
          })
          break
        }
        case 'Escape': {
          handleCloseSearchResult()
          break
        }
        case 'Enter': {
          const selectedApp = appsInList[selectedAppIndex]
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          handleNavToApp(selectedApp)
          break
        }
        default:
          break
      }
    }
    document.addEventListener('keydown', handleKeyUpDown)
    return () => {
      document.removeEventListener('keydown', handleKeyUpDown)
    }
  }, [
    handleNavToApp,
    searchVisible,
    selectedAppIndex,
    appsInList,
    handleCloseSearchResult,
  ])

  return (
    <div className={styles.searchBar}>
      <Backdrop
        className={styles.back}
        open={searchVisible}
        onClick={handleClickBackdrop}
      />
      <Paper className={styles.bar}>
        <div className={styles.content}>
          <IconButton className={styles.startIcon} size='small'>
            <img
              src={IconAliHead}
              className={styles.iconImg}
              draggable='false'
            />
          </IconButton>
          <div className={styles.inputArea}>
            <input
              className={styles.input}
              placeholder='Search'
              value={inputValue}
              onChange={handleInput}
              onFocus={handleSearchBarFocus}
            />
          </div>
          <IconButton
            className={styles.endIcon}
            size='small'
            onClick={handleTapSearch}
          >
            <img
              src={IconSearch}
              className={styles.iconImg}
              draggable='false'
            />
          </IconButton>
        </div>
        <Paper
          className={cx(styles.searchResult, {
            [styles.expand]: searchVisible,
          })}
        >
          {appsInList.length ? (
            <List>
              {appsInList.map((app, index) => (
                <div
                  key={app.appId}
                  ref={index === selectedAppIndex ? appItemRef : undefined}
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={index === selectedAppIndex}
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        handleClickAppItem(index)
                      }}
                    >
                      <ListItemIcon>
                        <img src={app.icon} className={styles.appIcon} />
                      </ListItemIcon>
                      <ListItemText primary={app.title} />
                    </ListItemButton>
                  </ListItem>
                </div>
              ))}
            </List>
          ) : (
            <div className={styles.emptyResult}>
              <Typography color='text.secondary'>no result</Typography>
            </div>
          )}
        </Paper>
      </Paper>
    </div>
  )
}

export default SearchBar
