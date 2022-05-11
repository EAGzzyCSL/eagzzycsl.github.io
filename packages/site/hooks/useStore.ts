import React from 'react'

import store from '@/store'

const storeContext = React.createContext(store)

const useStore = (): typeof store => React.useContext(storeContext)

export default useStore
