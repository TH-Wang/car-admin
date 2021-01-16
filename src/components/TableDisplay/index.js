import styles from './index.module.css'
import tableRender from './table'
import settingsRender from './settings'
import paginationRender from './pagination'

const root = {
  name: 'table-display',
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
    queryFunc: { type: Function, default: () => ({ data: [], total: 0 }) },
    // 是否展示底部
    footer: { type: Boolean, default: true },
    // 默认每页数据量
    pageSize: { type: Number, default: 10 }
  },
  data: () => ({
    pageNum: 1,
    pageCount: 10,
    total: 0,
    loading: false,
    size: 'medium',
    stripe: false,
    border: false,
    tableSize: [['mini', '小'], ['small', '中等'], ['medium', '大']]
  }),
  mounted () {
    this.handleDatas()
  },
  methods: {
    // 处理请求
    async handleDatas () {
      try {
        this.loading = true
        const { pageNum, pageCount } = this
        const { data, total } = await this.queryFunc(pageNum, pageCount)
        this.$emit('update', data)
        this.loading = false
        // 更新页码、数据总量
        this.total = total
      } catch (err) {
        console.log(err)
        this.$message.error('请求失败，请稍后再试')
      } finally {
        this.loading = false
      }
    },
    // 页码发生改变
    handleCurChange (val) {
      this.pageNum = val
      this.handleDatas()
    },
    // 每页数量发生改变
    handleSizeChange (val) {
      this.pageCount = val
      this.handleDatas()
    },
    // 刷新
    refresh () {
      this.pageNum = 1
      this.loading = true
      setTimeout(() => {
        this.handleDatas()
      }, 300)
    },
    // 更新数据，不改变页码
    update () {
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
    const footer = this.footer
      ? h('div', { class: styles.footer }, [settings, pagination])
      : ''
    // 整体dom
    return h('div', [table, footer])
  }
}

export default {
  install: function (Vue) {
    Vue.component('table-display', root)
  }
}
