<template>
    <div>
        <el-dialog title="提示" :visible="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="楼号">
                    <el-input @input="change($event)" v-model="form.Bud"></el-input>
                </el-form-item>
                <el-form-item label="宿舍号">
                    <el-input @input="change($event)" v-model="form.Dno"></el-input>
                </el-form-item>
                <el-form-item  label="容纳人数">
                    <el-input @input="change($event)" v-model="form.sum"></el-input>
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
        name: "edit-dorm",
        props: [
            'dialogVisible',
            'rowdata'
        ],
        data() {
            return {
                // dialogVisible: false
                form:this.rowdata
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

            onSubmit() {
                // console.log(this.rowdata);
                // console.log(this.form);
                this.$emit("getedit", this.form);
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