<template>
    <div>
        <!-- 添加维修员 -->
        <el-dialog :visible.sync="dialogVisible" title="添加维修员" :before-close="handleClose" width="500px">
            <el-form :model="addForm" :rules="addFormRules" label-width="100px" ref="addForm">
                <el-form-item label="账号：" prop="Rname">
                    <el-input placeholder="请输入账号" style="width: 200px;" v-model="addForm.Rname" />
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input placeholder="请输入姓名" style="width: 200px;" v-model="addForm.name" />
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input placeholder="请输入密码" style="width: 200px;" v-model="addForm.password" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="text-center">
                    <el-button @click="submitAddForm" type="primary">提交</el-button>
                    <el-button @click="closeDialog">取消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        name: 'add-repairmen',
        props: [
            'dialogVisible'
        ],

        data() {
            return {
                addForm: {
                    Rname: "",
                    name: "",
                    password: ""
                },

                addFormRules: {
                    account: [{
                        required: true,
                        message: '账号不能为空',
                        trigger: "blur"
                    }],
                    name: [{
                        required: true,
                        message: '姓名不能为空',
                        trigger: "blur"
                    }],
                    password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: "blur"
                    }],
                },
            }
        },


        methods: {
            async submitAddForm() {
                try {
                    await this.$refs.addForm.validate();
                    this.$axios.post('/api/insertrepairmen', this.addForm)
                        .then(res => {
                            console.log(res);
                            if (res.status === 200) {
                                this.$alert('添加成功！', '提示', {
                                    type: "success"
                                });
                                this.$emit('update:dialogVisible', false);
                                this.addForm = {};
                            } else {
                                this.$alert(res.data.msg, '错误', {
                                    type: "error"
                                });
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })
                } catch (e) {
                    return false;
                }
            },
            handleClose() {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.closeDialog();
                    })
                    .catch(_ => {});
            },
            closeDialog() {

                this.$emit('update:dialogVisible', false);
            },
        },
    }
</script>


<style lang="scss" scoped>

</style>