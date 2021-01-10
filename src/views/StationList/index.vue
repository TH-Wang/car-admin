<template>
  <table-display
    ref="table"
    :columns="columns"
    v-model="list"
    :query-func="handleRequest"
  >
    <!-- 详情 -->
    <template #expand="{row}">
      <div class="table-expand">
        <div><span class="label">微信号：</span>{{row.vxNumber}}</div>
        <div><span class="label">公众号：</span>{{row.tencentIsux}}</div>
      </div>
    </template>
    <!-- 审核状态 -->
    <template #level="{row}">
      <a-tag v-if="row.type === 1" color="red">站长</a-tag>
      <a-tag v-else color="orange">副站长</a-tag>
    </template>
  </table-display>
</template>

<script>
import tableConfig from './tableConfig'

export default {
  data: () => ({
    columns: tableConfig,
    list: []
  }),
  methods: {
    // 请求列表
    async handleRequest (num, size) {
      const res = await this.$api.getStationList({ startPage: num, pageSize: size })
      const { list, total } = res.data.data
      return { data: list, total }
    },
    // 审核通过
    async handleCheck (id, state) {
      try {
        await this.$api.auditCheck({ id, type: 2, state })
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      } catch (error) {
        this.$message.error('操作失败，请稍后再试')
      }
    }
  }
}
</script>
