// eslint-disable-next-line no-unused-vars
import React, { useEffect, useCallback, Suspense } from 'react'
import './styles/Home.css'
import ClipLoader from 'react-spinners/ClipLoader'
import PostForm from '../components/PostForm'
import { getAllPosts } from '../utils/fetchData'
import LastUpdateCard from '../components/LastUpdateCard'

function Home () {
  const [posts, setPosts] = React.useState([])

  const fetchPosts = useCallback(async () => {
    const data = await getAllPosts()
    setPosts(data.data.reverse())
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div className="home-dashboard">
      <h1>CREATE A NEW POST</h1>
      <div className="container-home">
        <aside className="aside-home">
          <p className="title-LU">Last updates</p>
          <div className="aside-content">
            <Suspense fallback={<ClipLoader />}>
              {posts.map((post, index) => (
                <LastUpdateCard
                  key={index}
                  title={post.title}
                  date={post.created_at}
                  description={post.content}
                />
              ))}
            </Suspense>
          </div>
        </aside>
        <PostForm onNewPost={fetchPosts} />
      </div>
    </div>
  )
}

export default Home
