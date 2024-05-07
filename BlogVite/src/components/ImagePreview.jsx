// ImagePreview.jsx
import React from 'react'
import './styles/ImagePreview.css'

function ImagePreview ({ imageUrl }) {
  return imageUrl ? <img src={imageUrl} alt="Preview" className="preview-image" /> : null
}

export default ImagePreview
