import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const testBlog = {
    author: 'Pekka Saari',
    title: 'Story of Javascript',
    likes: 5,
    url: 'www.storyof.com',
    user: {
      name: 'Matti'
    }
  }
  const removeMockHandler = jest.fn()
  const likeMockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={testBlog} removeBlog={removeMockHandler} likeBlog={likeMockHandler} />
    )
  })

  it('renders only author and title', () => {
    expect(component.container).toHaveTextContent(testBlog.author)
    expect(component.container).toHaveTextContent(testBlog.title)
    expect(component.container).not.toHaveTextContent(testBlog.likes)
    expect(component.container).not.toHaveTextContent(testBlog.url)
    expect(component.container).not.toHaveTextContent(testBlog.user.name)
  })

  it('click name and everything is visible', () => {
    const button = component.getByText(testBlog.title + ' ' + testBlog.author)
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(testBlog.author)
    expect(component.container).toHaveTextContent(testBlog.title)
    expect(component.container).toHaveTextContent(testBlog.likes)
    expect(component.container).toHaveTextContent(testBlog.url)
    expect(component.container).toHaveTextContent(testBlog.user.name)
  })
})