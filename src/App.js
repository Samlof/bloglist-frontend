import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

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

  const createBlogFormRef = React.createRef()

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
    createBlogFormRef.current.toggleVisibility()
    blog.user = user
    setBlogs(blogs.concat(blog))
    setNotification('Uusi blogi lisättiin')
  }

  const removeBlog = async blog => {
    if (window.confirm('remove blog. You\'re not gonna need it! by ' + blog.author)) {
      try {
        await blogService.remove(blog)
      } catch (e) {

        setErrorMessage(e.response.data.error)
        return
      }
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setNotification('Blogi poistettu')
    }
  }

  const likeBlog = async blog => {
    const updateObject = {
      id: blog.id,
      likes: blog.likes + 1
    }
    let newBlog
    try {
      newBlog = await blogService.update(updateObject)
    } catch (e) {
      setErrorMessage(e.response.data.error)
      return
    }

    const newBlogs = blogs.map(b => {
      if (b.id === newBlog.id) {
        b.likes = newBlog.likes
      }
      return b
    })
    setBlogs(newBlogs)
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
        <Togglable buttonLabel='login'>
          <LoginForm login={login} setErrorMessage={setError} setNotificatioMessage={setNotification} />
        </Togglable>
      </div>
    )
  }

  const blogsToShow = blogs.sort((a, b) => b.likes - a.likes)
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
        <Togglable buttonLabel='Create new' ref={createBlogFormRef}>
          <CreateBlogForm addBlog={addBlog} setErrorMessage={setError} />
        </Togglable>
      </div>
      {blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App