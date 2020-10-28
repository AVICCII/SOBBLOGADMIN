import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)



/* 导入的内容 */
const home = () => import("@/components/home")
const article = () => import("@/components/article")
/* 登陆页面 */
const login = () => import("@/page/login/login")
/* 内容部分 */
const ArticleManage = () => import("@/page/content/manage-article")
const postArticle = () => import("@/page/content/post-article")
const imageManage = () => import("@/page/content/manage-image")
const commentManage = () => import("@/page/content/manage-comment")
/* 首页 */
const index = () => import("@/page/dashboard/index")
/* 运营 */
const categoryManage = () => import("@/page/operation/manage-category")
const loopManage = () => import("@/page/operation/loop")
/* 设置 */
const friendLink = () => import("@/page/settings/friend-link")
const webSizeInfo = () => import("@/page/settings/websize-info")
/* 用户 */
const email = () => import("@/page/user/email")
const info = () => import("@/page/user/info")
const list = () => import("@/page/user/list")
const resetPassword = () => import("@/page/user/reset-password")

//路由器
const routes = [
    {path:'/home',component:home},
    {path:'/article',component:article}
]

const router = new VueRouter({
    routes //相当于routes:routes
})

export default router