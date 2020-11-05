<template>
    <div class="user-list-box">
        <!--        搜索部分-->
        <div class="user-search-pat">

        </div>
        <div class="list-box">
            <el-table
                    v-loading="loading"
                    :data="userList"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="用户邮箱"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="头像"
                        width="100">
                    <template slot-scope="scope">
                        <el-avatar size="medium" :src="scope.row.avatar"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column
                        label="签名"
                        width="240">
                    <template slot-scope="scope">
                        <div v-if="scope.row.sign">
                            <span v-text="scope.row.sign"></span>
                        </div>
                        <div v-else>
                            <span>这个人很懒,什么也没有写</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.state==='0'">
                            <el-tag type="danger" size="medium">已删除</el-tag>
                        </div>
                        <div v-if="scope.row.state==='1'">
                            <el-tag type="success" size="medium">正常</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="创建日期"
                        width="200">
                    <template slot-scope="scope">
                        <span v-text="formatDate(scope.row.createTime)">
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        class="category-update-time"
                        label="更新日期"
                        width="200">
                    <template slot-scope="scope">
                        <span v-text="formatDate(scope.row.updateTime)">
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="edit(scope.row)">重置密码</el-button>
                        <el-button type="danger" v-if="scope.row.status !=='0'" size="mini"
                                   @click="deleteItem(scope.row)">删除
                        </el-button>
                        <el-button type="danger" v-if="scope.row.status ==='0'" size="mini"
                                   @click="deleteItem(scope.row)" disabled>删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

    import * as api from "../../api/api"
    import * as dateUtils from '../../utils/date'


    export default {
        data() {
            return {
                loading: false,
                userList: [],
                pageNavigation: {
                    currentPage: 1,
                    totalPage: 1,
                    totalSize: 0,
                    pageSize: 5,
                }
            }
        },
        methods: {
            deleteItem(){

            },
            resetPassword(){

            },
            listUsers() {
                this.loading = true
                api.listUsers(this.pageNavigation.currentPage, this.pageNavigation.pageSize).then(result => {
                    if (result.code === api.success_code) {
                        this.userList = result.data.content;
                    } else {
                        this.$message.error(result.message);
                    }
                    this.loading =false
                });
            },
            formatDate(dateStr) {
                let date = new Date(dateStr)
                return dateUtils.formatDate(date, 'yyyy-MM-dd:hh:mm:ss')
            }
        },
        mounted() {
            this.listUsers()
        }
    }
</script>

<style scoped>

</style>