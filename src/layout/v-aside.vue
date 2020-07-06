<template>

  <div class="v-aside">
    <!-- 一级菜单 -->
    <el-menu :default-active="this.index" :router="true" active-text-color="#20a0ff" background-color="#354358"
      class="menu-bar" text-color="#bfcbd9">
      <template v-for="menu in menuList">
        <!-- 一级选项 -->
        <el-menu-item :index="menu.index" :key="menu.index" v-if="menu.show">
          <i :class="menu.icon"></i>
          <template v-slot:title>
            <span>{{menu.title}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";

  export default {
    name: "v-aside",
    data() {
      return {
        identity: 0,
        collapse: false,
        index:''
      };
    },

    computed: {
      ...mapState(['userInfo']),
      // Router() {
      //   return this.$route.path.split('/')[2];
      // },
      menuList() {
        const identity = this.userInfo.identity;
        // alert(this.userInfo.identity);
        // alert(typeof identity);
        return [{
            title: "系统首页",
            index: "system-index",
            icon: "el-icon-house",
            // index:identity,
            show: true
          },
          {
            title: "学生管理",
            index: "student-manage",
            icon: "el-icon-user",
            show: identity === 1
          },
          {
            title: "宿舍管理",
            index: "dorm-manage",
            icon: "el-icon-notebook-2",
            show: identity === 1
          },
          {
            title: "楼栋管理",
            index: "building-manage",
            icon: "el-icon-office-building",
            show: identity === 1
          },
          {
            title: "分配宿舍",
            index: "comein-manage",
            icon: "el-icon-finished",
            show: identity === 1
          },
          {
            title: "设备报修单",
            index: "equ-resolve",
            icon: "el-icon-set-up",
            show: identity === 1 || identity === 3
          },
          {
            title: "维修员管理",
            index: "repairmen-manage",
            icon: "el-icon-attract",
            show: identity === 1
          },
          {
            title: "填写设备报修单",
            index: "equ-submit",
            icon: "el-icon-document-add",
            show: identity === 2
          },
        ]
      },

    },
    mounted() {
      console.log(typeof this.$route.path);
      this.index = this.$route.path.slice(6)
    }
  };
</script>

<style lang="scss" scoped>
  .v-aside {
    height: 100%;
    overflow-y: auto;
  }

  .menu-bar {
    height: 100%;
    border: none;
  }
</style>