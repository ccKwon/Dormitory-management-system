<template>
    <div>
        <div class="top">
            <div class="search-con">
                <!-- @submit.native.prevent="search" -->
                <el-form @submit.native.prevent='search' class="search" inline>
                    <el-form-item label="搜索">
                        <el-input clearable placeholder="楼栋号、描述" prefix-icon="el-icon-search" size="medium"
                            v-model="searchInfo.keyword" />
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="searchInfo.Bud" placeholder="请选择">
                            <el-option v-for="item in options.buildings" :key="item.Budid" :label="item.text"
                                :value="item.Bud">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button native-type="submit" size="medium" type="primary">搜索
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="add">
                <el-button @click="showAddDorm" class="add" type="primary">添加宿舍</el-button>
            </div>
        </div>
        <template class="main">
            <el-table :default-sort="{prop: 'dno', order: 'ascending'}" border ref="multipleTable" :data="dormInfo"
                tooltip-effect="dark" style="width: 100%">
                <!-- <el-table-column width="55">
                </el-table-column> -->
                <el-table-column align="center" sortable prop="Dno" label="宿舍号">
                    <!-- <template slot-scope="scope">{{ scope.row.sno }}</template> -->
                </el-table-column>
                <el-table-column align="center" sortable prop="Bud" label="楼栋号">
                </el-table-column>
                <el-table-column align="center" sortable prop="people" label="已住人数">
                </el-table-column>
                <el-table-column align="center" sortable prop="sum" label="容纳人数">
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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

        <add-dorm :dialogVisible.sync="isShowAddDorm" @getAdd="addDorm"></add-dorm>
        <edit-dorm :dialogVisible.sync="isShowEdit" :rowdata="rowdata" @getedit="editDormtinfo"></edit-dorm>
        <!-- <edit-student :dialogVisible.sync="isShowModifyStudent" @getedit="editstudentinfo" :rowdata="rowdata"></edit-student>
        <add-student :dialogVisible.sync="isShowAddStudent" @getAdd = "addStudent" ></add-student> -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="this.totalPage"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>


