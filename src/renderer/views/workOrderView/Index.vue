<script setup lang="ts">
import { onMounted, useTemplateRef, ref } from 'vue'
import WordSearch from './WordSearch.vue'
import WorkOrderItem from './WorkOrderItem.vue'
import { VirtualList } from '@components'
import Upload from './Upload.vue'
import { electronAPI } from '@hooks/api'
import { debounce } from '@/utils'
import { useWorkOrder } from '@stores'
import { PointPartialDischargeList } from '@shared/dataModelTypes/partialDischarge'
import { handlerSearchOptionByPointPartialDischargeList } from './hook/search'

const workOrder = useWorkOrder()
const partialDischargeList = computed(() => workOrder.filterPartialDischargeList)
const partialLength = computed(() => workOrder.$state.partialDischargeList.length)
const currentPartialDischarge = computed(() => workOrder.$state.currentPartialDischarge)

const containerOrderNode = useTemplateRef<HTMLDivElement | null>('containerOrder')
const height = ref<number>(0)

const setHeight = debounce(() => {
	height.value = containerOrderNode.value?.offsetHeight || 0
}, 500)

onMounted(() => setHeight())

electronAPI.receive('window-change-resize', setHeight)
electronAPI.receive('receive-partial-discharge-list', (data: PointPartialDischargeList) => {
	workOrder.updatedPartialDischargeList(data)
	handlerSearchOptionByPointPartialDischargeList(data)
	if (!currentPartialDischarge.value) {
		workOrder.updatedCurrentPartialDischarge(partialDischargeList.value[0])
	}
})
</script>

<template>
	<h2 class="title text-overflow-one">
		智能监测移动终端应用 —— {{ partialDischargeList[0]?.workName }} —— {{ partialDischargeList[0]?.detectMethodCn }}（{{ workOrder.checkprogress }}/{{ partialLength }}）
	</h2>
	<word-search />
	<div ref="containerOrder" class="container-order">
		<virtual-list :list="partialDischargeList" width="450px" :height="height">
			<template #default="{ item, index }">
				<work-order-item :item="item" :current-data="currentPartialDischarge" :index="index" :is-last="index === partialDischargeList.length - 1" />
			</template>
		</virtual-list>
		<upload />
	</div>
</template>
<style scoped lang="scss">
@use './scss/index.scss';
</style>
