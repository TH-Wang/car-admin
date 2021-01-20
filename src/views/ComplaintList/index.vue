<template>
  <div>
    <!-- 表格 -->
    <table-display
      ref="table"
      :columns="columns"
      v-model="list"
      :query-func="handleRequest"
    >
      <!-- 详情 -->
      <template #expand="{row}">
        <photo-details :row="row"/>
      </template>
      <!-- 申诉类型 -->
      <template #type="{row}">
        <a-tag :color="type[row.king].color">
          {{type[row.king].text}}
        </a-tag>
      </template>
    </table-display>
  </div>
</template>

<script>
import PhotoDetails from './PhotoDetails'
import tableConfig from './tableConfig'

export default {
  components: { PhotoDetails },
  data: () => ({
    list: [],
    columns: tableConfig,
    type: {
      0: { color: '#C0C0C0', text: '其他' },
      1: { color: 'orange', text: '申诉' },
      2: { color: '#F56C6C', text: '投诉' },
      3: { color: 'red', text: '系统错误' },
      4: { color: 'yellow', text: '优化建议' }
    }
  }),
  methods: {
    // 查询数据
    async handleRequest (num, size) {
      const res = await this.$api.queryComplaint({
        startPage: num,
        pageSize: size
      })
      // const { list, total } = res.data.data
      // return { data: list, total }
      const data = res.data.data
      return { data, total: data.length }
    }
  }
}
</script>
