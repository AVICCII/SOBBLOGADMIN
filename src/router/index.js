import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)



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
/* 布局 */
const baseView = () => import("@/layout/base-view")
const rightView = () => import("@/layout/right-content")


//路由器
export const routes = [
    {path: '',
        component:baseView,
        redirect:'/index',
        children:[
            {
                path:"/index",
                name:'首页',
                icon:'el-icon-s-home',
                component:index
            },
            {
                path: '/content',
                name:'内容',
                icon: 'el-icon-document',
                hidden:false,
                component:rightView,
                children:[
                    {
                        path:'post-article',
                        icon: 'el-icon-document-add',
                        name:'发表文章',
                        hidden:false,
                        component:postArticle
                    },
                    {
                        path:'manage-article',
                        icon: 'el-icon-document-checked',
                        name:'文章管理',
                        hidden:false,
                        component:ArticleManage
                    },
                    {
                        path:'manage-image',
                        icon: 'el-icon-picture',
                        name:'图片管理',
                        hidden:false,
                        component:imageManage
                    },
                    {
                        path:'manage-comment',
                        icon: 'el-icon-chat-line-round',
                        name:'评论管理',
                        hidden:false,
                        component:commentManage
                    }
                ]
            },
            {
                path: '/user',
                icon: 'el-icon-user',
                name:'用户',
                hidden:false,
                component:rightView,
                children:[
                    {
                        path:'list',
                        icon: 'el-icon-s-custom',
                        name:'用户列表',
                        hidden:false,
                        component:list
                    },
                    {
                        path:'reset-password',
                        icon: 'el-icon-lock',
                        name:'密码重置',
                        hidden:false,
                        component:resetPassword
                    },
                    {
                        path:'email',
                        icon: 'el-icon-message',
                        name:'邮箱设置',
                        hidden:false,
                        component:email
                    },
                    {
                        path:'info',
                        icon: 'el-icon-user-solid',
                        name:'用户信息',
                        hidden:false,
                        component:info
                    }
                ]
            },
            {
                path: '/operation',
                icon: 'el-icon-more',
                name:'运营',
                hidden:false,
                component:rightView,
                children:[
                    {
                        path:'category',
                        icon: 'el-icon-more-outline',
                        name:'分类管理',
                        hidden:false,
                        component:categoryManage
                    },
                    {
                        path:'loop',
                        icon: 'el-icon-copy-document',
                        name:'轮播图管理',
                        hidden:false,
                        component:loopManage
                    }
                ]
            },
            {
                path: '/settings',
                icon: 'el-icon-setting',
                name:'设置',
                hidden:false,
                component:rightView,
                children:[
                    {
                        path:'friend-link',
                        icon: 'el-icon-sort',
                        name:'友情链接',
                        hidden:false,
                        component:friendLink
                    },
                    {
                        path:'web-size-info',
                        icon: 'el-icon-date',
                        name:'网站信息',
                        hidden:false,
                        component:webSizeInfo
                    }
                ]
            }
        ]
    },
    {
        path:'/login',
        component:login,
        requireLogin: false
    }
]

const router = new VueRouter({
    routes //相当于routes:routes
})

export default router