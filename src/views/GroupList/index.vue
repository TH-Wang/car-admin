<template>
  <div>
    <!-- 筛选 -->
    <state-filter :config="stateConfig" @change="handleFilterChange" />
    <table-display
      ref="table"
      :columns="columns"
      v-model="list"
      :query-func="handleRequest"
    >
      <!-- 详情 -->
      <template #expand="{row}">
        <div class="table-expand">
          <div><span class="label">关键字：</span>{{row.keyword}}</div>
          <div><span class="label">群说明：</span>{{row.groupExplain}}</div>
          <div><span class="label">群介绍：</span>{{row.groupIntroduce}}</div>
          <div><span class="label">入群要求：</span>{{row.groupRequire}}</div>
        </div>
      </template>
      <!-- 封面 -->
      <template #avatar="{row}">
        <el-image :src="row.imgUrl" style="width:100px" />
      </template>
      <!-- 审核状态 -->
      <template #handle="{row}">
        <span v-if="row.status === 2" style="color:#409EFF">已审核通过</span>
        <span v-else-if="row.status === 3" style="color:#999">未通过</span>
        <el-button-group v-else>
          <el-button size="mini" type="primary" @click="handleCheck(row.id, 2)">通过</el-button>
          <el-button size="mini" type="danger" @click="handleCheck(row.id, 3)">未通过</el-button>
        </el-button-group>
      </template>
    </table-display>
  </div>
</template>

<script>
import tableConfig from './tableConfig'

export default {
  data: () => ({
    columns: tableConfig,
    list: [],
    state: null,
    stateConfig: [
      { value: 1, label: '待审核' },
      { value: 2, label: '已通过审核' },
      { value: 3, label: '未通过审核' }
    ]
  }),
  methods: {
    // 请求列表
    async handleRequest (num, size) {
      const state = this.state
      const res = await this.$api.getGroupList({
        startPage: num,
        pageSize: size,
        state
      })
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
    },
    // 筛选条件发生改变
    handleFilterChange (value) {
      this.state = value
      this.$refs.table.refresh()
    }
  }
}
</script>
