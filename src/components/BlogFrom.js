import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
    })
    const { title, author, url } = newBlog
    const handleChange = (e) => {
        const {name, value } = e.target;
        setNewBlog((prev) => {
            return {
                ... prev,
                [name]: value,
            }
        })
    }
    const addBlog = (e) => {
        e.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url
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
            <input type="text" value={title} name="title" onChange={handleChange} ></input>
            <input type="text" value={author} name="author" onChange={handleChange} ></input>
            <input type="text" value={url} name="url" onChange={handleChange} ></input>
            <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default BlogForm