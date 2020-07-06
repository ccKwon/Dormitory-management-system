<template>
    <div>
        <!-- <div class="top">
            <el-button @click="showAddRepairmen" class="add" type="primary">添加维修员</el-button>
        </div> -->
        <template>
            <el-table :data="List" border style="width: 100%">
                <el-table-column align="center" prop="Rname" label="维修员账号">
                </el-table-column>
                <el-table-column align="center" prop="name" label="维修员姓名">
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="ShowModifyStudent(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <edit-repairmen :dialogVisible.sync="isShowModifyRepairmen" @getedit="editrepairmentinfo" :rowdata="rowdata"></edit-repairmen>
        <add-repairmen :dialogVisible.sync="isShowAddRepairmen"></add-repairmen>
    </div>
</template>


<script>
    import addRepairmen from '../components/repairmen/addRepairmen.vue';
    import editRepairmen from '../components/repairmen/editRepairmen.vue';
    export default {
        data() {
            return {
                List: [],
                isShowModifyRepairmen: false,
                isShowAddRepairmen: false,
                rowdata:{},
            }
        },

        components: {
            addRepairmen,
            editRepairmen
        },


        created() {
            this.getList()
        },




        methods: {
            getList() {
                this.$axios.post('http://localhost:3000/page/api/list', {cate:'repairmen'}).then(res => {
                    this.List = res.data;
                })
            },

            // getedit() {

            // },

            showAddRepairmen() {
                this.isShowAddRepairmen = true;
            },

            ShowModifyStudent(row) {
                this.isShowModifyRepairmen = true;
                Object.assign(this.rowdata, row)
            },

            handleDelete(index, row) {

            },

            editrepairmentinfo(data) {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .top {
        height: 50px;
        display: flex;
        align-items: center;

        .add {
            margin-left: auto;
            // margin-right: 210px;
        }
    }
</style>