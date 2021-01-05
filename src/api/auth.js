import axios from './http'

export default { login }

function login (data) {
  return axios.post('/admin/login', data)
}
