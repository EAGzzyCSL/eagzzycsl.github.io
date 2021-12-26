import { GetStaticPropsResult } from 'next'
import React from 'react'

import AppPage from '@/shell/AppPage'

import styles from './Template.module.scss'
import theme from './theme'

const Template = (): JSX.Element => (
  <AppPage title='模板' theme={theme}>
    <section className={styles.template}>Template</section>
  </AppPage>
)

export default Template

export const getStaticProps = (): GetStaticPropsResult<unknown> => ({
  props: {},
})
