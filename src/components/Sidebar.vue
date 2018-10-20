<template>
  <div id="sidebar">
    <logo></logo>
    <navmenu v-bind:namespace='namespace'></navmenu>
  </div>
</template>
<script>
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
export default {
  props: ['namespace'],
  components: {
    logo: Logo,
    navmenu: NavMenu
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
#sidebar{
  background-color:#1f2126;
  height:100%;
  border:1px solid transparent;
  margin-bottom:20px;
}
</style>
