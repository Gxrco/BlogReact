import React, { useState, useEffect, Suspense } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import GridCard from './GridCard'
import Modal from './Modal'
import PostForm from './PostForm'
import './styles/PostGrid.css'
import { getAllPosts, deletePost } from '../utils/fetchData'
import notification from './Notification'

function PostsGrid () {
  const [posts, setPosts] = useState([])
  const [editPost, setEditPost] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getAllPosts()
        setPosts(result.data)
      } catch (error) {
        notification.notify('Error loading posts', 'error')
      }
    }

    loadData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deletePost(id)
      setPosts(posts.filter(post => post.id !== id))
      notification.notify('Post deleted successfully', 'success')
    } catch (error) {
      notification.notify('Error deleting post', 'error')
    }
  }

  const handleEdit = (post) => {
    setEditPost(post)
  }

  const closeEditModal = () => {
    setEditPost(null)
  }

  return (
    <div className="posts-grid">
      <Suspense fallback={<ClipLoader />}>
        {posts.map(post => (
          <GridCard
            key={post.id}
            title={post.title}
            description={post.content}
            image={post.image}
            onDelete={() => handleDelete(post.id)}
            onEdit={() => handleEdit(post)}
          />
        ))}
      </Suspense>
      <Modal isOpen={editPost !== null} onClose={closeEditModal} className="Modal">
        <PostForm
        post={editPost}
          onNewPost={() => {
            closeEditModal()
            getAllPosts().then((result) => setPosts(result.data))
          }}
        />
      </Modal>
    </div>
  )
}

export default PostsGrid
