<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { searchTypeOption, searchLevelOption, searchStatusOption } from './hook/search'
import { useWorkOrder } from '@stores'

const searchNameValue = ref<string | undefined>(undefined)
const searchTypeValue = ref<string | undefined>(undefined)
const searchLevelValue = ref<string | undefined>(undefined)
const searchStatusValue = ref<number | undefined>(undefined)

const workOrder = useWorkOrder()
const filterValue = () => {
	workOrder.updatedFilter({
		filterName: searchNameValue.value,
		filterType: searchTypeValue.value,
		filterLevel: searchLevelValue.value,
		filterStuts: searchStatusValue.value
	})
}
</script>

<template>
	<div class="container">
		<el-input v-model="searchNameValue" size="large" placeholder="设备名称" :prefix-icon="Search" clearable @clear="filterValue" />
		<el-select v-model="searchTypeValue" placeholder="设备类型" size="large" clearable @clear="filterValue">
			<el-option v-for="item in searchTypeOption" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<el-select v-model="searchLevelValue" placeholder="电压等级" size="large" clearable @clear="filterValue">
			<el-option v-for="item in searchLevelOption" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<el-select v-model="searchStatusValue" placeholder="检测状态" size="large" clearable @clear="filterValue">
			<el-option v-for="item in searchStatusOption" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<el-button type="primary" size="large" @click="filterValue">查询</el-button>
	</div>
</template>
<style scoped lang="scss">
@use './scss/search.scss';
</style>
