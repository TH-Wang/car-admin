<template>
  <div>
    <!-- 筛选 -->
    <state-filter @change="handleFilterChange" />
    <!-- 表格 -->
    <table-display
      ref="table"
      :columns="columns"
      v-model="list"
      :query-func="handleRequest"
    >
      <!-- 详情 -->
      <template #expand="{row}">
        <div class="table-expand">
          <div><span class="label">载重：</span>{{row.carLoad | text('kg')}}</div>
          <div><span class="label">长宽高：</span>{{row.carBod | text('m')}}</div>
          <div><span class="label">载重体积：</span>{{row.carLoadBulk | text('m³')}}</div>
          <div>
            <span class="label">车辆行驶证：</span>
            <img :src="row.carTravelPhoto" v-if="row.carTravelPhoto" />
            <img :src="row.carTravelPhotoBack" v-if="row.carTravelPhotoBack" />
            <!-- <span v-else>未上传</span> -->
          </div>
          <div>
            <span class="label">车正面照：</span>
            <img :src="row.carPhoto" v-if="row.carPhoto" />
            <!-- <span v-else>未上传</span> -->
          </div>
        </div>
      </template>
      <!-- 审核状态 -->
      <template #check="{row}">
        <span v-if="row.state === 1" style="color:#409EFF">已审核通过</span>
        <span v-else-if="row.state === 2" style="color:#999">未通过</span>
        <el-button-group v-else>
          <el-button size="mini" type="primary" @click="handleCheck(row.id, 1)">通过</el-button>
          <el-button size="mini" type="danger" @click="handleCheck(row.id, 2)">未通过</el-button>
        </el-button-group>
      </template>
    </table-display>
  </div>
</template>

<script>
import tableConfig from './tableConfig'

export default {
  data: () => ({
    list: [],
    columns: tableConfig,
    state: null
  }),
  filters: {
    text: (value, suffix) => value ? `${value} ${suffix}` : '无'
  },
  methods: {
    // 查询数据
    async handleRequest (num, size) {
      const state = this.state
      const res = await this.$api.queryUserCarVerification({
        startPage: num,
        pageSize: size,
        state
      })
      const { list, total } = res.data.data
      return { data: list, total }
    },
    // 审核
    async handleCheck (id, state) {
      try {
        await this.$api.checkUserCarVerification({ id, state })
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
