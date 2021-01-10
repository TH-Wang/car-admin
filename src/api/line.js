import axios from './http'
import { getUserId } from './utils'

export default { getLineList, updateLine }

// 获取线路列表
function getLineList ({ pageNo, pageSize }) {
  return axios.post('/line/queryList', { pageNo, pageSize, userId: getUserId() })
}

// 修改线路信息
function updateLine (data) {
  return axios({
    url: '/line/update',
    method: 'POST',
    data,
    params: { userId: getUserId() }
  })
}
