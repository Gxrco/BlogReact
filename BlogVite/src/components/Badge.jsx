import React from 'react'
import './styles/Badge.css'

function Badge ({ text }) {
  return (
    <span className="badge">
      {text}
    </span>
  )
}

export default Badge
