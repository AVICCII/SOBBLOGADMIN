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

        </div>
    </div>
</template>

<script>

    import * as dateUtils from '../../utils/date'
    import * as api from "../../api/api";

    export default {

        data() {
            return {
                loading: false,
                loops: []
            }
        },
        methods: {
            edit(item) {
                console.log(item)
            },
            deleteItem(item) {
                console.log(item)
            },
            formatDate(dateStr) {
                let date = new Date(dateStr)
                return dateUtils.formatDate(date, 'yyyy-MM-dd:hh:mm:ss')
            },
            showAddLoop() {

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
        },
        mounted() {
            this.listLoop()
        }
    }
</script>

<style>
    .loop-image{
        width: 180px;
        height: 80px;
        padding: 4px;
        border-radius: 4px;
        border: #EDEDED solid 1px;
    }

    .loop-title {
        text-decoration: none;
    }
</style>