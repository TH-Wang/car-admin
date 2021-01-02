<template>
  <el-container>
    <el-aside class="aside" :style="{width: asideWidth}">
      <div class="menu" :style="{width: asideWidth}">
        <div class="logo">
          <a-icon type="car" theme="filled"/>
          <span v-show="!collapsed">拼车之家</span>
        </div>
        <aside-menu :collapsed="collapsed" />
      </div>
    </el-aside>
    <el-container>
      <el-header class="header">
        <a-icon
          :type="collapsedIcon"
          :style="{fontSize: '18px'}"
          @click="collapsed = !collapsed"
        />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from './AsideMenu'

export default {
  components: { AsideMenu },
  data: () => ({
    collapsed: false
  }),
  computed: {
    // 侧边栏宽度
    asideWidth () {
      return this.collapsed ? '80px' : '200px'
    },
    // 收起展开侧边栏按钮类型
    collapsedIcon () {
      return this.collapsed ? 'menu-unfold' : 'menu-fold'
    }
  }
}
</script>

<style lang="scss" scoped>
$header-height: 50px;

.header{
  height: $header-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba($color: #000000, $alpha: .05);
}
.aside{
  transition: width .3s;
  box-shadow:  0 0 10px 0 rgba($color: #000000, $alpha: .1);

  .menu{
    transition: width .3s;
    height: 100vh;
    background-color: #001529;
    position: fixed;
    top: 0;
    left: 0;
  }

  .logo{
    height: $header-height;
    font-size: 24px;
    color: #FFFFFF;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;

    span{
      margin-left: 10px;
      transition: all .3s;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }
}
</style>
