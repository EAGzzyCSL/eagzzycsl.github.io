import { useContext, createContext } from 'react'

export const createStore = <T>(store: T): (() => T) => {
  const storeContext = createContext(store)
  return () => useContext(storeContext)
}
