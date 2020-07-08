import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import axios from 'axios'

// Vue.filter("convertToDate", function (value, type = "date") {
//     if (value) {
//         if (type === 'date') {
//             return moment(value).format('YYYY-MM-DD');
//         }
//         if (type === 'datetime') {
//             return moment(value).format('YYYY-MM-DD HH:mm:ss');
//         }
//     } else {
//         return ""
//     }
// });
// 添加请求头拦截  在请求头中加token
// axios.interceptors.request.use(config => {
//     // Do something before request is sent
//     if (localStorage.getItem('token')) {
//         config.headers.token = localStorage.getItem('token');
//     }
//     return config;
// }, error => {
//     // Do something with request error
//     return Promise.reject(error);
// });

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')