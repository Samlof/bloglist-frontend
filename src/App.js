import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'

import blogService from './services/blogs'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}
const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const setError = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const setNotification = message => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }
  const addBlog = blog => {
    setBlogs(blogs.concat(blog))
    setNotification('Uusi blogi lisättiin')
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
    setNotification('Kirjauduttiin ulos')
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
        <Error message={errorMessage} />
        <Notification message={notificationMessage} />
        <LoginForm login={login} setErrorMessage={setError} setNotificatioMessage={setNotification} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Error message={errorMessage} />
      <Notification message={notificationMessage} />
      <p>{user.name} logged in</p>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <h2>create new</h2>
        <CreateBlogForm addBlog={addBlog} setErrorMessage={setError} />
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App