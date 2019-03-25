import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, removeBlog, likeBlog }) => {
  const [showAll, setShowAll] = useState(false)
  const getUsername =
    () => {
      const user = JSON.parse(window.localStorage.getItem('BlogUser'))
      return user ? user.username : null
    }



  const fullInfo = () => (
    <div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={likeBlog}>likes</button></div>
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