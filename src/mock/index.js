import Mock from 'mockjs'
import { getByPage } from './utils'

const Random = Mock.Random

const total = Random.integer(20, 100)
const userList = new Array(total).fill('').map((item, index) => ({
  id: index,
  name: Random.cname(),
  desc: Random.csentence(),
  identity: Random.integer(1, 4),
  createAt: Random.datetime('yyyy-MM-dd HH:mm')
}))

Mock.mock(new RegExp('/user/list'), 'post', (res) => {
  const { pageNum, pageSize } = JSON.parse(res.body)
  const list = getByPage(userList, pageNum, pageSize)
  return {
    status: 200,
    msg: '请求成功',
    data: { list, total, pageNum, pageSize }
  }
})
