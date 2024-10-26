<script setup lang="ts">
import { onMounted, useTemplateRef, ref } from 'vue'
import WordSearch from './WordSearch.vue'
import WorkOrderItem from './WorkOrderItem.vue'
import { VirtualList } from '@components'
import Upload from './Upload.vue';
import { electronAPI } from '@hooks/api'
import { debounce } from '@/utils'

const containerOrderNode = useTemplateRef<HTMLDivElement | null>("containerOrder")
const height = ref<number>(0)

const setHeight = debounce(() => {
    height.value = containerOrderNode.value?.offsetHeight || 0
}, 500)

onMounted(() => { setHeight() })

electronAPI.receive('window-change-resize', setHeight)

const data = new Array(100000000)

</script>

<template>
    <h2 class="title">智能监测移动终端应用——某某工单——特高频检测-DMS（12/55）</h2>
    <word-search />
    <div class="container-order" ref="containerOrder">
        <virtual-list :list="data" width="450px" :height="height">
            <template  #default="{ item, index }">
                <work-order-item :currentData="item" :index="index" :isLast="index === data.length - 1"/>
            </template>
        </virtual-list>
        <upload />
    </div>
</template>
<style scoped lang="scss">
@use "./scss/index.scss";
</style>