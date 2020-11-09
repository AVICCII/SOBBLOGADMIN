<template>
    <div class="setting-email-box">

                <el-form  label-width="100px" size="medium">
                    <el-form-item
                            prop="email"
                            label="新邮箱地址">
                        <el-input v-model="newEmail"></el-input>
                        <el-button v-if="!isCountDowning" type="primary" @click="getVerifyCode" class="email-get-verify-code-btn">获取验证码</el-button>
                        <el-button v-else type="primary" @click="getVerifyCode" class="email-get-verify-code-btn" disabled>
                            {{countDownText}}</el-button>
                    </el-form-item>
                    <el-form-item
                            label="验证码">
                        <el-input v-model="verifyCode" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateEmailAddress">修改邮箱</el-button>
                    </el-form-item>
                </el-form>


    </div>
</template>

<script>

    import * as api from "../../api/api"


    export default {
        data(){
            return{
                isCountDowning:false,
                newEmail: '',
                verifyCode: '',
                countDownText: ''
            }
        },
        methods:{
            getVerifyCode(){
                //第一步 校验邮箱格式是否正确
                let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
                if(!reg.test(this.newEmail)){
                    this.$message.error('邮箱地址格式错误')
                    return
                }
                //禁止按钮可以使用，并且开始倒计时
                let time = 60
                this.isCountDowning = true
                let that = this
                let interval = setInterval(function () {
                    time --;
                    if(time <=0){
                        this.isCountDowning = false
                        clearInterval(interval)
                    }
                    that.countDownText = '重新发送('+time+')'
                },1000);
                api.getVerifyCode(this.newEmail,'update').then(result =>{
                    //发起请求，获取验证码
                    console.log(result)
                    if (result.code ===api.success_code){

                        this.$message.success(result.message)
                    }else{
                        this.$message.error(result.message)

                    }
                })
            },
            updateEmailAddress(){

            }
        }
    }

</script>

<style>
.setting-email-box .el-input{
        max-width: 310px;
}

.email-get-verify-code-btn{
        margin-left: 20px;
}
    .setting-email-verify-code-input{
        width: 200px;
    }
</style>