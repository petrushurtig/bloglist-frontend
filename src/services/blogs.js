import axios from 'axios'
const baseUrl = '/api/blogs'

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
  console.log(res.data)
  return res.data
}

export default { getAll, addBlog }