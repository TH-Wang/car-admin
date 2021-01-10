import axios from './http'
import { getUserId } from './utils'

export default {
  auditCheck,
  getGroupList,
  getStationList
}

// 审核通过
function auditCheck (params) {
  return axios({
    url: '/audit/check',
    method: 'POST',
    params
  })
}

// 查询拼车群列表
function getGroupList (data) {
  return axios.post('/audit/groupList', { ...data, userId: getUserId() })
}

// 查询站长列表
function getStationList (params) {
  return axios({
    url: '/audit/stationList',
    method: 'POST',
    params
  })
}
