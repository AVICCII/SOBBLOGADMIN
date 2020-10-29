<template>
    <div>
        <div class="content-title-box">右边内容</div>
        <div class="content-container-box">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "right-content"
    }
</script>

<style scoped>
    .content-container-box{
        padding: 10px;
    }
.content-title-box{
    padding: 10px;
    border-bottom: solid 1px #e6e6e6;
}
</style>