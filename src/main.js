import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import leftMenu from './layout/left-menu'
import topHeader from './layout/top-header'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('leftMenu',leftMenu)
Vue.component('topHeader',topHeader)
import {checkToken} from "./api/api";

router.beforeEach((to,from,next) =>{
  //如果是登录界面，需要放行
  if (to.path === '/login') {
    next()
  }else{
    //否则检测用户角色
    checkToken().then(result => {

      if (result.code === 10000){
        //如果是管理员，放行
        if (result.data.role === 'role_admin'){
          next()
        }else{
          //如果是普通用户，跳转到门户首页
          // location.href = 'https://www.sunofbeach.net'
        }
      }else{
        next({
          path: '/login'
        })
      }
    })

  }
  console.log(to)
  console.log(from)
  console.log(next)
  next()
})

new Vue({
  router,
  render: h => h(App), // render:渲染app
}).$mount('#app')
