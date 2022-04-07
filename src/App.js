import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
       }, 5000)
    }
  }

  if(user===null){
    return(
      <div>
        <h2>Log in to application</h2>
        <p>{errorMessage}</p>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              name="username"
              onChange={({target}) => setUsername(target.value)}
              />
              <label>Password</label>
              <input 
                type="password"
                value={password}
                name="password"
                onChange={({target}) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App