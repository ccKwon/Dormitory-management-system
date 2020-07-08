<template>
    <div class="home">
        <v-header></v-header>
        <div class="body">
            <v-aside class="aside-bar"></v-aside>
            <div class="main">
                <div class="content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import {
        mapState
    } from "vuex";
    import vHeader from "../layout/v-header.vue";
    import vAside from "../layout/v-aside.vue";
    export default {

        components: {
            vHeader,
            vAside
        },

        data() {
            return {
                flag: this.userInfo
            }
        },

        computed: {
            ...mapState(['userInfo']),
        },

        mounted() {},

        beforeCreate() {
            
        },

        created() {
            if (!this.$store.state.userInfo.account) {
                this.check();
            }
        },


        methods: {
            aler() {
                alert("computed")
            },
            check() {
                let user = localStorage.getItem("id");

                let i = parseInt(localStorage.getItem("i"));
                let userinfo = {};
                if (user !== null) {
                    this.$axios.get('/api/getuser?account=' + user).then(res => {
                        userinfo.account = res.data.name;
                        userinfo.password = res.data.password;
                        userinfo.identity = i;
                        userinfo.Sno = res.data.Sno;
                        this.$axios.post('http://localhost:3000/student/api/getDormByid', res.data).then(
                        res => {
                            let dorm_num = res.data.Bud + '#' + res.data.Dno;
                            userinfo.dorm_num = dorm_num;
                        })
                        // this.$store.dispatch("changeUserinfo",userinfo)
                        // this.$store.commit('getUserInfo', {})
                        this.$store.commit('getUserInfo', userinfo)
                        this.$router.push('/main')
                    })
                }
            }
        }
    }
</script>


<style lang="scss" scoped>
    .home {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .body {
        flex: 1;
        display: flex;
        position: relative;
    }

    .aside-bar {
        width: 250px;
        flex: 0 0 auto;
        transition: all 0.2s;
    }

    .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        transition: all 0.2s;
        width: 0;
    }

    .content {
        flex: 1 0 0;
        height: 0;
        overflow: auto;
        padding: 0 10px;
    }

    .aside-collapse {
        width: 0;
    }

    .aside-shadow {
        box-shadow: 3px 7px 15px rgba(74, 83, 97, 0.8);
    }
</style>