import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('BlogUser')
    if (user) setUser(JSON.parse(user))
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} />
      </div>
    )
  }
  const logOut = () => {
    window.localStorage.removeItem('BlogUser')
    setUser(null)
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <div>
        <button onClick={logOut}>Logout</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App