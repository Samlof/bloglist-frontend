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
  const user = JSON.parse(window.localStorage.getItem('BlogUser'))

  const likedBlog = async () => {
    console.log("liked :", blog.title)
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
    console.log(newBlog)
    updateLikes(newBlog)
  }
  const deleteBlog = async () => {
    if (window.confirm("remove blog. You're not gonna need it! by " + blog.author)) {
      try {
        await blogService.remove(blog)
      } catch (e) {

        setErrorMessage(e.response.data.error)
        return
      }
      removeBlog(blog)
    }
  }

  const fullInfo = () => (
    <div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={likedBlog}>likes</button></div>
      <div>added by {blog.user.name}</div>
      {user.username === blog.user.username && <button onClick={deleteBlog}>remove</button>}
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