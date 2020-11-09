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
                        <el-button type="primary" size="mini" @click="resetPassword(scope.row)">重置密码</el-button>
                        <!--加密部分p55后续做-->
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
        <div class="page-navigation-box margin-bottom clearfix">
            <el-pagination
                    class="user-list-page-navigation-bar"
                    background
                    @current-change="onPageChange"
                    :current-page="pageNavigation.currentPage"
                    :page-size="pageNavigation.pageSize"
                    layout="prev, pager, next"
                    :total="pageNavigation.totalCount">
            </el-pagination>
        </div>
        <div class="user-list-dialog-show">
            <el-dialog
                    title="删除提示"
                    :visible.sync="deleteDialogShow"
                    width="400px">
                <span>你确定要删除{{deleteUserName}}这个用户吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="danger" @click="deleteDialogShow = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="doDeleteItem">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                    title="密码修改"
                    :visible.sync="resetPasswordShow"
                    width="400px">
                <div class="reset-password-box">
                    <div class="reset-tips-text">修改{{targetResetUserName}}的密码:</div>
                    <el-form label-width="85px" size="medium" >
                        <el-form-item label="新密码" prop="pass">
                            <el-input type="password" v-model="resetPasswordValue" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="danger" @click="resetPasswordShow = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="doResetPassword">确 定</el-button>
                </span>
            </el-dialog>
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
                    totalCount: 0,
                    pageSize: 2
                },
                deleteDialogShow: false,
                deleteUserName: '',
                targetDeleteUserId: '',
                resetPasswordShow: false,
                resetPasswordValue: '',
                targetResetUserName: ''
            }
        },
        methods: {
            doResetPassword() {

            },
            doDeleteItem() {
                //去删除用户
                this.deleteDialogShow = false
                api.deleteUserById(this.targetDeleteUserId).then(result => {
                    if (result.code === api.success_code) {
                        this.$message.success(result.message)
                        this.listUsers()
                    } else {
                        this.$message.error(result.message)
                    }
                })
                //处理结果
            },
            onPageChange(page) {
                this.pageNavigation.currentPage = page
                this.listUsers()
            },
            //这里写dosearch方法时注意  this.handleUserListResult(result) 已经被抽取

            deleteItem(item) {
                this.targetDeleteUserId = item.id
                this.deleteUserName = item.userName
                this.deleteDialogShow = true
            },
            resetPassword(item) {
                this.resetPasswordShow = true
                this.targetResetUserName = item.userName

            },
            listUsers() {
                api.listUsers(this.pageNavigation.currentPage, this.pageNavigation.pageSize).then(result => {
                    this.handleUserListResult(result)
                });
                this.loading = true
            },
            formatDate(dateStr) {
                let date = new Date(dateStr)
                return dateUtils.formatDate(date, 'yyyy-MM-dd:hh:mm:ss')
            },
            handleUserListResult(result) {
                if (result.code === api.success_code) {
                    this.userList = result.data.content;
                    this.pageNavigation.currentPage = result.data.number + 1;
                    this.pageNavigation.totalCount = result.data.totalElements;
                    this.pageNavigation.pageSize = result.data.size;
                } else {
                    this.$message.error(result.message);
                }
                console.log(this.pageNavigation)
                this.loading = false
            }

        },
        mounted() {
            this.listUsers()
        }
    }
</script>

<style>

    .user-list-page-navigation-bar {
        margin-right: 50px;

    }

    .reset-tips-text{
        margin-left: 30px;
        margin-bottom: 20px;
    }
</style>