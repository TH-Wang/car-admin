import axios from './http'

export default { getUserList }

function getUserList ({ pageNum, pageSize }) {
  return axios.post('/user/list', { pageNum, pageSize })
}
