import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  const testBlog = {
    author: 'Pekka Saari',
    title: 'Story of Javascript',
    likes: 5
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={testBlog} onClick={mockHandler} />
    )
  })

  it('renders its content', () => {
    expect(component.container).toHaveTextContent(testBlog.author)
    expect(component.container).toHaveTextContent(testBlog.title)
    expect(component.container).toHaveTextContent(testBlog.likes)
  })

  it('click liked twice fires handler twice', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})