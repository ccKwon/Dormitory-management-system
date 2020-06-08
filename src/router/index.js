import Vue from 'vue'
import Router from 'vue-router'

// import Home from "../views/Home.vue"

Vue.use(Router)

var router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: '/login',
            name: 'login',
            component: () => import("../views/login.vue"),

        },
        {
            path: '/main',
            name: 'main',
            redirect: '/main/system-index',
            component: () => import("../views/Home.vue"),
            meta: {
                Auth: true
            },
            // component:Home,
            children: [
                {
                    path: 'system-index',
                    name: 'system-index',
                    component: () => import("../views/system-index.vue")
                },
                {
                    path: 'student-manage',
                    name: 'student-manage',
                    component: () => import("../views/student-manage.vue")
                },
                {
                    path: 'dorm-manage',
                    name: 'dorm-manage',
                    component: () => import("../views/dormManage.vue")
                },
                {
                    path: 'building-manage',
                    name: 'building-manage',
                    component: () => import("../views/building.vue")
                },
                {
                    path: 'comein-manage',
                    name: 'comein-manage',
                    component: () => import("../views/assignStudent.vue")
                },
                {
                    path: "equ-submit",
                    name: "equ-submit",
                    component: () => import("../views/equsumbit.vue"),
                },
                {
                    path: "equ-resolve",
                    name: "equ-resolve",
                    component: () => import("../views/equrepairList.vue"),
                },
                {
                    path: "repairmen-manage",
                    name: "repairmen-manage",
                    component: () => import("../views/repairManage.vue")
                }
            ]
        }
    ]
})

const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

router.beforeEach((to, from, next) => {
    // 检测路由配置中是否有requiresAuth这个meta属性
    if (to.matched.some(record => record.meta.Auth)) {
      // 判断是否已登录
      if (localStorage.getItem("i")) {
        next();
        return;
      }    
      // 未登录则跳转到登录界面
      next('/login'); 
    } else {
      next() 
    }
  })

// router.beforeEach((to, from, next) => {
//     if (to.meta.Auth) {

//         let user = localStorage.getItem("username");
//         let flag = false;
//         if (user != null) {
//             flag = true;
//         } else {
//             flag = false;
//         }

//         if (flag) {
//             if (to.path === '/login') {
//                 // router.app.$store.dispatch("getuserInfo");
//                 next({ path: '/main' })
//             } else {
//                 next('/login')
//             }
//         }else {
//             next('/login')
//         }
//     } else {
//         next()
//     }

// })

export default router;