import { useState, useEffect } from 'react'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login.jsx'
import { Post } from './components/Post.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllPosts } from './features/posts/postThunks.js'
import { Header } from './components/Header.jsx'
import { CreatePost } from './components/CreatePost.jsx'
import { PostSkeleton } from './components/Skeletons/postSkeleton.jsx'
import { CreatePostSkeleton } from './components/Skeletons/CreatePostSkeleton.jsx'

function App() {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.post?.posts || [])
  const { loading } = useSelector(state => state.post)
  // console.log('loading from app.jsx -> ',loading)


  useEffect(() => {
    dispatch(fetchAllPosts({ page: 1, per_page: 10 }))
  }, [dispatch])


  if(loading)


  // Skeleton loading
  if (loading) {
    return (
      <div className='max-w-2xl px-2 mx-auto space-y-4 '>
        {<CreatePostSkeleton />}
        {Array.from({ length: 10 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    )
  }



  return (
    <>
      <Header />
      <CreatePost />
      {/* <Register /> */}
      <Login />


      {posts.map(post => (
        <Post
          key={post.post_id}
          post={post}
        />
      ))}

    </>
  )
}

export default App
