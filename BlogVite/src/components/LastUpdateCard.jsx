import React from 'react'
import './styles/LastUpdateCard.css'

function CardPost ({ title, date, description }) {
  const formattedDate = new Date(date).toLocaleDateString('en-GB')

  return (
    <div className="cardPost">
      <div className="postInfo">
        <h3>{title}</h3>
        <p>{formattedDate}</p>
      </div>
      <p>{description}</p>
    </div>
  )
}

export default CardPost
