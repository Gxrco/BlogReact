import React from 'react'
import PostsGrid from '../components/PostGrid'
import './styles/editorPage.css'

function editorPage () {
  return (
    <div className="page-editor">
      <h1>POST MANAGER</h1>
      <PostsGrid />
    </div>
  )
}

export default editorPage
