import React, {
  createContext, useContext, useState, useEffect
} from 'react'

const RouterContext = createContext()

export function useRouter () {
  return useContext(RouterContext)
}

export function RouterProvider ({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', onLocationChange)
    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])

  return (
    <RouterContext.Provider value={{
      currentPath,
      navigate: (path) => {
        history.pushState({}, '', path)
        setCurrentPath(path)
      }
    }}
    >
      {children}
    </RouterContext.Provider>
  )
}
