import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)
  const titleInput = screen.getByPlaceholderText('write here title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('save')

  userEvent.type(titleInput, 'testing title')
  userEvent.type(authorInput, 'testing author')
  userEvent.type(urlInput, 'testing url')
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].content).toBe('testing title')
  expect(createBlog.mock.calls[0][1].content).toBe('testing author')
  expect(createBlog.mock.calls[0][2].content).toBe('testing url')
})