import axios from './http'
import { getUserId } from './utils'

export default { getLineList }

function getLineList ({ pageNo, pageSize }) {
  return axios.post('/line/queryList', { pageNo, pageSize, userId: getUserId() })
}
