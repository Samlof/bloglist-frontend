import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => token = 'Bearer ' + newToken
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = blog => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(res => res.data)
}

const update = blog => {
  const request = axios.put(baseUrl + '/' + blog.id, blog)
  return request.then(res => res.data)
}

export default { getAll, create, setToken, update }