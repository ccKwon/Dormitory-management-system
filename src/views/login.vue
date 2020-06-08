<template>
    <div class="login-page">
        <main class="login-main">
            <el-form :model="form" :rules="rules" @submit.native.prevent="onSubmit" class="login-form"
                element-loading-background="rgba(0, 0, 0, 0.5)" element-loading-spinner="el-icon-loading"
                element-loading-text="正在登录..." ref="form" v-loading.fullscreen.lock="isLoading">
                <el-form-item prop="account">
                    <el-input class="login-input" placeholder="请输入用户名" prefix-icon="el-icon-user"
                        v-model="form.account" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="login-input" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password
                        v-model="form.password" />
                </el-form-item>
                <el-form-item>
                    <div>
                        <el-radio-group @change="onChangeUserType" class="user-type-radio__group"
                            v-model="form.identity">
                            <el-radio :label="2">学生</el-radio>
                            <el-radio :label="1">管理员</el-radio>
                            <el-radio :label="3">维修员</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>

                <el-button class="login-btn--submit" native-type="submit">登录</el-button>
            </el-form>
        </main>

    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";

    export default {
        name: "login",
        data() {
            return {
                isLoading: false,
                form: {
                    account: "admin",
                    password: "admin",
                    identity: 1
                },
                rules: {
                    account: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: "请输入密码",
                        trigger: 'blur'
                    }]
                }
            }
        },


        created() {
            // this.check();

        },
        methods: {

            setdata(res, formdata) {
                this.$root.$message.success('登录成功');
                localStorage.setItem('token', res.data.token);
                localStorage.setItem("username", formdata.account);
                localStorage.setItem("i", formdata.identity);
                this.$router.push('/main');
            },

            async onSubmit() {
                await this.$refs.form.validate();

                const formdata = {};
                Object.assign(formdata, this.form)
                let res = {};
                switch (formdata.identity) {
                    case 1:
                        delete formdata.identity;
                        try {
                            res = await this.$axios.post('/api/getmanagerByname', formdata);
                            if (res.data.token) {
                                formdata.identity = 1;
                                localStorage.setItem('id', formdata.account);
                                formdata.account = res.data.name;
                                this.$store.commit('getUserInfo', formdata)
                                this.setdata(res, formdata);
                            } else {
                                this.$message.error("用户名或密码错误")
                            }
                        } catch (error) {
                            this.$message.error("未知异常")
                        }

                        break;
                    case 2:
                        delete formdata.identity;
                        try {
                            res = await this.$axios.post('/api/getstudentBySno', formdata);
                            if (res.data.token) {
                                formdata.identity = 2;
                                localStorage.setItem('id', formdata.account);

                                formdata.account = res.data.Sname;
                                this.$store.commit('getUserInfo', formdata)
                                this.setdata(res, formdata);

                            } else {
                                this.$message.error("用户名或密码错误");
                            }

                        } catch (error) {
                            this.$message.error("未知异常")

                        }

                        break;
                    case 3:
                        delete formdata.identity;
                        try {
                            res = await this.$axios.post('/api/getrepairmen', formdata);
                            if (res.data.token) {
                                formdata.identity = 3;
                                localStorage.setItem('id', formdata.account);

                                formdata.account = res.data.name;
                                this.$store.commit('getUserInfo', formdata);
                                this.setdata(res, formdata);
                            } else {
                                this.$message.error("用户名或密码错误");
                            }

                        } catch (error) {
                            this.$message.error("未知异常")
                        }

                        break;
                    default:
                        break;
                }

            },


            onChangeUserType(v) {
                switch (v) {
                    case 1:
                        this.form.account = "admin";
                        this.form.password = "admin";
                        break;
                    case 2:
                        this.form.account = "5";
                        this.form.password = "123456";
                        break;
                    case 3:
                        this.form.account = "repairmen";
                        this.form.password = "123456";
                        break;
                }
            },



        }
    }
</script>


<style lang="scss">
    .el-radio__inner {
        border: 1px solid #8f96a6;
        background-color: #293344;
    }

    .el-radio__input.is-checked+.el-radio__label {
        color: #e6e6e6;
    }

    .el-radio__input.is-checked .el-radio__inner {
        border: 1px solid #8f96a6;
        background: #3c4e69;
    }
</style>

<style lang="scss" scoped>
    .login-page {
        background-color: #293344;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login-main {
        width: 250px;

        .login-title {
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 28px;

            i {
                font-size: 46px;
            }

            .login-title__name {
                font-size: 20px;
                margin-left: 10px;
            }

            .login-title__name--main {
                margin-bottom: 5px;
            }

            .login-title__name--sm {
                font-size: 12px;
            }
        }


        .login-form {
            .user-type-radio__group {
                display: flex;
                justify-content: space-around;
                width: 100%;


                .el-radio__label {
                    color: #78808e;
                    padding-left: 6px;
                }



            }

            .login-btn--submit {
                background-color: #3c4e69;
                color: white;
                border: none;
                width: 100%;

                &:hover {
                    background-color: #409EFF;
                }
            }
        }



    }




    .user-type__title {
        font-size: 12px;
        color: #78808e;
        margin-bottom: 15px;
    }

    .user-type-radio__group {
        /*margin-bottom: 15px;*/
        display: flex;
        justify-content: space-around;
        width: 100%;
    }
</style>