<template>
  <div>
    <!-- 表格主体 -->
    <table-display
      ref="table"
      :columns="columns"
      v-model="list"
      :query-func="handleRequest"
      @size-change="(val) => {tableSize = val}">
      <!-- 头像 -->
      <template #avatar="{ row }">
        <div
          class="avatar-container"
          :style="{ width: `${avatarSize}px`, height: `${avatarSize}px` }"
          @click="handlePreviewAvatar(row)">
          <el-avatar
            style="cursor:pointer"
            fit="cover"
            shape="square"
            :size="avatarSize"
            :src="row.headimg"/>
        </div>
      </template>
      <!-- 身份标签 -->
      <template #auth="{ row }">
        <!-- <a-space> -->
          <a-tag color="green" v-if="row.idnumstatus === 'YES'">身份证</a-tag>
          <a-tag color="blue" v-if="row.driverlicensestatus === 'YES'">驾驶证</a-tag>
          <a-tag color="orange" v-if="row.carstatus === 'YES'">车辆认证</a-tag>
          <span v-if="unAuth(row)">无</span>
        <!-- </a-space> -->
      </template>
      <!-- 操作按钮 -->
      <template #handle="{ row }">
        <a-space size="middle">
          <el-button
            type="text"
            :size="tableSize"
            @click="handleUpdate(row.id)"
          >修改</el-button>
          <dropdown-button
            :menus="handleMenus"
            @add-integer="handleOpenDialog('addInteger', row.id)"
          >更多</dropdown-button>
        </a-space>
      </template>
    </table-display>
    <!-- 修改表单弹窗 -->
    <dialog-form
      ref="form"
      mode="update"
      :visible="visible.update"
      :loading="loading"
      @close="visible.update = false"
      @submit="handleConfirm"
    />
    <!-- 添加积分弹窗 -->
    <add-integer
      :visible="visible.addInteger"
      @close="visible.addInteger = false"
      @confirm="handleAddInteger"
    />
    <!-- 预览头像 -->
    <a-modal
      v-model="previewAvatar.visible"
      :title="previewAvatar.username"
      :bodyStyle="{display: 'flex', justifyContent: 'center'}"
      centered :footer="null">
      <el-image
        style="width:400px;min-height:400px"
        fit="contain"
        :src="previewAvatar.url"/>
    </a-modal>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import tableConfig from './tableConfig'
import DialogForm from './DialogForm'
import AddInteger from './AddInteger'

export default {
  components: { DialogForm, AddInteger },
  data: () => ({
    loading: false,
    tableSize: 'medium',
    columns: tableConfig,
    list: [],
    previewAvatar: {
      visible: false,
      username: '',
      url: null
    },
    handleMenus: [
      { command: 'add-integer', text: '赠送积分' }
    ],
    visible: {
      update: false,
      addInteger: false
    },
    handleUserId: null
  }),
  computed: {
    avatarSize () {
      const sizeConfig = { medium: 50, small: 40, mini: 30 }
      return sizeConfig[this.tableSize]
    }
  },
  methods: {
    // 数据请求函数
    async handleRequest (num, size) {
      const res = await this.$api.getUserList({ pageNo: num, pageSize: size })
      const { list, total } = res.data.data
      return { data: list, total }
    },
    // 打开修改表单
    handleUpdate (id) {
      this.visible.update = true
      this.$nextTick(() => {
        this.$refs.form.setFields(cloneDeep(this.list.find(i => i.id === id)))
      })
    },
    // 提交用户修改
    async handleConfirm (data) {
      this.loading = true
      try {
        await this.$api.updateUser(this.handleData(data))
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      } catch (error) {
        console.log(error)
        this.$message.error('操作失败，请稍后再试')
      } finally {
        this.loading = false
        this.visible.update = false
      }
    },
    // 处理提交数据
    handleData (data) {
      const result = cloneDeep(data)
      for (const key in result) {
        if (!result[key]) delete result[key]
        if (key === 'totalPrice') result[key] = parseInt(result[key])
        if (key === 'faithfulValue') result[key] = parseInt(result[key])
      }
      return result
    },
    // 打开弹窗
    handleOpenDialog (type, userId) {
      this.visible[type] = true
      this.handleUserId = userId
    },
    // 提交赠送积分
    async handleAddInteger (value) {
      const userId = this.handleUserId
      const res = await this.$api.presentIntegral({ userId, integral: value })
      console.log(res.data)
    },
    // 判断是否没有任何认证信息
    unAuth (row) {
      const { idnumstatus, driverlicensestatus, carstatus } = row
      return idnumstatus === 'NO' &&
             driverlicensestatus === 'NO' &&
             carstatus === 'NO'
    },
    // 预览头像
    handlePreviewAvatar (row) {
      const { username, headimg } = row
      this.previewAvatar = { visible: true, username, url: headimg }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container{
  display: inline-block;
}
</style>
