import React from 'react'

import store from '@/store'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useStore = () => React.useContext(React.createContext(store)) // eslint-disable-line @typescript-eslint/explicit-function-return-type

export default useStore
