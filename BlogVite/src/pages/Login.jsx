import React, { useState } from 'react'
import InputField from '../components/InputField'
import LoginButton from '../components/LoginButton'
import { authenticate } from '../utils/authentication'
import { useRouter } from '../utils/RouterContext'
import './styles/Login.css'
import notification from '../components/Notification'

function LoginComponent () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { navigate } = useRouter()

  const handleLogin = async () => {
    const isAuthenticated = await authenticate(username, password)

    if (isAuthenticated) {
      navigate('/admin')
      notification.notify('Login successful', 'success')
    } else {
      notification.notify('Invalid username or password', 'error')
    }
  }

  return (
    <div className="page_login">
      <div className="login-container">
        <h2>Login</h2>
        <InputField label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <LoginButton onClick={handleLogin}>Login</LoginButton>
      </div>
    </div>
  )
}

export default LoginComponent
