e<template>
  <div>
    <!-- 顶部 -->
    <a-space size="large" style="margin-bottom: 10px">
      <el-button type="primary" @click="handleAdd">添加包车</el-button>
    </a-space>
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
          <div><span class="label">载重：</span>{{row.load}}</div>
          <div><span class="label">长宽高：</span>{{row.widthHeight}}</div>
          <div><span class="label">容积：</span>{{row.volume}}</div>
          <div>
            <span class="label">服务时间：</span>
            <strong>{{week[row.startWeek] + ' 至 ' + week[row.endWeek]}}</strong>
          </div>
          <div><span class="label">详细说明：</span>{{row.title}}</div>
          <div><span class="label">详情图片：</span><img :src="row.detailsImg" /></div>
        </div>
      </template>
      <!-- 封面 -->
      <template #cover="{row}">
        <el-image :src="row.img" style="width:100px" />
      </template>
      <!-- 操作按钮 -->
      <template #handle="{row}">
        <a-space>
          <el-button type="primary" size="mini" @click="handleUpdate(row.id)">修改</el-button>
          <popconfirm-button
            :button="{size: 'mini', type: 'danger'}"
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
      :mode="dialogMode"
      :loading="loading"
      @close="visible = false"
      @submit="handleConfirm"
    />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
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
    week: {
      0: '周日',
      1: '周一',
      2: '周二',
      3: '周三',
      4: '周四',
      5: '周五',
      6: '周六'
    }
  }),
  methods: {
    // 请求列表
    async handleRequest (num, size) {
      const res = await this.$api.getBusList({ pageNo: num, pageSize: size })
      const { list, total } = res.data.data
      return { data: list, total }
    },
    // 添加
    handleAdd () {
      this.dialogMode = 'add'
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    // 修改
    handleUpdate (id) {
      this.dialogMode = 'update'
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.setFields(cloneDeep(this.list.find(i => i.id === id)))
      })
    },
    // 点击确认按钮
    async handleConfirm (data) {
      this.loading = true
      try {
        if (this.dialogMode === 'add') {
          await this.$api.createBus(data)
        } else {
          await this.$api.updateBus(data)
        }
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      } catch (error) {
        console.log(error)
        this.$message.error('操作失败，请稍后再试')
      } finally {
        this.loading = false
        this.visible = false
      }
    },
    // 删除
    async handleDelete (id) {
      try {
        await this.$api.deleteBus(id)
        this.$message.success('删除成功')
        this.$refs.table.refresh()
      } catch (error) {
        this.$message.error('删除失败，请稍后再试')
      }
    }
  }
}
</script>
