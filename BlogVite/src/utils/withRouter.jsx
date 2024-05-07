import React from 'react'
import { useRouter } from './RouterContext'

const withRouter = (Component, basePath) => function WrappedComponent (props) {
  const { currentPath } = useRouter()
  if (currentPath.startsWith(`${basePath}/`) || currentPath === basePath) {
    return <Component {...props} />
  }
  return null
}

export default withRouter
