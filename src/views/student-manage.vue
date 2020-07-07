<template>
    <div>
        <template class="main">
            <div class="top">
                <div class="search-con">
                    <!-- @submit.native.prevent="search" -->
                    <el-form @submit.native.prevent='search' class="search" inline>
                        <el-form-item label="搜索">
                            <el-input clearable placeholder="学号、姓名" prefix-icon="el-icon-search" size="medium"
                                v-model="searchInfo.keyword" />
                        </el-form-item>
                        <el-form-item>
                            <el-button native-type="submit" size="medium" type="primary">搜索
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="add">
                    <el-button @click="showAddstudent" size="medium" type="primary">添加学生</el-button>
                </div>
            </div>
            <el-table :default-sort="{prop: 'sno', order: 'ascending'}" border ref="multipleTable" :data="studentList"
                tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <!-- <el-table-column width="55">
                </el-table-column> -->
                <el-table-column align="center" sortable prop="Sno" label="学号" width="180">
                    <!-- <template slot-scope="scope">{{ scope.row.sno }}</template> -->
                </el-table-column>
                <el-table-column align="center" sortable prop="Sname" label="姓名" width="150">
                </el-table-column>
                <el-table-column align="center" sortable prop="Ssex" label="性别" width="120">
                </el-table-column>
                <el-table-column align="center" sortable prop="Bud" label="楼号" width="150">
                </el-table-column>
                <el-table-column align="center" sortable prop="Dno" label="宿舍号" width="150">
                </el-table-column>
                <el-table-column align="center" sortable prop="Sdept" label="专业" width="150">
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

        <edit-student :dialogVisible.sync="isShowModifyStudent" @getedit="editstudentinfo"
            :rowdatatemp.sync="rowdatatemp">
        </edit-student>
        <add-student :dialogVisible.sync="isShowAddStudent" @getAdd="addStudent"></add-student>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="this.totalPage"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>

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
                rowdatatemp: '',
                multipleSelection: [],
                totalPage: 0,
                searchInfo: {
                    keyword: ''
                }
            }
        },

        created() {
            this.getstudentList()
                // this.getPage()
        },

        methods: {

            search() {
                if (this.searchInfo.keyword !== '') {
                    this.totalPage = 1;
                    this.searchList();
                } else {
                    this.getstudentList();
                }
            },

            searchList() {
                this.$axios.post('http://localhost:3000/student/api/searchStudent', this.searchInfo).then(res => {
                    this.studentList = res.data;
                    for (let index = 0; index < this.studentList.length; index++) {
                        if (this.studentList[index].Dno === 0 && this.studentList[index].Bud === 0) {
                            this.studentList.splice(index, 1);
                            index--;
                        } else {
                            this.studentList[index].date = this.studentList[index].date.slice(0, 10);
                        }
                    }
                })
            },

            handleCurrentChange(val) {
                this.$axios.post("http://localhost:3000/page/api/list", {
                        cate: 'student',
                        page: val
                    })
                    .then(res => {
                        this.studentList = res.data;
                        for (let index = 0; index < this.studentList.length; index++) {
                            if (this.studentList[index].Dno === 0 && this.studentList[index].Bud === 0) {
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
            },

            getPage() {
                this.$axios.get('http://localhost:3000/student/api/pagetotal').then(res => {
                    this.totalPage = res.data
                })
            },

            // 接受添加学生子组件传过来的值
            addStudent(data) {
                data.date = this.dateToString(data.date);
                this.studentList.push(data);
                this.$axios.post('http://localhost:3000/student/api/insertStudent', data).then(res => {
                    console.log(res);
                })
            },

            dateToString(date) {
                var Str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                return Str;
            },

            // 接受修改表单子组件传进来的值
            editstudentinfo(data) {
                // 将date类型转为String类型
                data.date = new Date(data.date)
                var Str = data.date.getFullYear() + '-' + (data.date.getMonth() + 1) + '-' + data.date.getDate();
                data.date = Str;
                this.studentList.forEach((v, index) => {

                    if (v.Sno == data.Sno) {
                        // 更新当前studentList
                        Object.assign(this.studentList[index], data);
                        var student = {};
                        Object.assign(student, this.studentList[index]);
                        student.date = new Date(student.date)
                        // 更新数据库
                        this.$axios.post("http://localhost:3000/student/api/updateStudent", student)
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
                // this.rowdata = JSON.stringify(row);
                this.rowdata.date = new Date(this.rowdata.date);
                this.rowdatatemp = JSON.stringify(this.rowdata);
                // this.rowdata = row
            },
            handleDelete(index, row) {
                this.$axios.get('/api/deleteStudent?id=' + row.Sno).then(res => {
                    // console.log(res);
                })

                this.studentList.forEach((v, index) => {
                    if (v.Sno == row.Sno) {
                        this.studentList.splice(index, 1);
                    }
                })
            },

            getstudentList() {
                this.$axios.post('http://localhost:3000/student/api/getStudentList')
                    .then(res => {
                        this.studentList = res.data;
                        for (let index = 0; index < this.studentList.length; index++) {
                            if (this.studentList[index].Dno === 0 && this.studentList[index].Bud === 0) {
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
                this.getPage();
            }
        }
    }
</script>


<style lang="scss" scoped>
    .main {

        // padding: 10px 0 ;
        .top {
            // height: 50px;
            display: flex;
            // align-items: center;
            // justify-content: center;
            padding: 10px 0;

            .add {
                // line-height: 50px;
                margin-left: auto;
                margin-right: 50px;
            }

            .search-con {
                // line-height: 50px;
                // padding-top: 15px;
                margin-left: 20px;

                .el-form-item {
                    margin-bottom: 0;
                }

            }


        }
    }

    .pagination {
        margin-top: 10px;
        float: right;
    }
</style>