import React from 'react'

import { Tab, Tabs, Select, MenuItem, FormControl } from '@/ui/material'

import styles from './AppBarTabs.module.scss'

interface AppBarTabsProps {
  tabs: {
    title: string
    id: string
  }[]
  activeTabIndex: number
  handleSwitchTab: (activeTabIndex: number) => void
}

const AppBarTabs = (props: AppBarTabsProps): JSX.Element => {
  const { tabs, activeTabIndex, handleSwitchTab } = props
  return (
    <div className={styles.appBarTabs}>
      <div className={styles.selector}>
        <FormControl fullWidth variant='standard'>
          <Select
            disableUnderline
            value={activeTabIndex}
            onChange={e => {
              handleSwitchTab(e.target.value as number)
            }}
            classes={{
              select: styles.muiSelect,
            }}
            size='small'
          >
            {tabs.map((item, index) => (
              <MenuItem key={item.id} value={index}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.tabs}>
        <Tabs
          value={activeTabIndex}
          onChange={(
            event: React.ChangeEvent<unknown>,
            newValue: number,
          ): void => {
            handleSwitchTab(newValue)
          }}
          centered
          indicatorColor='primary'
          textColor='primary'
          scrollButtons
          allowScrollButtonsMobile
        >
          {tabs.map(item => (
            <Tab label={item.title} key={item.id} />
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default AppBarTabs
