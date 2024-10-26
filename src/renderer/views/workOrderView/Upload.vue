<script setup lang="ts">
import { process } from '@hooks/api'

const open = async () => {
    const aaa = await process.desktopCapturer()
    console.log(aaa, 777)
    await process.screenshot(true)
}
const close = async () => {
    await process.screenshot(false)
}
</script>

<template>
    <div class="container">
        <div class="container-top">
            <h3 @click="open">检测图谱上传</h3>
            <el-upload class="upload-box" drag>
                <i-ep-upload-filled />
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                    jpg/png files with a size less than 500kb
                    </div>
                </template>
            </el-upload>
        </div>
        <div class="container-btm">
            <h3 @click="close">检测图谱上传</h3>
            <div class="img-list">
                <div class="img-list-box">
                    <el-image class="img-list-box-item" src="https://picsum.photos/200/300" fit="cover" />
                    <el-button type="primary" size="large">重测</el-button>
                </div>
                <div class="img-list-box">
                    <el-image class="img-list-box-item" src="https://picsum.photos/200/300" fit="cover" />
                    <el-button type="primary" size="large">重测</el-button>
                </div>
                <div class="img-list-box">
                    <el-image class="img-list-box-item" src="https://picsum.photos/200/300" fit="cover" />
                    <el-button type="primary" size="large">重测</el-button>
                </div>
                <div class="img-list-box">
                    <el-image class="img-list-box-item" src="https://picsum.photos/200/300" fit="cover" />
                    <el-button type="primary" size="large">重测</el-button>
                </div>
                <div class="img-list-box">
                    <el-image class="img-list-box-item" src="https://picsum.photos/200/300" fit="cover" />
                    <el-button type="primary" size="large">重测</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@use './scss/upload.scss'
</style>