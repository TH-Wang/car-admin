<template>
  <el-dialog
    :title="mode === 'add' ? '添加' : '修改'"
    :visible="visible"
    @close="$emit('close')"
    width="600px">
    <el-form
      ref="form"
      label-position="right"
      label-width="100px"
      class="dialog-form">

      <el-form-item label="出发地点">
        <search-address v-model="form.startAddr" placeholder="请输入出发地点" />
      </el-form-item>

      <el-form-item label="到达地点">
        <search-address v-model="form.endAddr" placeholder="请输入到达地点" />
      </el-form-item>

      <el-form-item label="途径点">
        <dynamic-field v-model="form.passPointList" />
      </el-form-item>

      <el-form-item label="A费">
        <el-input type="number" v-model="form.cost" placeholder="请输入A费">
          <template #prepend>￥</template>
        </el-input>
      </el-form-item>

      <el-form-item label="余座">
        <el-input type="number" v-model="form.num" placeholder="请输入余座" />
      </el-form-item>
    </el-form>

    <!-- 弹窗底部 -->
    <template #footer>
      <a-space>
        <el-button @click="$emit('close')">取消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="handleConfirm">{{loading ? '提交中' : '确认'}}</el-button>
      </a-space>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    form: {},
    img: '',
    detailsImg: '',
    typeList: []
  }),
  methods: {
    // 请求类别
    async handleReqType () {
      const res = await this.$api.getBusTypeList()
      this.typeList = res.data.data.map(item => ({ value: item.id, label: item.typeName }))
    },
    reset () {
      this.form = {}
    },
    setFields (data) {
      this.form = data
    },
    handleConfirm () {
      this.$emit('submit', this.form)
    }
  },
  created () {
    this.handleReqType()
  }
}
</script>

<style lang="scss" scoped>
.upload-img{
  width: 100px;
  margin-top: 10px;
}
.upload-detail-img{
  width: 200px;
  margin-top: 10px;
}
</style>
