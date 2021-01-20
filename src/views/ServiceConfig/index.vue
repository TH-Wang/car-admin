<template>
  <el-form style="width:500px;margin-top:20px" label-width="100px">
    <el-form-item label="工作时间">
      <el-input v-if="editable" v-model="form.working" placeholder="例：9:00 ~ 18:00" />
      <span v-else>{{form.working || '无'}}</span>
    </el-form-item>
    <el-form-item label="微信二维码">
      <el-upload
        :action="uploadUrl"
        name="file"
        :show-file-list="false"
        :on-success="handleFileSuccess"
        v-if="editable">
        <el-button size="medium">上传图片</el-button>
      </el-upload>
      <el-image class="upload-image" :src="imgurl" alt="">
        <template #error>未上传</template>
      </el-image>
    </el-form-item>
    <el-form-item label="客服电话" prop="phone">
      <el-input v-if="editable" type="phone" v-model="form.phone" placeholder="请输入客服电话" />
      <span v-else>{{form.phone || '无'}}</span>
    </el-form-item>
    <el-form-item>
      <el-button v-if="!editable" type="primary" @click="editable = true">编辑</el-button>
      <template v-else>
        <el-button
          type="primary"
          @click="handleSubmit"
        >确认</el-button>
        <el-button @click="editable = false">取消</el-button>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import { file } from '@/config/base-url'

export default {
  data: () => ({
    mode: 'update',
    editable: false,
    form: {},
    phoneRules: [
      { type: 'number', message: '电话号码格式不正确', trigger: 'blur' },
      { min: 11, max: 11, message: '电话号码为11位', trigger: 'blur' }
    ],
    uploadUrl: file,
    imgurl: ''
  }),
  methods: {
    // 请求数据
    async handleReq () {
      const res = await this.$api.getServiceInfo()
      const data = res.data.data
      if (data.length > 0) {
        this.form = data[0]
        this.imgurl = this.form.url
        this.mode = 'update'
      } else this.mode = 'insert'
    },
    // 上传图片发送改变
    handleFileSuccess (res) {
      console.log(res)
      this.form.url = res.data
      this.imgurl = res.data
    },
    // 点击提交
    handleSubmit () {
      console.log(this.mode)
      this.mode === 'update' ? this.handleUpdate() : this.handleInsert()
    },
    // 修改信息
    async handleUpdate () {
      const data = this.form
      const res = await this.$api.updateServiceInfo({ ...data, state: 1 })
      if (res.data.msg === '修改成功') {
        this.$message.success('操作成功')
        this.editable = false
        this.mode = 'update'
      } else this.$message.error('操作失败，请稍后再试')
    },
    // 增加信息
    async handleInsert () {
      const data = this.form
      const res = await this.$api.insertServiceInfo({ ...data, state: 1 })
      if (res.data.msg === '添加成功') {
        this.$message.success('操作成功')
        this.editable = false
        this.mode = 'update'
      } else this.$message.error('操作失败，请稍后再试')
    }
  },
  created () {
    this.handleReq()
  }
}
</script>

<style lang="scss" scoped>
.upload-image{
  width: 150px;
  height: 150px;
  margin-top: 15px;
  background-color: #F5F7FA;
  line-height: 150px;
  text-align: center;
}
</style>
