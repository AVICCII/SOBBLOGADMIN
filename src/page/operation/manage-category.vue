<template>
    <div class="category-box">
        <div class="category-action-bar">
            <el-button type="primary" size="medium" @click="showAddCategory">添加分类</el-button>
        </div>
        <div class="category-list-box">
            <el-table
                    v-loading="loading"
                    :data="categories"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="categoryName"
                        label="名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="categoryPy"
                        label="拼音"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="描述">
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status==='0'">
                            <el-tag type="danger" size="medium">已删除</el-tag>
                        </div>
                        <div v-if="scope.row.status==='1'">
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
                        <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
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
        <div class="category-dialog-box">
            <el-dialog
                    :close-on-press-escape = "false"
                    :close-on-click-modal="false"
                    title="删除提示"
                    :visible.sync="deleteDialogShow"
                    width="400px">
                <span>你确定要删除{{deleteMessage}}这个分类吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="danger" @click="deleteDialogShow = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="doDeleteItem">确 定</el-button>
                </span>
            </el-dialog>
            <!--添加分类的dialog-->
            <el-dialog
                    :title="editTitle"
                    :visible.sync="editDialogShow"
                    width="400px">
                <div class="category-editor-box">
                    <el-form  label-width="80px">
                        <el-form-item label="分类名称" size="mini">
                            <el-input v-model="category.categoryName"></el-input>
                        </el-form-item>
                        <el-form-item label="分类拼音">
                            <el-input v-model="category.categoryPy"></el-input>
                        </el-form-item>
                        <el-form-item label="顺序">
                            <el-input-number v-model="category.order" :min="1" :max="100" label="描述文字"></el-input-number>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="category.status" placeholder="请选择状态">
                                <el-option label="已删除" value="0"></el-option>
                                <el-option label="正常" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="category.description"
                                      type="textarea"
                                      :row="2"
                                      maxlength="128"
                                      resize="false"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogShow = false" size="medium" type="danger">取 消</el-button>
                <el-button  @click="postCategory"  size="medium" type="primary">{{editCommitText}}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import * as api from "../../api/api";
    import * as dateUtils from '../../utils/date'

    export default {
        data() {
            return {
                loading:false,
                editDialogShow: false,
                editTitle:'编辑分类',
                editCommitText:'修改分类',
                categories: [],
                deleteDialogShow: false,
                deleteMessage: '',
                deleteTargetId: '',
                category:{
                    categoryName: '',
                    id: '',
                    description: '',
                    order: 1,
                    categoryPy: '',
                    status: '1'
                }
            }
        },
        methods: {
            edit(item) {
                //赋值 最好的做法是请求单个数据，再显示
                //显示dialog
                this.category.categoryName = item.categoryName
                this.category.categoryPy = item.categoryPy
                this.category.description = item.description
                this.category.order = item.order
                this.category.id = item.id
                this.category.status = item.status
                // console.log(item)
                this.editDialogShow = true
                this.editCommitText = '修改分类'
                this.editTitle = '编辑分类'
            },

            deleteItem(item) {
                //不是立马删除，而是给出警告提示
                this.deleteDialogShow = true
                this.deleteMessage = item.name
                this.deleteTargetId = item.id
                console.log(item)
            },
            formatDate(dateStr) {
                let date = new Date(dateStr)
                return dateUtils.formatDate(date, 'yyyy-MM-dd:hh:mm:ss')
            },
            doDeleteItem() {
                api.deleteCategoryById(this.deleteTargetId).then(result => {
                    if (result.code === api.success_code) {
                        this.$message({
                            type: 'success',
                            center: true,
                            message: result.message
                        })
                        this.listCategories()
                    }
                })
                this.deleteDialogShow = false
            },
            listCategories() {
                this.loading=true
                //去获取分类的列表
                api.listCategories().then(result => {
                    this.loading=false
                    console.log(result)
                    if (result.code === api.success_code) {
                        this.categories = result.data
                    }
                })
            },
            showAddCategory() {
                this.editTitle = '添加分类'
                this.editDialogShow = true
                this.editCommitText = '添 加'
            },
            postCategory(){
                //检查内容
                if (this.category.categoryName === '') {
                    console.log(this.category.categoryName==='')
                    this.showWarning('分类名称不能为空')
                    return
                }

                if (this.category.description === '') {
                    this.showWarning('分类描述不能为空')
                    return
                }

                if (this.category.categoryPy === '') {
                    this.showWarning('分类拼音不能为空')
                    return
                }
                //如果有ID的就是更新
                //如果没有ID就是添加
                if(this.category.id === ''){
                    //提交数据
                    api.postCategory(this.category).then(result =>{
                        this.editDialogShow = false
                        console.log(result)
                        if (result.code ===api.success_code){
                            this.$message({
                                message: '添加成功',
                                center: true,
                                type: 'success'
                            })
                            //刷新列表
                            this.listCategories()
                            //重置数据
                            this.resetCategory()
                        }else {
                            this.showWarning(result.message)
                        }
                    })
                }else{
                    api.updateCategory(this.category.id,this.category).then(result =>{
                        this.editDialogShow = false
                        if (result.code ===api.success_code){
                            console.log("ssss")
                            this.$message.success('更新成功')
                            this.listCategories()
                            this.resetCategory()
                        }else{
                            this.$message.error(result.message)
                        }
                    })
                }

                //提示结果
                console.log(this.category.categoryName)
            },
            showWarning(msg){
                this.$message({
                    message: msg,
                    type: 'warning',
                    center: true
                })
            },
            resetCategory(){
                this.category.categoryName='';
                this.category.categoryPy='';
                this.category.description='';
                this.category.order=1;
                this.category.status='1';
                this.category.id='';
            }
        },
        mounted() {
            this.listCategories()
        }
    }
</script>
<style>
    .category-list-box .cell {
        text-align: center;
    }
    .category-list-box .el-table {
        min-height: 300px;
    }
</style>