<template>
    <div class="loop-box">
        <div class="loop-action-bar">
            <el-button type="primary" size="medium" @click="showAddLoop">添加轮播图</el-button>
        </div>
        <div class="loop-list-box">
            <el-table
                    v-loading="loading"
                    :data="loops"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        width="200">
                </el-table-column>
                <el-table-column
                        label="标题"
                        width="300">
                    <template slot-scope="scope">
                        <a class="loop-title" :href="scope.row.targetUrl" target="_blank">{{scope.row.title}}</a>
                    </template>
                </el-table-column>

                <el-table-column
                        label="轮播图"
                        width="200">
                    <template slot-scope="scope">
                        <el-image fit="fit" :src="scope.row.imageUrl" class="loop-image"></el-image>
                    </template>
                </el-table-column>

                <el-table-column
                        label="状态"
                        width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.state==='0'">
                            <el-tag type="danger" size="medium">不可用</el-tag>
                        </div>
                        <div v-if="scope.row.state==='1'">
                            <el-tag type="success" size="medium">正&nbsp;常</el-tag>
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
                        <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!---->
        <div class="loop-dialog-box">
            <el-dialog
                    :close-on-press-escape = "false"
                    :close-on-click-modal="false"
                    title="删除提示"
                    :visible.sync="deleteDialogShow"
                    width="400px">
                <span>你确定要删除{{deleteMessage}}这个轮播图吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="danger" @click="deleteDialogShow = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="doDeleteItem">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                    :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    :title="loopEditorTitle"
                    :visible.sync="loopDialogShow"
                    width="600px">
                <div>
                    <el-form  label-width="100px" size="medium" >
                        <el-form-item label="轮播图标题">
                            <el-input v-model="Looper.title"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转链接">
                            <el-input v-model="Looper.targetUrl"></el-input>
                        </el-form-item>
                        <el-form-item label="顺序">
                            <el-input v-model="Looper.order" :min="1" :max="100"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="Looper.state" >
                                <el-option label="不可用" value="0"></el-option>
                                <el-option label="正常" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                            <el-form-item label="封面">
                            <el-upload
                                    class="avatar-uploader"
                                    action="/admin/image"
                                    :show-file-list="false"
                                    :on-success="uploadSuccess"
                                    :before-upload="beforeUpload">
                                <img  v-if="Looper.imageUrl!== ''" :src="Looper.imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="onEditorClose" type="danger" size="medium">取 消</el-button>
                    <el-button  @click="handleLoopEditorCommit" type="primary" size="medium">{{loopEditorDialogCommitText}}</el-button>
                  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    import * as dateUtils from '../../utils/date'
    import * as api from "../../api/api";

    export default {

        data() {
            return {
                deleteDialogShow: false,
                loopEditorDialogCommitText: '添加',
                loopDialogShow: false,
                loopEditorTitle: '添加轮播图',
                loading: false,
                loops: [],
                Looper:{
                    id:'',
                    order:1,
                    state:'1',
                    title:'',
                    targetUrl:'',
                    imageUrl:''
                },
                deleteLooperId:'',
                deleteMessage:''
            }
        },
        mounted() {
            this.listLoop()
        },
        methods: {
            onEditorClose(){
                this.editorDialogShow = false
                this.resetCategory()
            },
            doDeleteItem(){
                api.deleteLoop(this.deleteLooperId).then(result =>{
                    if(result.code === api.success_code){
                        this.deleteDialogShow = false
                        this.$message.success(result.message)
                        this.listLoop()
                    }
                })
            },
            resetLoop(){
                this.Looper.id = '';
                this.Looper.order = 1;
                this.Looper.state = '1';
                this.Looper.title = '';
                this.Looper.targetUrl = '';
                this.Looper.imageUrl = '';
            },
            handleLoopEditorCommit(){
                //添加记录
                //检查数据
                if (this.Looper.title === ''){
                    this.$message.error('标题不可以为空')
                    return
                }
                if (this.Looper.targetUrl === ''){
                    this.$message.error('跳转链接不可以为空')
                    return
                }
                if (!this.Looper.targetUrl.startsWith('http://')&&!this.Looper.targetUrl.startsWith('https://')){
                    this.$message.error('目标链接错误')
                    return
                }

                if (this.Looper.imageUrl === ''){
                    this.$message.error('轮播图不可以为空')
                    return
                }
                //判断是更新还是添加
                //如果有id就更新
                //否则就是添加
                if(this.Looper.id === ''){
                    //提交数据
                    api.postLoop(this.Looper).then(result=>{
                        this.loopDialogShow =false
                        if(result.code === api.success_code){
                            this.$message.success(result.message)
                            //更新列表
                            this.resetLoop()
                            this.listLoop()
                        }else{
                            this.$message.error(result.message)
                        }
                    })
                }else {
                    //更新
                    api.updateLooper(this.Looper.id,this.Looper).then(result =>{
                        if (result.code === api.success_code){
                            this.loopDialogShow = false
                            this.listLoop()
                            this.resetLoop()
                            this.$message.success(result.message)
                        }else{
                            this.$message.error(result.message)
                        }
                    })
                }

            },
            beforeUpload(){

            },
            //上传成功
            uploadSuccess(response){
                console.log(response)
                if (response.code === api.success_code){
                    //回显图片
                    this.Looper.imageUrl = 'http://localhost:2020/portal/image/'+response.data.path
                    this.$message.success(response.message);
                }else {
                    this.$message.error(response.message);
                }
            },
            edit(item) {
                //数据回显
                this.loopEditorDialogCommitText='修改'
                this.loopDialogShow = true
                this.loopEditorTitle='修改轮播图'
                this.Looper.id = item.id
                this.Looper.order = item.order
                this.Looper.state = item.state
                this.Looper.title = item.title
                this.Looper.targetUrl = item.targetUrl
                this.Looper.imageUrl = item.imageUrl
            },
            deleteItem(item) {
                this.deleteMessage = item.title
                this.deleteLooperId = item.id
                //通过id来删除链接
                this.deleteDialogShow = true
            },
            formatDate(dateStr) {
                let date = new Date(dateStr)
                return dateUtils.formatDate(date, 'yyyy-MM-dd:hh:mm:ss')
            },
            showAddLoop() {
                this.loopDialogShow = true
            },
            listLoop() {
                this.loading = true
                api.listLoop().then(result => {
                    this.loading = false
                    if (result.code === api.success_code) {
                        this.loops = result.data
                    }
                })
            }
        }
    }
</script>

<style>
    .loop-image {
        width: 180px;
        height: 80px;
        padding: 4px;
        border-radius: 4px;
        border: #EDEDED solid 1px;
    }

    .loop-title {
        text-decoration: none;
    }

    .loop-dialog-box .avatar-uploader .avatar-uploader-icon{
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        border: #8c939d dashed 1px;
        border-radius: 4px;
        text-align: center;
    }

    .loop-dialog-box .el-upload img{
        width: 178px;
        border-radius: 4px;
        height: 178px;
    }

</style>