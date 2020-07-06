<template>
    <div>
        <el-dialog title="提示" :visible="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="学号">
                    <el-input :disabled="true" v-model="form.Sno"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input @input="change()" v-model="form.Sname"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select  v-model="form.Ssex" placeholder="性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="楼号">
                    <el-input  v-model="form.Bud"></el-input>
                </el-form-item>
                <el-form-item label="宿舍号">
                    <el-input v-model="form.Dno"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="form.Sdept"></el-input>
                </el-form-item>
                <el-form-item label="入住时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                        style="width: 100%;">
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
        name: "edit-student",
        props: [
            'dialogVisible',
            'rowdatatemp'
        ],
        data() {
            return {
                // dialogVisible: false
                form:this.rowdatatemp,
                // form: {
                //     // 学号
                //     sno: '',
                //     // 姓名
                //     name: '',
                //     // 性别
                //     sex: '',
                //     // 楼号
                //     bud: '',
                //     // 宿舍号
                //     dno: '',
                //     // 专业
                //     sdept: '',
                //     // 入住时间
                //     date: '',
                // },
            };
        },

        watch: {
            rowdatatemp: function () {
                // console.log(1);
                this.form = JSON.parse(this.rowdatatemp)
            },
        },


        // watch: {
        //     rowToform() {
        //         this.rowdata.date = new Date(this.rowdata.date);
        //         this.form = this.rowdata;
        //         return this.form;
        //     }
        // },

        // beforeCreate() {
        //     this.update();

        // },

        created() {
            this.update();
        },

        beforeUpdate() {
            // console.log(1);
            // this.update();
        },

        updated() {
            // this.update();
            
        },

        computed: {

        },

        methods: {

            // change(v) {
            //     this.$set(this.form, sname, v)
            // },

            change() {
                // console.log(e);
            },

            update() {

            },

            change(e) {
                this.$forceUpdate()
            },

            handleClose() {
                // this.form = JSON.parse(JSON.stringify(this.rowdata))
                // console.log(JSON.parse(JSON.stringify(this.rowdata)));

                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.closeDialog();
                    })
                    .catch(_ => {});
            },

            onSubmit() {
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