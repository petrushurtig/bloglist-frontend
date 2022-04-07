import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogFrom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login.js'
import './App.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong credentials')
      setIsError(true)
      notificationTimeout()
    }
  }

  const notificationTimeout = () => {
    setTimeout(() => {
      setMessage(null)
      setIsError(false)
     }, 5000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try{
      const blog = await blogService.addBlog(blogObject, user)
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      notificationTimeout()
    } 
      catch (exception) {
        setMessage('failed')
        setIsError(true)
        notificationTimeout()
    }
  }
  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={isError} />
      
      {user === null ?
      <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({target}) => setPassword(target.value)}
        handleSubmit={handleLogin}
        />
        </Togglable> :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p> 
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App