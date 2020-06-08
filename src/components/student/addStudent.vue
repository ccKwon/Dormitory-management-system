<template>
    <div>
        <el-dialog title="提示" :visible="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px" size="small">
                <el-form-item label="学号">
                    <el-input v-model="form.sno"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.sname"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="form.ssex" placeholder="性别" size="small">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="楼号">
                    <el-input v-model="form.bud"></el-input>
                </el-form-item>
                <el-form-item label="宿舍号">
                    <el-input v-model="form.dno"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="form.sdept"></el-input>
                </el-form-item>
                <el-form-item label="入住时间">
                    <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%;">
                    </el-date-picker>
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
        name: "add-student",
        props: [
            'dialogVisible'
        ],
        data() {
            return {
                // dialogVisible: false
                form: {
                    // 学号
                    sno: '',
                    // 姓名
                    sname: '',
                    // 性别
                    ssex: '',
                    // 楼号
                    bud: '',
                    // 宿舍号
                    dno: '',
                    // 专业
                    sdept: '',
                    // 入住时间
                    date: '',
                },
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
            closeDialog() {

                this.$emit('update:dialogVisible', false);
            },
            onSubmit() {
                // console.log(this.form);
                this.$emit("getAdd", this.form);
                this.closeDialog();
                // Object.keys(this.form).forEach(key => this.form[key] = '');
                // this.closeDialog()
            },


        }
    };
</script>