const URL = 'https://api.tiburoncin.lat/22281'

export async function getAllPosts () {
  try {
    const response = await fetch(`${URL}/posts`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export async function loginUser (username, password) {
  const data = { username, password }

  try {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      const result = await response.json()
      return { token: result.token }
    }
    const errorMessage = await response.text()
    return { error: errorMessage }
  } catch (error) {
    console.error('Error during login:', error)
    return { error: error.message }
  }
}

export async function verifyAuthentication () {
  try {
    const response = await fetch(`${URL}/auth`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    const data = await response.json()
    if (response.ok && data.authenticated) {
      console.log('User details:', data.user)
      return true
    }
    console.error('Authentication error:', data.error)
    return false
  } catch (error) {
    console.error('Error during authentication', error)
    return false
  }
}

export async function createPost (title, content, imageUrl) {
  const postData = {
    title,
    content,
    image: imageUrl
  }

  try {
    const response = await fetch(`${URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(postData)
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`HTTP status ${response.status}: ${errorData}`)
    }

    const result = await response.text()
    return result
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export const updatePost = async (id, title, content, image) => {
  try {
    const response = await fetch(`${URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, content, image })
    })

    if (!response.ok) {
      const errorText = await response.text() // Obtener el texto del error
      throw new Error(`HTTP status ${response.status}: ${errorText}`)
    }

    const resultText = await response.text() // Obtener el texto de la respuesta exitosa
    return resultText
  } catch (error) {
    console.error('Failed to update post:', error)
    throw error
  }
}
export const deletePost = async (id) => {
  try {
    const response = await fetch(`${URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (!response.ok) {
      throw new Error('Failed to delete post')
    }
    const result = await response.text()
    return result
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}
