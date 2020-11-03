<template>
    <div class="admin-login-box">
        <!-- 后台的登录入口，只有登录，没有注册和找回密码 -->
        <!-- 只有门户一个用户入口，如果是管理员则跳转到管理中心 -->
        <!-- 顶部内容 -->
        <div class="admin-login-header-box">
            <div class="admin-login-header-center center">
                <div class="admin-login-logo">
                    博客系统登录模块
                </div>
            </div>
        </div>
        <!-- 中间内容 -->
        <div class="admin-login-center-box">
            <div class="center login-center-box">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form label-position="right" label-width="100px">
                            <el-form-item label="账号" required>
                                <el-input v-model="User.userName" placehoder="用户名/邮箱地址"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" required>
                                <el-input type="password" v-model="User.password" placehoder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="人类验证码" required>
                                <el-input v-model="loginInfo.verifyCode" placehoder="请输入右侧验证码" @keyup.enter.native="doLogin"></el-input>
                                <img :src="captchaPath" @click="updateVerifyCode" class="captcha_code">
                            </el-form-item>
                            <el-form-item class="login-buttion">
                                <el-button type="primary" @click="doLogin" size="small" > 登 录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>

                </el-row>

            </div>
        </div>
        <!-- 底部内容 -->
    </div>
</template>

<script>

import {doLogin,success_code} from "../../api/api";

export default {
        data() {
            return {
                User: {
                    userName: '',
                    password: ''
                },
                loginInfo: {
                    verifyCode: '',
                    captcha_key: '',
                    from: ''
                },
                captchaPath: '',
            }
        },
        methods: {
            toastE(msg) {
                this.$message({
                    message: msg,
                    center: true,
                    type: 'error'
                })
            },

            doLogin() {
                //发起登录
                //TODO：检查数据
                if (this.User.userName === '') {
                    this.toastE('账号不可为空')
                    return
                }

                if (this.User.password === '') {
                    this.toastE('密码不可为空')
                    return
                }

                if (this.loginInfo.verifyCode === '') {
                    this.toastE('验证码不可为空')
                    return
                }
                doLogin(this.loginInfo.verifyCode,this.loginInfo.captcha_key,this.User).then(result => {
                    console.log(result)
                    // 向服务器提交数据
                    // 处理登录结果
                    // 判断状态
                    if (result.code === success_code) {
                        this.$message({
                            message: result.message,
                            center: true,
                            type: 'success'
                        })
                        //如果是成功
                        //成功则跳转---->判断角色，如果是普通用户，跳转到门户首页，如果是管理员，跳转到管理中心
                        //其他，就给出提示
                        //TODO:需要判断角色
                        this.$router.push({path: '/index'})
                    } else {
                        //更新人类验证码
                        this.updateVerifyCode()
                        this.toastE(result.message)
                    }
                });
            },
            updateVerifyCode() {
                this.captchaPath = 'http://localhost:2020/user/captcha?captcha_key=' + this.loginInfo.captcha_key + "&random" + Date.parse(new Date());
            }

        },
        mounted() {
            //TODO:检查登录是否有效
            //如果已经登录了，跳转到对应的页面
            this.loginInfo.captcha_key = Date.parse(new Date());
            this.updateVerifyCode();
        }
    }
</script>

<style>

    .captcha_code {
        cursor: pointer;
        vertical-align: middle;
        margin-left: 10px;
        border: #E6E6E6 solid 1px;
        width: 120px;
        padding-left: 10px;
        padding-right: 10px;
        height: 42px;
    }

    .login-buttion {
        margin-bottom: 0px;
    }

    .admin-login-header-box {
        width: 100%;
        height: 60px;
        margin-bottom: 20px;
        background: dodgerblue;
    }

    .center {
        margin: 0 auto;
        width: 1140px;
    }

    .admin-login-header-center {
        line-height: 60px;
    }

    .admin-login-logo {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
    }

    .login-center-box .el-input {
        width: 200px;

    }

    .login-center-box {
        border-radius: 4px;
        padding: 20px;
        width: 1100px;
        background: #fff;
        box-shadow: 0 1px 10px #afafaf;
    }

    .login-center-box .el-form-item__label {
        border-left: #E6E6E6 solid 1px;
        border-top: #E6E6E6 solid 1px;
        border-bottom: #E6E6E6 solid 1px;
        background: #FBFBFB;
        text-align: center;
    }

    .login-center-box .el-input__inner {
        border: #E6E6E6 solid 1px;
        border-radius: 0;
        height: 42px;
    }
</style>