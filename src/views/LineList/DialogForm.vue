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
        <el-input v-model="form.startAddrAll" placeholder="请输入出发地点" />
      </el-form-item>

      <el-form-item label="目的地">
        <el-input v-model="form.endAddrAll" placeholder="请输入目的地" />
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
    form: {}
  }),
  methods: {
    reset () {
      this.form = {}
    },
    setFields (data) {
      this.form = data
    },
    handleConfirm () {
      this.$emit('submit', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
