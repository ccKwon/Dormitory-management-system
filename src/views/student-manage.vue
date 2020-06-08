<template>
    <div>
        <div class="top">
            <el-button @click="showAddstudent" class="add" type="primary">添加学生</el-button>
        </div>
        <template class="main">
            <el-table :default-sort="{prop: 'sno', order: 'ascending'}" border ref="multipleTable" :data="studentList"
                tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <!-- <el-table-column width="55">
                </el-table-column> -->
                <el-table-column align="center" sortable prop="sno" label="学号" width="180">
                    <!-- <template slot-scope="scope">{{ scope.row.sno }}</template> -->
                </el-table-column>
                <el-table-column align="center" sortable prop="sname" label="姓名" width="150">
                </el-table-column>
                <el-table-column align="center" sortable prop="ssex" label="性别" width="120">
                </el-table-column>
                <el-table-column align="center" sortable prop="bud" label="楼号" width="150">
                </el-table-column>
                <el-table-column align="center" sortable prop="dno" label="宿舍号" width="150">
                </el-table-column>
                <el-table-column align="center" sortable prop="sdept" label="专业" width="150">
                </el-table-column>
                <el-table-column align="center" sortable prop="date" label="入住时间" width="150">
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="ShowModifyStudent(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div style="margin-top: 20px">
                <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
            </div> -->
        </template>

        <edit-student :dialogVisible.sync="isShowModifyStudent" @getedit="editstudentinfo" :rowdata="rowdata">
        </edit-student>
        <add-student :dialogVisible.sync="isShowAddStudent" @getAdd="addStudent"></add-student>
    </div>
</template>


<script>
    import editStudent from "../components/student/edit.vue";
    import addStudent from "../components/student/addStudent.vue";
    export default {

        components: {
            editStudent,
            addStudent
        },
        data() {
            return {
                isShowModifyStudent: false,
                isShowAddStudent: false,
                // 学生列表
                studentList: [],
                // 临时学生列表
                litsTemp: {},
                rowdata: {},

                multipleSelection: []
            }
        },

        created() {
            this.getstudentList()
        },

        methods: {

            // 接受添加学生子组件传过来的值
            addStudent(data) {
                console.log(data);
                data.date = this.dateToString(data.date);
                console.log(data);
                this.studentList.push(data);
            },

            dateToString(date) {
                var Str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                return Str;
            },

            // 接受修改表单子组件传进来的值
            editstudentinfo(data) {
                // 将date类型转为String类型
                var Str = data.date.getFullYear() + '-' + (data.date.getMonth() + 1) + '-' + data.date.getDate();
                data.date = Str;
                this.studentList.forEach((v, index) => {
                    if (v.sno == data.sno) {
                        // 更新当前studentList
                        Object.assign(this.studentList[index], data);
                        var student = {};
                        Object.assign(student, this.studentList[index]);
                        student.date = new Date(student.date)
                        // 更新数据库
                        this.$axios.post("/api/updateStudent", student)
                            .then(res => {
                                console.log(res)
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    }
                })
            },


            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            showAddstudent() {
                this.isShowAddStudent = true;
            },

            ShowModifyStudent(row) {
                this.isShowModifyStudent = true;
                // 浅拷贝 row 到 rowdata 
                Object.assign(this.rowdata, row);
                this.rowdata.date = new Date(this.rowdata.date);
                // this.rowdata = row
            },
            handleDelete(index, row) {
                this.$axios.get('/api/deleteStudent?id=' + row.sno).then(res => {
                    console.log(res);
                })

                this.studentList.forEach((v, index) => {
                    if (v.sno == row.sno) {
                        this.studentList.splice(index, 1);
                    }
                })
            },

            getstudentList() {
                this.$axios.get('/api/getstudentList')
                    .then(res => {
                        this.studentList = res.data;
                        for (let index = 0; index < this.studentList.length; index++) {
                            if (this.studentList[index].dno === 0 && this.studentList[index].bud === 0) {
                                this.studentList.splice(index, 1);
                                index--;
                            } else {
                                this.studentList[index].date = this.studentList[index].date.slice(0, 10);
                            }
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })

            }
        }
    }
</script>


<style lang="scss" scoped>
    // el-table {
    //     display: table-cell !important;
    // }
    .top {
        height: 50px;
        display: flex;
        align-items: center;

        .add {
            margin-left: auto;
            // margin-right: 210px;
        }
    }

    .main {
        // padding: 10px 0 ;
    }
</style>