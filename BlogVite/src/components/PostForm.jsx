import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ImagePreview from './ImagePreview'
import './styles/PostForm.css'
import { createPost, updatePost } from '../utils/fetchData'
import notification from './Notification'

function PostForm ({ onNewPost, post }) {
  const {
    register, handleSubmit, watch, setValue, formState: { errors }, reset
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
      imageUrl: ''
    }
  })

  useEffect(() => {
    if (post) {
      setValue('title', post.title)
      setValue('content', post.content)
      setValue('imageUrl', post.image)
    }
  }, [post, setValue])

  const [showPreview, setShowPreview] = useState(false)

  const onSubmit = async (data) => {
    const { title, content, imageUrl } = data
    if (post) {
      try {
        console.log('updating post:', post.id, title, content, imageUrl)
        await updatePost(post.id, title, content, imageUrl)
        notification.notify('Post updated successfully', 'success')
        if (onNewPost) {
          onNewPost()
        }
        clearForm()
      } catch (error) {
        notification.notify('Error updating post', 'error')
      }
    } else {
      try {
        const result = await createPost(title, content, imageUrl)
        console.log(result)
        notification.notify('Post created successfully', 'success')
        if (onNewPost) {
          onNewPost()
        }
        clearForm()
      } catch (error) {
        console.error('Failed to create post:', error)
        notification.notify('Error creating post', 'error')
      }
    }
  }

  const clearForm = () => {
    reset({
      title: '',
      content: '',
      imageUrl: ''
    })
    setShowPreview(false)
  }

  const imageUrl = watch('imageUrl')

  return (
    <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <label className="label-form">
          <p>Title</p>
          <input {...register('title', { required: true })} />
          {errors.title && <span>This field is required</span>}
        </label>
        <label className="label-form">
          <p>Content</p>
          <textarea {...register('content', { required: true })} />
          {errors.content && <span>This field is required</span>}
        </label>
        <label className="label-form">
          <p>Image</p>
          <input {...register('imageUrl')} onChange={() => setShowPreview(false)} />
          <button className="button-preview" type="button" onClick={() => setShowPreview(true)}>Preview</button>
        </label>
        <div className="container-buttons-form">
          <button type="submit">{post ? 'Update' : 'Create'}</button>
          <button type="button" onClick={clearForm}>Clear</button>
        </div>
      </div>
      <div className="preview-section">
        {showPreview && <ImagePreview imageUrl={imageUrl} />}
      </div>
    </form>
  )
}

export default PostForm
