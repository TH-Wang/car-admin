<template>
  <div>
    <!-- 顶部 -->
    <a-space size="large" style="margin-bottom: 10px">
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </a-space>
    <table-display
      ref="table"
      :columns="columns"
      v-model="list"
      :query-func="handleRequest"
    >
      <!-- 详情 -->
      <template #expand="{row}">
        <div class="table-expand">
          <div><span class="label">目的地：</span>{{row.destination}}</div>
          <div>
            <span class="label">往返时间：</span>
            {{getTime(row.startTime) + ' - ' + getTime(row.endTime)}}
          </div>
          <div><span class="label">详细说明：</span>{{row.details}}</div>
          <div><span class="label">详情图片：</span><img :src="row.detailsImg" /></div>
        </div>
      </template>
      <!-- 封面 -->
      <template #cover="{row}">
        <el-image :src="row.img" style="width:100px" />
      </template>
      <!-- 类别 -->
      <template #type="{row}">
        <span>{{typeDict[row.tourNameId]}}</span>
      </template>
      <!-- 往返时间 -->
      <!-- <template #time="{row}">
        {{getTime(row.startTime) + ' - ' + getTime(row.endTime)}}
      </template> -->
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
      :type-list="typeList"
      @close="visible = false"
      @submit="handleConfirm"
    />
  </div>
</template>

<script>
import moment from 'moment'
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
    form: {},
    columns: tableConfig,
    list: [],
    typeList: [],
    typeDict: {}
  }),
  methods: {
    // 请求类别
    async handleReqType () {
      const res = await this.$api.getTourTypeList()
      this.typeList = res.data.data.map(item => ({ value: item.id, label: item.name }))
      const dict = {}
      this.typeList.forEach(item => {
        dict[item.value] = item.label
      })
      this.typeDict = dict
      console.log(dict)
    },
    // 请求列表
    async handleRequest (num, size) {
      const res = await this.$api.getTourList({ pageNo: num, pageSize: size })
      const { list, total } = res.data.data
      return { data: list, total }
    },
    // 格式化时间
    getTime (time) {
      return moment(time).format('MM月DD日')
    },
    // 点击确认按钮
    async handleConfirm (data) {
      this.loading = true
      try {
        if (this.dialogMode === 'add') {
          await this.$api.createTour(this.handleDate(data))
        } else {
          await this.$api.updateTour(this.handleDate(data))
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
    handleDate (data) {
      const { startTime, endTime } = data
      data.startTime = moment(startTime).format('MMDD')
      data.endTime = moment(endTime).format('MMDD')
      return data
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
        const data = cloneDeep(this.list.find(i => i.id === id))
        data.startTime = new Date(data.startTime)
        data.endTime = new Date(data.endTime)
        this.$refs.form.setFields(data)
      })
    },
    // 删除
    async handleDelete (id) {
      try {
        await this.$api.deleteTour(id)
        this.$message.success('删除成功')
        this.$refs.table.refresh()
      } catch (error) {
        this.$message.error('删除失败，请稍后再试')
      }
    }
  },
  created () {
    this.handleReqType()
  }
}
</script>
