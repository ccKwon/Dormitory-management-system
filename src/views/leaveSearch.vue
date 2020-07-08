<template>
    <div class="page-container">
        <el-form @submit.native.prevent="search" inline>
            <el-form-item label="提交日期范围">
                <el-date-picker end-placeholder="结束日期" range-separator="至" start-placeholder="开始日期" style="width: 300px"
                    type="daterange" v-model="searchForm.timeRange" value-format="timestamp" />
            </el-form-item>
            <el-form-item>
                <el-button native-type="submit" size="medium" type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list" border stripe>
            <el-table-column align="center" width="150" label="提交日期">
                <template #default="scope">{{scope.row.nowdate }}</template>
            </el-table-column>
            <el-table-column align="center" label="学生姓名" prop="Sname" />
            <el-table-column align="center" label="联系方式" prop="contact" />
            <el-table-column align="center" label="离校去向" prop="destination" />
            <el-table-column align="center" label="离校日期">
                <template #default="scope">{{scope.row.leave_date}}</template>
            </el-table-column>
            <el-table-column align="center" label="返校日期">
                <template #default="scope">{{scope.row.goback_date }}</template>
            </el-table-column>
            <el-table-column align="center" label="紧急联系人电话" prop="emergency_concact" />
            <el-table-column align="center" label="操作">
                <template #default="scope">
                    <el-tooltip content="删除">
                        <el-button @click="remove(scope.row)" circle icon="el-icon-delete font-size-16" plain
                            size="mini" type="danger" />
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :current-page="paging.current" :total="paging.total" @current-change="curPageChange" background
            class="margin-top-20" layout="total, prev, pager, next" style="text-align: right">
        </el-pagination>
    </div>
</template>

<script>
    //   import request from "@/api";

    export default {
        name: "school-leave-search",
        data() {
            return {
                searchForm: {
                    timeRange: []
                    // startTime: null,
                    // endTime: null
                },
                paging: {
                    current: 1,
                    total: 1,
                    pageCount: 1
                },
                totalPage: 0,
                list: [],
            }
        },
        methods: {

            getPage() {
                this.$axios.get('http://localhost:3000/page/api/pagetotal?cate=leaveList').then(res => {
                    this.paging.total = res.data
                })
            },

            search() {
                this.paging.current = 1;

                if (this.searchForm.timeRange == false || this.searchForm.timeRange == null) {
                    this.getData()
                } else {
                    this.$axios.post('http://localhost:3000/student/api/leaveSearch', this.searchForm).then(res => {
                        // this.paging.total = res.data
                        this.list = res.data;
                        this.listdate();
                    })
                }

            },

            dateToString(date) {
                var Str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date
                    .getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                return Str;
            },

            dateToStringYear(date) {
                var Str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                return Str;
            },

            listdate() {
                this.list.forEach(item => {
                    item.nowdate = this.dateToString(new Date(item.nowdate));
                    item.leave_date = this.dateToStringYear(new Date(item.leave_date));
                    item.goback_date = this.dateToStringYear(new Date(item.goback_date));
                })
            },

            getData() {
                // const form = {
                //     ...this.searchForm
                // };
                // form.page = this.paging.current;
                // form.startTime = form.timeRange[0];
                // form.endTime = form.timeRange[1];
                this.$axios.get('http://localhost:3000/student/api/getLeaveList').then(res => {
                    this.list = res.data;
                    this.listdate()
                    //   this.paging = Object.assign(this.paging, res.data.data.paging);
                    //   if (this.paging.current > this.paging.pageCount) {
                    //     this.paging.current = this.paging.pageCount;
                    //     this.getData();
                    //   }
                })
            },
            curPageChange(val) {
                // this.paging.current = page;
                // this.getData();
                this.paging.current = val;
                this.$axios.post('http://localhost:3000/page/api/list', {
                    cate: 'leaveList',
                    page: val
                }).then(res => {
                    this.list = res.data;
                    this.listdate();
                    this.getPage();
                    // console.log(this.buildingInfo);
                })
            },
            remove(row) {
                const info = {
                    id: row.id
                };
                this.$confirm('确定要删除该离校登记单？', '提示', {
                    type: "warning"
                }).then(() => {
                    this.$axios.post('http://localhost:3000/student/api/delLeaveSchoolForm', info).then(res => {
                        if (res.status == 200) {
                            this.$alert('删除成功！', '提示', {
                                type: "success"
                            });
                            this.getData();
                            this.curPageChange()
                        } else {
                            this.$alert(res.data.msg, '错误', {
                                type: "error"
                            });
                        }


                    })
                });
            }
        },
        mounted() {
            this.getData();
            this.getPage();
        }
    }
</script>

<style lang="scss" scoped>
    .page-container {
        margin-top: 20px;
    }
</style>