<template>
  <div>
    <!-- 顶部 -->
    <a-space size="large" style="margin-bottom: 10px">
      <el-button size="small" type="primary" @click="handleAdd">添加类别</el-button>
      <search-address v-model="address" />
      <span>{{address.value}}</span>
    </a-space>
    <table-display
      ref="table"
      :columns="columns"
      v-model="list"
      :footer="false"
      :page-size="100"
      :query-func="handleRequest"
      style="width:400px"
    >
      <!-- 操作按钮 -->
      <template #handle="{row}">
        <a-space>
          <popconfirm-button
            :button="{type: 'text'}"
            title="确认删除该包车信息"
            @confirm="handleDelete(row.id)"
          >删除</popconfirm-button>
        </a-space>
      </template>
    </table-display>
    <!-- 表单弹窗 -->
    <dialog-form
      ref="form"
      :visible="visible"
      :loading="loading"
      @close="visible = false"
      @submit="handleConfirm"
    />
  </div>
</template>

<script>
import tableConfig from './tableConfig'
import PopconfirmButton from '@/components/PopconfirmButton'
import DialogForm from './DialogForm'

export default {
  components: { PopconfirmButton, DialogForm },
  data: () => ({
    dialogMode: 'add',
    loading: false,
    visible: false,
    columns: tableConfig,
    list: [],
    form: {},
    address: {}
  }),
  methods: {
    // 请求列表
    async handleRequest (num, size) {
      const res = await this.$api.getBusTypeList()
      const data = res.data.data
      return { data, total: data.length }
    },
    // 添加
    handleAdd () {
      this.dialogMode = 'add'
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    // 点击确认按钮
    async handleConfirm (data) {
      this.loading = true
      try {
        await this.$api.createBusType(data)
        this.$refs.table.refresh()
      } catch (error) {
        this.$message.error('操作失败，请稍后再试')
      } finally {
        this.loading = false
        this.visible = false
      }
    },
    // 删除
    async handleDelete (id) {
      await this.$api.deleteBusType(id)
      this.$refs.table.refresh()
    }
  }
}
</script>
