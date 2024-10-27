<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { searchNameValue, searchTypeValue, searchLevelValue, searchStatusValue, searchTypeOption, searchLevelOption, searchStatusOption } from './hook/search'
</script>

<template>
	<div class="container">
		<el-input v-model="searchNameValue" size="large" placeholder="设备名称" :prefix-icon="Search" clearable />
		<el-select v-model="searchTypeValue" placeholder="设备类型" size="large" clearable>
			<el-option v-for="item in searchTypeOption" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<el-select v-model="searchLevelValue" placeholder="电压等级" size="large" clearable>
			<el-option v-for="item in searchLevelOption" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<el-select v-model="searchStatusValue" placeholder="检测状态" size="large" clearable>
			<el-option v-for="item in searchStatusOption" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<el-button type="primary" size="large">查询</el-button>
	</div>
</template>
<style scoped lang="scss">
@use './scss/search.scss';
</style>
