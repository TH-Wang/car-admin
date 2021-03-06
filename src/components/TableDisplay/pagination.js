// pagination render
// use 'this' together with index
import styles from './index.module.css'

export default function (h) {
  const { pageNum, pageCount, total, handleCurChange, handleSizeChange } = this
  return h(
    'el-pagination',
    {
      class: styles.pagination,
      props: {
        currentPage: pageNum,
        pageCount: pageCount,
        total: total,
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      on: {
        'current-change': handleCurChange,
        'size-change': handleSizeChange
      }
    }
  )
}
