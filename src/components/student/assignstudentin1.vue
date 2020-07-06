<template>
    <div>
        <el-dialog title="提示" :visible="dialogVisible" width="30%" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="学号:">
                    {{ form.sno }}
                </el-form-item>
                <el-form-item label="姓名:">
                    {{ form.sname }}
                </el-form-item>
                <el-form-item label="楼号">
                    <el-input @input="change($event)" v-model="form.bud"></el-input>
                </el-form-item>
                <el-form-item label="宿舍号">
                    <el-input @input="change($event)" v-model="form.dno"></el-input>
                </el-form-item>
                <p class="toast" v-if="toast">
                    该宿舍已满人 请安排其他宿舍
                </p>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">分配</el-button>
                    <el-button @click="closeDialog">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "assign-student",
        props: [
            'dialogVisible',
            'rowdata'
        ],
        data() {
            return {
                toast: false,
                // dialogVisible: false
                form: this.rowdata,

            };
        },

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
                this.$axios.get('http://localhost:3000/dorm/api/getdormBydno?dno=' + this.form.dno + "&bud=" + this.form.bud).then(res => {
                    console.log(res.data.people);
                    console.log(res.data.sum);
                    console.log(res);
                    if (res.data.people === res.data.sum) {
                        this.toast = true;
                    } else {
                        let date = new Date();
                        let dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        this.form.date = dateStr;
                        this.$emit("getedit", this.form);
                        this.closeDialog();
                    }
                })

                // Object.keys(this.form).forEach(key => this.form[key] = '');
                // this.closeDialog()
            },

            closeDialog() {

                console.log(this.form);
                this.$emit('update:dialogVisible', false);
            }
        }
    };
</script>


<style lang="scss" scoped>
    .toast {
        color: red;
        text-align: center;
    }
</style>