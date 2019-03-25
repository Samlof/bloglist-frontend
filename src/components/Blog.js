import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, setErrorMessage, updateLikes, removeBlog }) => {
  const [showAll, setShowAll] = useState(false)
  const getUsername =
    () => JSON.parse(window.localStorage.getItem('BlogUser')).username

  const likedBlog = async () => {
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
    updateLikes(newBlog)
  }

  const fullInfo = () => (
    <div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={likedBlog}>likes</button></div>
      <div>added by {blog.user.name}</div>
      {getUsername() === blog.user.username && <button onClick={() => removeBlog(blog)}>remove</button>}
    </div>
  )
  return (
    <div style={blogStyle}>
      <div onClick={() => setShowAll(!showAll)}>
        {blog.title} {blog.author}
      </div>
      {showAll && fullInfo()}
    </div>
  )
}

export default Blog