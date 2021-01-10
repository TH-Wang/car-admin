import axios from './http'
import { getUserId } from './utils'

export default {
  getTourList,
  createTour,
  updateTour,
  deleteTour,
  getTourTypeList,
  createTourType,
  deleteTourType
}

// 旅游列表
function getTourList (data) {
  return axios.post('/web/tour/list', { ...data, userId: getUserId() })
}

// 添加旅游
function createTour (data) {
  return axios.post('/web/tour/save', { ...data, userId: getUserId() })
}

// 修改旅游
function updateTour (data) {
  return axios.post('/web/tour/update', { ...data, userId: getUserId() })
}

// 删除旅游
function deleteTour (id) {
  return axios({
    url: '/web/tour/delete',
    method: 'POST',
    params: { id, userId: getUserId() }
  })
}

// 包车分类列表
function getTourTypeList () {
  return axios.post('/web/tour/listTourType')
}

// 添加包车分类
function createTourType (data) {
  return axios.post('/web/tour/saveTourType', data)
}

// 删除包车分类
function deleteTourType (id) {
  return axios({
    url: '/web/tour/deleteTourType',
    method: 'POST',
    params: { id }
  })
}
