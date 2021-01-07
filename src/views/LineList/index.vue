<template>
  <table-display
    :columns="columns"
    v-model="list"
    :query-func="handleRequest"
  >
    <template #type="{ row }">
      <a-tag v-if="row.publishType === 1">短途拼车</a-tag>
      <a-tag v-else :color="publishConfig[row.publishType][1]">
        {{publishConfig[row.publishType][0]}}
      </a-tag>
    </template>
    <template #handle>
      <el-button type="text">编辑</el-button>
    </template>
  </table-display>
</template>

<script>
import TableDisplay from '@/components/TableDisplay'
import tableConfig from './tableConfig'

export default {
  components: {
    TableDisplay
  },
  data: () => ({
    columns: tableConfig,
    list: [],
    publishConfig: {
      1: ['短途拼车', 'yellow'],
      2: ['城际拼车', 'orange'],
      3: ['跨省拼车', 'red'],
      4: ['上下班拼车', 'green'],
      5: ['顺路带物', 'blue']
    }
  }),
  methods: {
    // 数据请求函数
    async handleRequest (num, size) {
      const res = await this.$api.getLineList({ pageNo: num, pageSize: size })
      const { list, total } = res.data.data
      return { data: list, total }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
