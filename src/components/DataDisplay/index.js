import Vue from 'vue'
import styles from './index.module.css'
import tableRender from './table'
import settingsRender from './settings'
import paginationRender from './pagination'

export default Vue.component('custom-table', {
  model: {
    prop: 'data',
    event: 'update'
  },
  props: {
    // 展示数据
    data: { type: Array, default: () => ([]) },
    // 表格配置项
    columns: { type: Array, default: () => ([]) },
    // 请求数据的方法
    queryFunc: { type: Function, default: () => ({ data: [], total: 0 }) }
  },
  data: () => ({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    loading: false,
    size: 'medium',
    stripe: true,
    border: true,
    tableSize: [['mini', '小'], ['small', '正常'], ['medium', '大']]
  }),
  mounted () {
    this.handleDatas()
  },
  methods: {
    // 处理请求
    async handleDatas () {
      this.loading = true
      const { pageNum, pageSize } = this
      const { data, total } = await this.queryFunc(pageNum, pageSize)
      this.$emit('update', data)
      this.loading = false
      // 更新页码、数据总量
      this.total = total
    },
    // 页码发生改变
    handleCurChange (val) {
      this.pageNum = val
      this.handleDatas()
    },
    // 每页数量发生改变
    handleSizeChange (val) {
      this.pageSize = val
      this.handleDatas()
    }
  },
  render: function (h) {
    // 表格
    const table = tableRender.call(this, h)
    // 分页
    const pagination = paginationRender.call(this, h)
    // 表格样式设置
    const settings = settingsRender.call(this, h)
    // 底部
    const footer = h(
      'div', { class: styles.footer }, [settings, pagination]
    )
    // 整体dom
    return h('div', [table, footer])
  }
})
