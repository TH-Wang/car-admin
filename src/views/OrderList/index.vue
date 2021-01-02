<template>
  <div>
    <data-display
      :columns="columns"
      v-model="list"
      :query-func="handleRequest">
      <!-- 日期 -->
      <template #createAt="{ row }">{{formatDate(row.createAt)}}</template>
      <!-- 身份标签 -->
      <template #identity="{ row }">
        <a-tag :style="{marginRight: 0}" :color="identity[row.identity].color">
          {{identity[row.identity].text}}
        </a-tag>
      </template>
      <!-- 操作按钮 -->
      <template #handle="{ row }">
        <el-button type="primary" size="mini" @click="handleUpdate(row.id)">编辑</el-button>
        <el-button type="danger" size="mini" @click="handleDelete(row.id)">删除</el-button>
      </template>
    </data-display>
  </div>
</template>

<script>
import DataDisplay from '@/components/DataDisplay'
import tableConfig from './tableConfig'
import moment from 'moment'

export default {
  components: {
    DataDisplay
  },
  data: () => ({
    columns: tableConfig,
    list: [],
    identity: {
      1: { text: '乘客', color: 'yellow' },
      2: { text: '车主', color: 'blue' },
      3: { text: '群主', color: 'purple' },
      4: { text: '站长', color: 'red' }
    }
  }),
  methods: {
    // 数据请求函数
    async handleRequest (num, size) {
      const res = await this.$api.getUserList({ pageNum: num, pageSize: size })
      const { list, total } = res.data.data
      return { data: list, total }
    },
    handleUpdate (id) {
      this.$message.info(`id为${id}的用户将被编辑`)
    },
    handleDelete (id) {
      this.$message.error(`id为${id}的用户被删除`)
    },
    // 格式化日期
    formatDate (date) {
      return moment(date).format('YYYY年MM月DD日')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
