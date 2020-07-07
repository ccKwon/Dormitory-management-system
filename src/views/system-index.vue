<template>
  <div>
    <!-- 头部 -->
    <el-row class="header" type="flex">
      <!-- 左侧用户卡片 -->
      <el-col class="left">
        <el-card class="user-card">
          <section>
            <div>
              <!-- <img :src="userInfo.avatar" alt="avatar" class="user_avatar" /> -->
              <div >
                {{userInfo.account}}
              </div>
            </div>

            <div>
              <section>
                <p class="info-para">当前学生总数：{{countlist.countStud}} 人</p>
                <p class="info-para">当前宿舍总数：{{countlist.countDno}} 间</p>
              </section>
              <!-- <section v-if="userInfo.identity === 2">
                <p class="info-para">我的宿舍：{{userInfo.dorm_num || '您还未被分配宿舍'}}</p>
              </section>
              <section v-if="userInfo.identity === 3">
                <p class="info-para">已接手的报修单：{{userInfo.ongoing_task}}</p>
              </section> -->

            </div>
          </section>
        </el-card>
      </el-col>

      <el-col class="right">
        <!-- 右侧状态 -->
        <el-row class="cart-container">
          <el-col :key="index" class="status-item" v-for="(item,index) in status_list">
            <el-card :body-style="{ padding: '0px'}">
              <div class="status-card">
                <div :style="{'background-color':item.color}" class="status-icon">
                  <i :class="[item.icon]"></i>
                </div>
                <div class="content">
                  <div>
                    <p class="prop">{{item.prop}}</p>
                    <p class="title">{{item.title}}</p>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>


    </el-row>
    <!-- 头部结束 -->

    <!-- 图表 -->
    <!-- <el-row class="flex-wrap margin-top-60" type="flex">
      <el-col :lg="9" :offset="1" :sm="10" :xs="22" class="margin-bottom-20">
        <div class="home-charts" id="equ-chart" ref="equChart"></div>
      </el-col>

      <el-col :lg="9" :offset="1" :sm="10" :xs="22" class="margin-bottom-20">
        <div class="home-charts" id="visit-chart" ref="visitChart"></div>
      </el-col>
    </el-row> -->
    <!-- 图表结束 -->
  </div>
</template>

<script>

  import {
    mapState
  } from "vuex";

  export default {
    name: "system-index",
    data() {
      return {
        status_list: {
          peopleandSum: {
            color: "#409EFF",
            icon: "el-icon-s-custom",
            title: "在住人数 / 总容纳人数",
            prop: 'resideCount'
          },
          leaveSchool: {
            color: "#F56C6C",
            icon: "el-icon-s-flag",
            title: "离校登记人数",
            prop: 'leaveSchoolCount'
          },
          repair: {
            color: "#67C23A",
            icon: "el-icon-s-help",
            title: "待处理的设备报修单",
            prop: 'repairCount'
          },
          emptybed: {
            color: "#E6A23C",
            icon: "el-icon-s-grid",
            title: "空床位",
            prop: 'emptyCount'
          }
        },
        homeInfo: {
          last7Days: [],
          last7DaysRepair: [],
          resideStatus: []
        },


        countlist: [],
        repairListcount: 0,
      }
    },


    computed: {
      ...mapState(['userInfo'])
    },


    created() {
      this.getsumList(),
      this.getCountList(),
      this.getrepairlistcount()
    },

    methods: {
      getsumList() {
        this.$axios.get('http://localhost:3000/dorm/api/getsum').then(res => {
          this.status_list.peopleandSum.prop = res.data.people + '/' + res.data.sum;
          this.status_list.emptybed.prop = res.data.sum - res.data.people;
        })
      },
      getCountList() {
        this.$axios.get('http://localhost:3000/dorm/api/getCountDnoandStud').then(res => {
          this.countlist = res.data;
        })
      },
      getrepairlistcount() {
        this.$axios.get('http://localhost:3000/repairList/api/getList').then(res => {
          this.status_list.repair.prop = res.data
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    color: #333;

    .left {
      flex: 2;
      margin-top: 30px;
      padding: 20px;
      .user-card {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        // justify-content: center;
        padding: 0 !important;
        .info-para {
          font-size: 12px;
          color: gray;
        }
      }
    }

    .right {
      box-sizing: border-box;
      flex: 5;
      display: flex;
      padding: 20px;

      // width: 100%;
      .cart-container {
        // flex: 3;

        .status-item {
          width: 50%;
          padding-top: 30px;
          padding-right: 30px;
          // padding-bottom: 30px;
          .status-card {
            height: 100px;
            display: flex;
            // justify-content: center;
            align-items: center;

            .status-icon {
              // width: 40%;
              flex: 1;
              height: 100%;
              // height: 200px;
              color: #fff;
              font-size: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .content {
              flex: 2;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 10px;
              .prop {
                font-size: 22px;
                font-weight: bold;
              }

              .title {
                font-size: 14px;
                color: gray;
              }
            }
          }
        }


      }
    }
  }
</style>