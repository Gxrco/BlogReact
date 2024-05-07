import React, { useEffect, Suspense } from 'react'
import Button from '../components/Button'
import Badge from '../components/Badge'
import CardPost from '../components/CardPost'
import './styles/MainPage.css'
import { getAllPosts } from '../utils/fetchData'
import { useRouter } from '../utils/RouterContext'
import ClipLoader from 'react-spinners/ClipLoader'

function MainPage () {
  const [posts, setPosts] = React.useState([])
  const { navigate } = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPosts()
      setPosts(data.data)
    }

    fetchPosts()
  }, [])

  return (
    <div className="Page_Posts">
      <header className="header">
        <div className="brand">
          <img src="https://img.icons8.com/ios-filled/100/FFFFFF/cat-butt.png" alt="Brand" />
          <h1>CATBLOG365</h1>
        </div>
        <Button text="LOGIN" onClick={() => navigate('/login')} />
      </header>
      <div className="banner">
        <img src="https://images.unsplash.com/photo-1578258826350-708e15ac8c99?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Banner" />
        <p className="banner-text">WELCOME</p>
      </div>
      <div className="sub-banner">
        <h2>LET'S READ TOGETHER ABOUT CATS</h2>
      </div>
      <div className="container">
        <aside className="aside">
          <p className="title-LU">Last updates</p>
          <Suspense fallback={<ClipLoader />}>
            {[...posts].reverse().map((post) => {
              const date = new Date(post.created_at)
              const formattedDate = date.toLocaleDateString('en-GB')

              return (
                <Badge
                  key={post.id}
                  text={`${post.title} - ${formattedDate}`}
                />
              )
            })}
          </Suspense>
        </aside>
        <main className="main">
          <Suspense fallback={<ClipLoader />}>
            {posts.map((post) => {
              const date = new Date(post.created_at)
              const formattedDate = date.toLocaleDateString('en-GB')

              return (
                <CardPost
                  key={post.id}
                  title={post.title}
                  date={formattedDate}
                  imageSrc={post.image}
                  description={post.content}
                />
              )
            })}
          </Suspense>
        </main>
      </div>
      <footer className="footer">
        Page created by Gerson Ramirez also known as Gerco, this project has been developed with React and Vite.
        The API also has been developed by me using Node.js and Express. The license of this project is MIT.
        <div className="referenceContainer">
          <div className="pair">
            <a className="reference" href="https://github.com/Gxrco" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-glyphs/60/FFFFFF/github.png" alt="Github Icon" />
              GitHub
            </a>
          </div>
          <div className="pair">
            <a className="reference" href="https://www.linkedin.com/in/gxrco/" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/FFFFFF/linkedin.png" alt="LinkedIn Icon" />
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainPage
