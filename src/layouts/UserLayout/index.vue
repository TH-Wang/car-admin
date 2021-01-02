<template>
  <div class="container">
    <!-- 登录框 -->
    <div class="main">
      <div class="header">拼车之家管理系统</div>
      <!-- 表单主体 -->
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item prop="username" class="form-item">
          <el-input
            v-model="form.username"
            prefix-icon="el-icon-user"
            placeholder="用户名"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            clearable
            prefix-icon="el-icon-lock"
            placeholder="密码"
          />
        </el-form-item>
        <el-button
          style="width: 100%"
          type="primary"
          :loading="logining"
          @click="handleSubmit"
        >{{logining ? '登录中' : '登录'}}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    logining: false,
    form: {},
    rules: {
      username: [{ required: true, message: '请输入用户名' }],
      password: [{ required: true, message: '请输入密码' }]
    }
  }),
  methods: {
    // 提交登录
    async handleSubmit () {
      try {
        await this.$refs.form.validate()
        this.logining = true
        const res = this.$api.login()
        setTimeout(() => {
          this.$message.success(res.msg)
          this.logining = false
        }, 2000)
      } catch (error) {
        if (error) console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('~@/assets/images/user-layout-background.png');
  background-position: center;
  background-size: cover;
}

.main{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 400px;
  padding: 30px 30px;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 8px 30px 2px rgba($color: #000000, $alpha: .1);

  .header{
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 40px;
  }
}
.form-item{
  margin-bottom: 28px;
}
</style>
