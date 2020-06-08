<template>
    <div class="page-container">

        <el-table :data="list" :default-sort="{prop: 'edit_date', order: 'ascending'}" border class="margin-top-20"
            stripe>
            <el-table-column align="center" prop="date" label="提交日期" width="140px">
            </el-table-column>
            <el-table-column align="center" label="宿舍号" prop="dno" width="120px" />
            <el-table-column align="center" label="描述" prop="descc" />
            <el-table-column align="center" label="联系方式" prop="concat" width="140px" />
            <el-table-column align="center" label="维修人" prop="repairman" width="120px">
                <!-- <template #default="scope">
        </template> -->
            </el-table-column>
            <el-table-column align="center" label="维修状态" prop="repairstatus" width="120px">
                <template slot-scope="scope">
                    <div>
                        <p class="color-info" v-if="scope.row.repairstatus == 1">待处理</p>
                        <p class="color-blue" v-if="scope.row.repairstatus == 2">正在处理</p>
                        <p class="color-success" v-if="scope.row.repairstatus == 0">已处理</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="repairstatus" label="操作" width="180px">
                <template slot-scope="scope">
                    <div v-if="userInfo.identity === 3">
                        <el-tooltip content="开始处理" v-if="scope.row.repairstatus == 1 || scope.row.repairstatus == 3">
                            <el-button @click="startHandle(scope.row)" circle
                                icon="el-icon-document-checked font-size-16" plain size="mini" type="primary" />
                        </el-tooltip>
                        <div v-if="scope.row.repairstatus == 2">
                            <div>
                                <el-tooltip content="已完成">
                                    <el-button @click="setDone(scope.row)" circle icon="el-icon-check font-size-16"
                                        plain size="mini" type="success" />
                                </el-tooltip>
                            </div>
                            <!-- <div  class="tip-small">
                                正在处理
                            </div> -->

                        </div>

                    </div>

                    <el-tooltip content="删除" v-if="scope.row.repairstatus == 0">
                        <el-button @click="delForm(scope.row)" circle icon="el-icon-delete font-size-16" plain
                            size="mini" type="danger" />
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";

    export default {
        data() {
            return {

                paging: {
                    current: 1,
                    total: 1,
                    pageCount: 1
                },

                // 保修单列表
                list: [],

                submittedList: [],

            }
        },
        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            search() {
                this.paging.current = 1;
                this.getData();
            },

            getData() {
                //   console.log(111);
                this.$axios.get('/api/getList').then(res => {
                    this.list = res.data;
                })
            },

            curPageChange(page) {
                this.paging.current = page;
                this.getData();
            },
            showRepairImages(files) {
                this.currentImages = files;
                this.isImageViewer = true;
            },
            // 开始接手任务
            startHandle(row) {
                this.$confirm('确定要开始处理改报修单吗？', '提示', {
                    type: "warning"
                }).then(() => {
                    console.log(this.userInfo);
                    this.$axios.post('/api/updateList', {
                            id: row.id,
                            repairstatus: "2"
                        })
                        .then(res => {
                            this.getData();
                        })
                        .catch(err => {
                            console.error(err);
                        })
                })
            },

            setDone(row) {

                this.$confirm('确定已完成该报修单吗？', '提示', {
                    type: "warning"
                }).then(() => {
                    this.$axios.post('/api/updateList', {
                            id: row.id,
                            repairstatus: "0"
                        })
                        .then(res => {
                            this.getData();
                        })
                        .catch(err => {
                            console.error(err);
                        })
                }).catch(() => {});
            },


            delForm(row) {
                this.$confirm('确定删除该报修单吗？', '提示', {
                    type: "warning"
                }).then(() => {
                    this.$axios.post('/api/delete', {
                        id: row.id
                    }).then(res => {
                        // if (!res.data.errcode) {
                        //     this.$alert('删除成功！', '提示', {
                        //         type: "success"
                        //     });
                        // } else {
                        //     this.$alert(res.data.msg, '错误', {
                        //         type: "error"
                        //     });
                        // }
                        console.log(111);
                        this.getData();
                    })
                }).catch(() => {});
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
    .color-blue {
        color: #409eff;
    }

    .color-success {
        color: #67C23A;
    }

    .color-warning {
        color: #E6A23C;
    }

    .color-grey {
        color: #aaa;
    }

    .color-white {
        color: #fff;
    }

    .color-danger {
        color: #F56C6C;
    }

    .color-info {
        color: #909399;
    }
</style>