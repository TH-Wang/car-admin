<template>
  <div class="container">
    <div class="header">拼车之家管理系统</div>
    <a-spin size="large" tip="加载中..." />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['auth'])
  },
  mounted () {
    setTimeout(() => {
      if (this.auth.userId) {
        this.$router.push('/admin')
      } else {
        this.$message.info('请重新登录')
        this.$router.push('/user')
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: 100vh;
  padding-bottom: 10vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-image: url('~@/assets/images/user-layout-background.png');
  background-position: center;
  background-size: cover;

  .header{
    font-size: 36px;
    font-weight: bold;
    color: #333333;
  }
}
</style>
