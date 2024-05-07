import React from 'react'
import './styles/CardPost.css'

function CardPost ({
  title, date, imageSrc, description
}) {
  return (
    <div className="cardPost">
      <img src={imageSrc} alt="Post" />
      <div className="postInfo">
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
      <p>{description}</p>
    </div>
  )
}

export default CardPost
