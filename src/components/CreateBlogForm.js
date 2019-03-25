import React, { useState } from 'react'
import blogService from '../services/blogs'

const LoginForm = (props) => {
  const { addBlog } = props
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitForm = async e => {
    e.preventDefault()
    const blogObj = {
      title, author, url
    }
    const newBlog = await blogService.create(blogObj)
    setTitle('')
    setAuthor('')
    setUrl('')

    addBlog(newBlog)
  }
  return (
    <form>
      <div>
        title:
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        author:
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        url:
        <input value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div>
        <button onClick={submitForm}>create</button>
      </div>
    </form>
  )
}

export default LoginForm