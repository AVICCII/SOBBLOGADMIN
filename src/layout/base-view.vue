<template>
    <!--显示我们的内容--><div>
    <el-container>
        <el-header id="admin-header-box">顶部内容</el-header>
        <el-container>
            <el-aside id="left-menu-list-box" width="200px">
    <left-menu/>
            </el-aside>
            <el-container>
                <el-main>
                    <div class="content">
                        <router-view/>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</div>

</template>

<script>

    export default {
        mounted() {
            //动态设置侧边菜单高度
            let leftMenuBox = document.getElementById('left-menu-list-box')
            let adminHeaderBox = document.getElementById('admin-header-box')
            console.log(adminHeaderBox.offsetHeight)
            let dy = window.innerHeight - adminHeaderBox.offsetHeight
            if(leftMenuBox && adminHeaderBox){
                leftMenuBox.style.height = dy+'px'
            }
        }
    }

</script>

<style >
    .el-header, .el-footer {
        background-color: dodgerblue;
        color: #333;
        text-align: center;
        line-height: 60px;
        height: 60px !important;
    }
    .el-aside {
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
</style>