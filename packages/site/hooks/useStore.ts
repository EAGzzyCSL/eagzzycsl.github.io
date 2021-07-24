import React from 'react'

import store from '@/store'

const useStore = (): typeof store =>
  React.useContext(React.createContext(store))

export default useStore
