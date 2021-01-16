<template>
  <el-dialog
    title="赠送积分"
    width="400px"
    :visible.sync="visible"
    @close="$emit('close')"
    @closed="value = ''">
    <el-input
      v-model="value"
      type="number"
      placeholder="请输入要赠送的积分"
    />
    <!-- 底部按钮 -->
    <template #footer>
      <a-space>
        <el-button @click="$emit('close')">取消</el-button>
        <el-button
          type="primary"
          @click="$emit('confirm', value)">确认</el-button>
      </a-space>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    value: ''
  })
}
</script>
