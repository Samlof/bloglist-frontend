import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)

  const likedBlog = () => {
    console.log("liked :", blog.title)
  }
  const fullInfo = () => (
    <div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={likedBlog}>likes</button></div>
      <div>added by {blog.user.name}</div>
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