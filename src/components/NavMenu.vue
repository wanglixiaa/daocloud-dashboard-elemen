<template>
  <!-- <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-location"></i><span>导航一</span></template>
        <el-menu-item-group>
          <el-menu-item index="buildFlows">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu> -->
  <el-row class="tac">
    <el-col :span="24">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      unique-opened
      router
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
          <template slot="title">
            <span v-text="item.name"></span>
          </template>
          <el-menu-item-group v-for="sub in item.sub" :key="sub.componentName">
            <el-menu-item :index="sub.componentName" v-text="sub.name">选项1</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <!-- <h1>let there be light: {{namespace.tenantName}}</h1> -->
  </el-row>
</template>

<script>
import personalMenu from '@/config/personal-menu-config'
// import cachaMenu from '@/config/cacha-menu-config'
export default {
  data: () => ({
    menu: personalMenu
  }),
  watch: {
    namespace: function (val, oldVal) {
      this.menu = val
    }
  },
  created () {
    // console.log('ddd')
    // console.log(this.menu)
    // console.log(this.$store.state.menu)
    // this.menu = this.$store.state.menu
    console.log(this.namespace)
  },
  props: ['namespace'],
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
