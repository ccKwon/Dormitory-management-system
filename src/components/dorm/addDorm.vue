<template>
    <div>
        <el-dialog title="提示" :visible="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px" size="small">
                <el-form-item label="宿舍号">
                    <el-input v-model="form.dno"  ></el-input>
                </el-form-item>
                <el-form-item label="楼号">
                    <el-input v-model="form.bud" ></el-input>
                </el-form-item>
                <el-form-item label="容纳人数">
                    <el-input v-model="form.sum" ></el-input>
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
        name: "add-dorm",
        props: [
            'dialogVisible'
        ],
        data() {
            return {
                // dialogVisible: false
                form: {
                    // 宿舍号
                    dno: '',
                    // 楼号
                    bud: '',
                    // 当前人数
                    people: 0,
                    // 容纳人数
                    sum: '',
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

            onSubmit() {
                // console.log(this.form);
                this.$emit("getAdd", this.form);
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