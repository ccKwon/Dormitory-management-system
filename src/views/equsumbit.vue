<template>
    <div class="page-container" style="max-width: 500px">
        <div class="flex align-center margin-bottom-30">
            <p class=" title-part">填写设备报修单</p>
            <!-- <p @click="isShowSubmitted = true"
                class="margin-left-auto cursor-pointer color-main underline font-size-14">已提交的报修单</p> -->
        </div>
        <el-form :model="form" label-width="100px" ref="form">
            <el-form-item :rules="[{required:true,message:'请输入宿舍号',trigger:'blur'}]" label="宿舍号" prop="dorm_num">
                <el-input placeholder="例如：8#604" v-model="form.dno" />
            </el-form-item>
            <el-form-item :rules="[{required:true,message:'请输入联系方式',trigger:'blur'}]" label="联系方式" prop="contact">
                <el-input placeholder="请输入联系方式" v-model="form.concat" />
            </el-form-item>
            <el-form-item :rules="[{required:true,message:'请输入描述',trigger:'blur'}]" label="描述" prop="repair_desc">
                <el-input :rows="3" placeholder="请详细描述" type="textarea" v-model="form.descc" />
            </el-form-item>
            <el-form-item class="text-center">
                <el-button @click="submit" type="primary">提交</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>




    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";


    const initForm = () => {
        return {
            dno: "",
            descc: "",
            concat: "",
            date: "",
            repairman: "无",
            repairstatus: "1"
        }
    };
    export default {
        name: "equ-submit",
        // components: {ImageViewer, UploadFile},
        data() {
            return {
                form: initForm(),
                isShowSubmitted: false
            }
        },
        methods: {
            submit() {
                let data = {};
                Object.assign(data, this.form);
                let date = new Date();
                data.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                console.log(data);
                this.$axios.post('/api/insertList', data)
                    .then(res => {
                        this.$alert("提交成功，请等待维修员处理。", "提示", {
                            type: "success"
                        });

                        this.form = initForm();
                    })
                    .catch(err => {
                        this.$alert(res.data.msg, "错误", {
                            type: "error"
                        });

                        console.error(err);
                    })
            },

            reset() {
                this.form = initForm();
            }
        },
        computed: {
            ...mapState(['userInfo'])
        },
    }
</script>

<style lang="scss" scoped>
    /deep/ {
        .el-upload-list--picture-card .el-upload-list__item {
            width: 120px;
            height: 120px;
        }

        .el-upload--picture-card {
            width: 120px;
            height: 120px;
            line-height: 120px;
        }
    }
</style>