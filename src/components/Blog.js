import React, { useState } from 'react'

const Blog = ({ blog, handleLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)
  const handleVisibility = () => {
    setExpanded(!expanded)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        {expanded ?
          <>
            <button onClick={handleVisibility}>hide</button>
            <p>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
            <p>{blog.url}</p>
            <p>{blog.user.name}</p>
            {user ?
              <div>
                {blog.user.id === user.id &&
          <button style={{ backgroundColor:'red' }} onClick={() => removeBlog(blog)}>remove</button>
                }
              </div>
              : <></>
            }
          </>
          :
          <button onClick={handleVisibility}>view more info</button>
        }
      </div>

    </div>
  )}

export default Blog