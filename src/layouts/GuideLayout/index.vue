<template>
  <div class="container">
    <div class="header">拼车之家管理系统</div>
    <a-spin size="large" tip="加载中..." />
  </div>
</template>

<script>
export default {
  mounted () {
    setTimeout(() => {
      this.$router.replace('/admin')
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  .header{
    font-size: 36px;
    font-weight: bold;
    color: #333333;
  }
}
</style>
