import React from 'react'
import {
  render, waitForElement
} from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Kirjaudu')
    )

    const blogs = component.container.querySelectorAll('.blog-wrapper')
    // expectations here
    expect(blogs.length).toBe(0)
  })


  it('Logged in should see blogs', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }
    window.localStorage.setItem('BlogUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog-wrapper')
    )

    const blogs = component.container.querySelectorAll('.blog-wrapper')
    // expectations here
    expect(blogs.length).toBe(3)
  })
})