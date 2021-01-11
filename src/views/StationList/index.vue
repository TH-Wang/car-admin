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
    <!-- 站长级别 -->
    <template #level="{row}">
      <a-tag v-if="row.type === 1" color="red">站长</a-tag>
      <a-tag v-else color="orange">副站长</a-tag>
    </template>
    <!-- 审核状态 -->
    <template #handle="{row}">
      <span v-if="row.state === 2" style="color:#409EFF">已审核通过</span>
      <span v-else-if="row.state === 3" style="color:#999">未通过</span>
      <el-button-group v-else>
        <el-button size="mini" type="primary" @click="handleCheck(row.id, 2)">通过</el-button>
        <el-button size="mini" type="danger" @click="handleCheck(row.id, 3)">未通过</el-button>
      </el-button-group>
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
        const res = await this.$api.auditCheck({ id, type: 1, state })
        if (res.data.status === 1) {
          this.$message.success('操作成功')
          this.$refs.table.refresh()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (error) {
        this.$message.error('操作失败，请稍后再试')
      }
    }
  }
}
</script>
