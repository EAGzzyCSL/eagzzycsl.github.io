import React from 'react'

import styles from './BootLoading.module.scss'

const BootLoading = (): JSX.Element => (
  <div className={styles.bootLoading}>
    <div className={styles.logo}>芹也</div>
    <div className={styles.loading}>
      <div className={styles.loadingBar} />
    </div>
  </div>
)

export default BootLoading
