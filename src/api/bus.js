import axios from './http'
import { getUserId } from './utils'

export default {
  getBusList,
  createBus,
  updateBus,
  deleteBus,
  getBusTypeList,
  createBusType,
  deleteBusType
}

// 包车列表
function getBusList (data) {
  return axios.post('/web/car/list', { ...data, userId: getUserId() })
}

// 添加包车
function createBus (data) {
  return axios.post('/web/car/save', { ...data, userId: getUserId() })
}

// 修改包车
function updateBus (data) {
  return axios.post('/web/car/update', { ...data, userId: getUserId() })
}

// 删除包车
function deleteBus (id) {
  return axios({
    url: '/web/car/delete',
    method: 'POST',
    params: { id, userId: getUserId() }
  })
}

// 包车分类列表
function getBusTypeList () {
  return axios.post('/web/car/listCarType')
}

// 添加包车分类
function createBusType (data) {
  return axios.post('/web/car/saveCarType', data)
}

// 删除包车分类
function deleteBusType (id) {
  return axios({
    url: '/web/car/deleteCarType',
    method: 'POST',
    params: { id }
  })
}
