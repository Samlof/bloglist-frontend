import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const addBlog = blog => {
    setBlogs(blogs.concat(blog))
  }
  const login = user => {
    window.localStorage.setItem('BlogUser', JSON.stringify(user))
    setUser(user)
    blogService.setToken(user.token)
  }
  const logout = () => {
    window.localStorage.removeItem('BlogUser')
    setUser(null)
    blogService.setToken(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // Try to load old user
  useEffect(() => {
    const user = window.localStorage.getItem('BlogUser')
    if (user) login(JSON.parse(user))
  }, [])


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm login={login} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <h2>create new</h2>
        <CreateBlogForm addBlog={addBlog} />
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App