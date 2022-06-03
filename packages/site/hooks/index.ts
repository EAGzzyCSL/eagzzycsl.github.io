import { useEffect } from 'react'

const useHashChange = (onHashChange: () => void): void => {
  useEffect(() => {
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])
}

export { useHashChange }
