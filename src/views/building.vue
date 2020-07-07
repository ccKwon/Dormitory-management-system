<template>
    <div>

        <template class="main">
            <div class="top">
                <div class="search-con">
                    <!-- @submit.native.prevent="search" -->
                    <el-form @submit.native.prevent='search' class="search" inline>
                        <el-form-item label="搜索">
                            <el-input clearable placeholder="楼栋号、描述" prefix-icon="el-icon-search" size="medium"
                                v-model="searchInfo.keyword" />
                        </el-form-item>
                        <el-form-item>
                            <el-button native-type="submit" size="medium" type="primary">搜索
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="add">
                    <el-button @click="showAddBud" class="add" type="primary">添加楼栋</el-button>
                </div>
            </div>
            <el-table :default-sort="{prop: 'dno', order: 'ascending'}" border ref="multipleTable" :data="buildingInfo"
                tooltip-effect="dark" style="width: 100%">
                <!-- <el-table-column width="55">
                </el-table-column> -->
                <el-table-column align="center" sortable prop="Bud" label="楼栋号">
                    <!-- <template slot-scope="scope">{{ scope.row.sno }}</template> -->
                </el-table-column>
                <el-table-column align="center" sortable prop="floor" label="楼层号">
                </el-table-column>
                <el-table-column align="center" sortable prop="nickname" label="描述">
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
        <add-bud :dialogVisible.sync="isShowAddBud" @getAdd="addBud"></add-bud>
        <edit-bud :dialogVisible.sync="isShowEdit" :rowdata="rowdata" @getedit="editBudinfo"></edit-bud>
        <!-- 
        <add-dorm :dialogVisible.sync="isShowAddDorm" @getAdd="addDorm"></add-dorm>
        <edit-dorm :dialogVisible.sync="isShowEdit" :rowdata="rowdata" @getedit="editDormtinfo"></edit-dorm> -->
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="this.totalPage"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>

    </div>
</template>


<script>
    import addBud from '../components/building/addBud.vue';
    import editBud from '../components/building/editBud.vue';
    export default {
        components: {
            addBud,
            editBud
        },
        data() {
            return {
                // 楼栋信息
                buildingInfo: [],
                isShowAddBud: false,
                isShowEdit: false,
                rowdata: {},

                totalPage: 0,

                searchInfo: {
                    keyword: ''
                }
            }
        },

        created() {
            this.getBuildinginfo();
        },


        methods: {

            search() {
                if (this.searchInfo.keyword !== '') {
                    this.totalPage = 1;
                    this.searchList();
                } else {
                    this.getBuildinginfo();
                }
            },

            searchList() {
                this.$axios.post('http://localhost:3000/building/api/searchBuilding', this.searchInfo).then(res => {
                    console.log(res);
                    this.buildingInfo = res.data;
                })
            },

            handleCurrentChange(val) {
                this.$axios.post('http://localhost:3000/page/api/list', {
                    cate: 'building',
                    page: val
                }).then(res => {
                    this.buildingInfo = res.data;
                    // console.log(this.buildingInfo);
                })
            },

            editBudinfo(data) {
                console.log(data);
                this.buildingInfo.forEach((v, index) => {
                    if (v.Budid === data.Budid) {
                        Object.assign(this.buildingInfo[index], data);
                    }
                })
            },

            getPage() {
                this.$axios.get('http://localhost:3000/page/api/pagetotal?cate=building').then(res => {
                    this.totalPage = res.data
                })
            },


            getdno() {

            },

            showAddBud() {
                this.isShowAddBud = true
            },

            // 获取子组件 addDorm 传过来的值
            addBud(data) {
                var newBud = {};
                Object.assign(newBud, data);
                this.buildingInfo.push(newBud);

                this.$axios.post('http://localhost:3000/building/api/insertBud', newBud)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.error(err);
                    })
            },


            // 获取楼栋信息
            getBuildinginfo() {
                this.$axios.get('http://localhost:3000/building/api/buildingList').then(res => {
                    this.buildingInfo = res.data;
                    // console.log(this.buildingInfo);
                })
                this.getPage()

            },


            handleEdit(row) {
                this.isShowEdit = true;
                Object.assign(this.rowdata, row)
            },

            handleDelete(index, row) {
                this.$axios.post('/api/deleteBud', row)
                    .then(res => {
                        this.buildingInfo.forEach((v, index) => {
                            if (v.budid === row.budid) {
                                this.buildingInfo.splice(index, 1);
                            }
                        })
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

        }


    }

    .pagination {
        margin-top: 20px;
        float: right;
    }
</style>