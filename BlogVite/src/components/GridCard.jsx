import React from 'react'
import './styles/GridCard.css'

function GridCard ({
  title, description, image, onDelete, onEdit
}) {
  return (
    <div className="post-card-grid">
      <div className="post-image">
        {/* Placeholder for the image */}
        <img src={image} alt="Post" />
      </div>
      <div className="post-details">
        <div className="info-card">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="buttons">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default GridCard
