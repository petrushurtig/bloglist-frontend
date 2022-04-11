import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}
const addBlog = async (blog, user) => {
  const res = await axios.post(baseUrl, 
    blog, {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
  return res.data
}
const updateBlog = async (blog, user) => {
  const res = await axios.put(baseUrl + blog.id ,
    blog, { 
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
  
  return res.data
}
const removeBlog = async (blog, user) => {
  const res = await axios.delete(baseUrl + blog.id,
    { 
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    console.log(res)
    return res
}

export default { getAll, addBlog, updateBlog, removeBlog }