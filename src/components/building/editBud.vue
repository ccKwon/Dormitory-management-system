<template>
    <div>
        <el-dialog title="提示" :visible="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item   :rules="[{ required: true, message: '请输入楼栋号',trigger:'change'}]"
                                label="楼号">
                    <el-input @input="change($event)" v-model="form.Bud"></el-input>
                </el-form-item>
                <el-form-item label="楼层数">
                    <el-input   :rules="[{ required: true, message: '请输入楼层数',trigger:'change'}]"
                                @input="change($event)" v-model="form.floor"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input  v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">修改</el-button>
                    <el-button @click="closeDialog">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "edit-bud",
        props: [
            'dialogVisible',
            'rowdata'
        ],
        data() {
            return {
                // dialogVisible: false
                form: this.rowdata
                // form: {
                //     // 宿舍号
                //     dno: '',
                //     // 楼号
                //     bud: '',
                //     // 容纳人数
                //     sum: '',
                // },
            };
        },


        // watch: {
        //     rowToform() {
        //         this.rowdata.date = new Date(this.rowdata.date);
        //         this.form = this.rowdata;
        //         return this.form;
        //     }
        // },

        computed: {

        },

        methods: {

            // 强制更新
            change(e) {
                this.$forceUpdate()
            },

            handleClose() {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.closeDialog();
                    })
                    .catch(_ => {});
            },

            async onSubmit() {
                await this.$refs.form.validate();
                const data = {
                    ...this.form
                }
                this.$axios.post('http://localhost:3000/building/api/upadateBud', data)
                    .then(res => {
                        this.$emit("getedit", this.form);
                    })
                    .catch(err => {
                        console.error(err);
                    })
                this.closeDialog();
                // Object.keys(this.form).forEach(key => this.form[key] = '');
                // this.closeDialog()
            },

            closeDialog() {
                this.$emit('update:dialogVisible', false);
            }
        }
    };
</script>