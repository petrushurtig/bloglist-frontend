import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const { title, author, url } = newBlog
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewBlog((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <input id="title" type="text" value={title} placeholder="write here title" name="title" onChange={handleChange} ></input>
        <input id="author" type="text" value={author} placeholder="author" name="author" onChange={handleChange} ></input>
        <input id="url" type="text" value={url} placeholder="url" name="url" onChange={handleChange} ></input>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm