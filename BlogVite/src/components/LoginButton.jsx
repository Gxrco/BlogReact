import React from 'react'

function LoginButton ({ onClick, children }) {
  return (
    <button onClick={onClick} className="login-button">
      {children}
    </button>
  )
}

export default LoginButton