<script>
    import addDorm from '../components/dorm/addDorm.vue'
    import editDorm from '../components/dorm/editDorm.vue'
    export default {
        components: {
            addDorm,
            editDorm
        },
        data() {
            return {
                // 宿舍信息
                dormInfo: [],
                isShowAddDorm: false,
                isShowEdit: false,
                rowdata: {},
                totalPage: 0,
                searchInfo: {
                    keyword: '',
                    Bud: 0
                },
                options: {
                    buildings: []
                },
                building: []
            }
        },

        created() {
            this.getDorminfo();
            this.getBuildinginfo()
        },


        methods: {

            getBuildinginfo() {
                this.$axios.get('http://localhost:3000/building/api/buildingList').then(res => {
                    this.options.buildings = res.data;
                    this.options.buildings.forEach(item => {
                        item.text = item.Bud + '号楼'
                    })
                    this.options.buildings.unshift({
                        Bud: 0,
                        text: "全部"
                    })
                })

            },

            search() {
                if (this.searchInfo.keyword !== '' && this.searchInfo.Bud !== 0) {
                    console.log(111);
                    this.totalPage = 1;
                    this.searchList();
                } else {
                    this.getDorminfo();
                }
            },

            searchList() {
                this.$axios.post('http://localhost:3000/dorm/api/searchDorm', this.searchInfo).then(res => {
                    this.dormInfo = res.data;
                })
            },

            handleCurrentChange(val) {
                this.$axios.post("http://localhost:3000/page/api/list", {
                    cate: 'room',
                    page: val
                }).then(res => {
                    this.dormInfo = res.data;
                    // this.dormInfo.dno = this.dormInfo.bud + "#" + this.dormInfo.dno;
                    // console.log(this.dormInfo);
                    this.DnoaddBud();
                })
            },

            getPage() {
                this.$axios.get('http://localhost:3000/page/api/pagetotal?cate=room').then(res => {
                    this.totalPage = res.data
                })
            },

            editDormtinfo(data) {
                // console.log(data);
                // var keys = Object.keys(data);
                // keys.forEach(v => {
                //     console.log(v);
                // })
                let dataTemp = {};
                Object.assign(dataTemp, data)
                // console.log(dataTemp);

                let start = dataTemp.dnotemp.indexOf("#");
                let length = dataTemp.dnotemp.length;

                let dnotemp = this.rowdata.dnotemp.slice(start + 1, length)
                let budtemp = dataTemp.budtemp;
                let dnotemp1 = dataTemp.dnotemp.slice(start + 1, length)
                dataTemp.Dno = dataTemp.Bud + "#" + dataTemp.Dno;
                this.dormInfo.forEach((v, index) => {
                    // console.log(v);
                    if (v.Bud === dataTemp.budtemp && v.Dno === dataTemp.dnotemp) {
                        // console.log(dataTemp);
                        delete dataTemp.budtemp;
                        delete dataTemp.dnotemp;

                        Object.assign(this.dormInfo[index], dataTemp);
                        // console.log(this.dormInfo[index]);

                        // dataTemp.dno = dnotemp;
                        start = dataTemp.Dno.indexOf("#");
                        length = dataTemp.Dno.length;
                        dataTemp.Dno = dataTemp.Dno.slice(start + 1, length);

                        dataTemp.dnotemp = dnotemp1;
                        dataTemp.budtemp = budtemp;

                        let datalast = {}
                        datalast.dnotemp = dataTemp.dnotemp;
                        datalast.budtemp = dataTemp.budtemp;
                        delete dataTemp.budtemp;
                        delete dataTemp.dnotemp;
                        datalast.dorm = dataTemp;
                        // 更新数据库
                        this.$axios.post('http://localhost:3000/dorm/api/updateDorm', datalast)
                            .then(res => {
                                console.log(res)
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    }
                })
            },


            getdno() {

            },

            showAddDorm() {
                this.isShowAddDorm = true
            },

            // 获取子组件 addDorm 传过来的值
            addDorm(data) {
                // console.log(data);
                let dataTemp = {};
                Object.assign(dataTemp, data);
                dataTemp.dno = dataTemp.bud + "#" + dataTemp.dno;
                this.dormInfo.push(dataTemp);
                dataTemp = null;
                this.$axios.post("http://localhost:3000/dorm/api/insertDorm", data)
                    .then(res => {
                        // console.log(res)
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },

            DnoaddBud() {
                this.dormInfo.forEach((v, index) => {
                    v.Dno = v.Bud + "#" + v.Dno;
                })
            },

            // 获取宿舍信息
            getDorminfo() {
                this.$axios.get("http://localhost:3000/dorm/api/getdorminfo").then(res => {
                    this.dormInfo = res.data;
                    // this.dormInfo.dno = this.dormInfo.bud + "#" + this.dormInfo.dno;
                    // console.log(this.dormInfo);
                    this.DnoaddBud();
                })
                this.getPage()

            },


            handleEdit(row) {
                Object.assign(this.rowdata, row);
                this.rowdata.budtemp = this.rowdata.Bud;
                this.rowdata.dnotemp = this.rowdata.Dno;
                // delete this.rowdata.people;
                let start = row.Dno.indexOf("#");
                let length = row.Dno.length;
                this.rowdata.Dno = this.rowdata.Dno.slice(start + 1, length)
                this.isShowEdit = true;
            },

            handleDelete(index, row) {
                // console.log(row.dno.findIndex('#'));
                let rowTemp = {};
                Object.assign(rowTemp, row);
                let start = row.Dno.indexOf("#");
                let length = row.Dno.length;

                this.dormInfo.forEach((v, index) => {
                    if (v.dno === rowTemp.dno && v.bud === rowTemp.bud) {
                        this.dormInfo.splice(index, 1);
                    }
                })

                rowTemp.dno = rowTemp.dno.slice(start + 1, length)

                this.$axios.post("/api/deleteDorm", rowTemp)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },
        },
    }
</script>

<style lang="scss" scoped>
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

            .search {}
        }


    }

    .pagination {
        margin-top: 20px;
        float: right;
    }
</style>