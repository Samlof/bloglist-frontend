import React from 'react'

import blogService from '../services/blogs'
import { useField } from '../hooks'

const CreateBlogForm = (props) => {
  const { addBlog, setErrorMessage } = props
  const [resetTitle, title] = useField('text')
  const [resetAuthor, author] = useField('text')
  const [resetUrl, url] = useField('text')

  const submitForm = async e => {
    e.preventDefault()
    const blogObj = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    let newBlog
    try {
      newBlog = await blogService.create(blogObj)
    } catch (e) {
      setErrorMessage(e.response.data.error)
      return
    }
    resetTitle()
    resetAuthor()
    resetUrl()

    addBlog(newBlog)
  }
  return (
    <form>
      <div>
        title:
        <input {...title} />
      </div>
      <div>
        author:
        <input {...author} />
      </div>
      <div>
        url:
        <input {...url} />
      </div>
      <div>
        <button onClick={submitForm}>create</button>
      </div>
    </form>
  )
}

export default CreateBlogForm