import { useState, useEffect } from 'react'
import './App.css'
import Register from './pages/Register'
import Post from './pages/Post'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllPosts } from './features/posts/postThunks.js'

function App() {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.post?.posts || [])
  const { loading } = useSelector(state => state.post)
  
  useEffect(() => {
    dispatch(fetchAllPosts({page:1, per_page:10}))
  }, [dispatch])

  if (loading){
    return <div>Loading...</div>
  }
  if(!posts || posts.length === 0){
    return <div style={{textAlign:'center'}}>No posts yet...</div>
  } 
    

  return (
    <>
     {/* <Register /> */}

     {posts.map(post => (
      <Post key={post.id} post={post} />
     ))}

    </>
  )
}

export default App
