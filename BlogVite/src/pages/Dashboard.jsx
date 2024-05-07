import React, { useEffect, useState } from 'react'
import { useRouter } from '../utils/RouterContext'
import withRouter from '../utils/withRouter'
import Navbar from '../components/Navbar'
import Home from './Home'
import editorPage from './Reports'
import Products from './Products'
import './styles/Dashboard.css'
import { verifyAuthentication } from '../utils/fetchData'
import notification from '../components/Notification'

function Dashboard () {
  const { navigate, currentPath } = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    verifyAuthentication().then((isAuth) => {
      if (isAuth) {
        setIsAuthenticated(true)
        if (currentPath === '/admin') {
          navigate('/admin/home')
        }
      } else {
        notification.notify('You are not authenticated', 'error')
        navigate('/login')
      }
    })
  }, [navigate, currentPath])

  const HomeWithRouter = withRouter(Home, '/admin/home')
  const ReportsWithRouter = withRouter(editorPage, '/admin/editorPage')
  const ProductsWithRouter = withRouter(Products, '/admin/products')

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="page_dashboard">
      <Navbar />
      <HomeWithRouter />
      <ReportsWithRouter />
      <ProductsWithRouter />
    </div>
  )
}

export default Dashboard
