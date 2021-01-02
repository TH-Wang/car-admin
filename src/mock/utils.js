// 获取列表中对应页码的内容
export const getByPage = (list, pageNum, pageSize) => {
  const start = (pageNum - 1) * pageSize
  const end = start + pageSize
  return list.slice(start, end)
}
