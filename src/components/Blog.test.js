import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('title and author is rendered', () => {
  const blog = {
    title: 'Test',
    author: 'Test'
  }
  render(<Blog blog={blog} />)
  const element = screen.getByText('Test Test')
  expect(element).toBeDefined()
})
test('clicking the button gets also url an likes shown', () => {
  const blog = {
    title: 'Test',
    author: 'Test'
  }

  render(
    <Blog blog={blog} />
  )
  const button = screen.getByText('view more info')
  userEvent.click(button)
  const element = screen.getByText('likes Test')
  expect(element).toBeDefined()
})
test('clicking the button twice calls the event handler twice', () => {
  const blog = {
    title: 'Test',
    author: 'Test'
  }
  const mockHandler = jest.fn()
  render(
    <Blog blog={blog} handleVisibility={mockHandler} />
  )
  const button = screen.getByText('view more info')
  userEvent.click(button)
  userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})