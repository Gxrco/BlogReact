import React from 'react'
import { RouterProvider } from './utils/RouterContext'
import withRouter from './utils/withRouter'
import LoginComponent from './pages/Login'
import DashboardComponent from './pages/Dashboard'
import MainPage from './pages/MainPage'
import './App.css'
import { ToastContainer } from 'react-toastify'

const Login = withRouter(LoginComponent, '/login')
const Dashboard = withRouter(DashboardComponent, '/admin')
const Posts = withRouter(MainPage, '/')

function App () {
  return (
    <RouterProvider>
      <ToastContainer />
      <Login />
      <Dashboard />
      <Posts />
    </RouterProvider>
  )
}

export default App
