<script setup lang="ts">
import { ref } from 'vue'
const props = withDefaults(defineProps<{ currentData: any | undefined, index: number, isLast: boolean }>(), {
    currentData: undefined,
    index: 0,
    isLast: true
})
const imageLoad = ref<boolean>(true)
const closeLoad = () => (imageLoad.value = false)

const handlerCurrentWorkOrder = () => {
    console.log(props.currentData, 9999)
}

</script>
<template>
    <div :class="{ paddingBottom: !isLast }" @click="handlerCurrentWorkOrder">
        <div :class="{ container: true, active: index===3 }">
            <el-image class="container-image" 
                src="https://picsum.photos/200/300" 
                @load="closeLoad"  
                @error="closeLoad" 
                fit="cover" 
                v-loading="imageLoad">
                <template #error>
                    <i-ep-picture class="image-slot"/>
                </template>
            </el-image>
            <div class="container-right">
                <aside>
                    <el-text class="title">Default</el-text>
                    <el-text class="status">Default</el-text>
                </aside>
                <aside>
                    <el-text class="position">Default</el-text>
                    <el-text class="number">Default</el-text>
                </aside>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@use './scss/order-item.scss'
</style>