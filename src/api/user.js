import axios from './http'
import { getUserId } from './utils'

export default { getUserList }

function getUserList ({ pageNo, pageSize }) {
  return axios.post('/web/user/list', { pageNo, pageSize, userId: getUserId() })
}
