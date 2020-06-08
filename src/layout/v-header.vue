<template>
  <header class="v-header">
    <div class="head-left">
      <i class="logo__icon icon-building--fill iconfont"></i>
      <span class="logo__title">学生宿舍管理系统</span>
    </div>

    <div class="head-right">
      <el-dropdown @command="loginout" :show-timeout="50" class="user-name">
        <span class="user-name-text">欢迎您，{{userInfo.account}}
          <i class="el-icon-arrow-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item  icon="el-icon-switch-button">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
  import {
    mapState
  } from "vuex";

  export default {
    name: "v-header",
    data() {
      return {

      }
    },
    components: {

    },
    computed: {
      ...mapState(['userInfo'])
    },
    created() {
      // console.log(this.userInfo);
      // console.log(this.userInfo);
    },
    methods: {
      loginout() {
        localStorage.clear();
        this.$router.push('/login');

      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-header {
    width: 100%;
    height: 60px;
    background-color: #354358;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }

  .head-left {
    margin-left: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  .logo__icon {
    color: #fff;
    font-size: 27px;
  }

  .logo__title {
    font-size: 18px;
    color: #fff;
    margin-left: 10px;
    margin-top: 4px;
  }

  .head-right {
    display: flex;
    align-items: center;
    margin-right: 40px;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    display: block;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-name {
    margin: 0 12px;
  }

  .user-name-text {
    font-size: 13px;
    color: #fff;
    cursor: pointer;

    /*&:after {*/
    /*  content: '';*/
    /*  width: 0;*/
    /*  height: 0;*/
    /*  display: inline-block;*/
    /*  border-width: 5px;*/
    /*  border-style: solid;*/
    /*  border-color: #fff transparent transparent transparent;*/
    /*  margin-left: 4px;*/
    /*  transform: translateY(25%);*/
    /*}*/
  }
</style>