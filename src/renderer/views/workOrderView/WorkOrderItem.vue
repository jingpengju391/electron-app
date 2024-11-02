<script setup lang="ts">
import { ImageView } from '@components'
import { PointPartialDischarge } from '@shared/dataModelTypes/partialDischarge'
import { useWorkOrder } from '@stores'

const props = withDefaults(defineProps<{ item: PointPartialDischarge | undefined; currentData: PointPartialDischarge | undefined; index: number; isLast: boolean }>(), {
	item: undefined,
	currentData: undefined,
	index: 0,
	isLast: true
})

const workOrder = useWorkOrder()

const handlerCurrentWorkOrder = () => {
	workOrder.updatedCurrentPartialDischarge(props.item)
}

const getAssetsFile = (name: string | undefined): string => new URL(`../../assets/svg/${name}.svg`, import.meta.url).href
</script>
<template>
	<div :class="{ paddingBottom: !isLast }" @click="handlerCurrentWorkOrder">
		<div :class="{ container: true, active: item?.workDetailId === currentData?.workDetailId }">
			<image-view class="container-image" :src="getAssetsFile(item?.deviceType)" :err-src="getAssetsFile('default_pic')" />
			<div class="container-right">
				<aside>
					<el-text class="title text-overflow-one">{{ item?.detectMethodCn }}</el-text>
					<el-text class="status text-overflow-one">{{ item?.files?.length ? '已完成' : '待上传' }}</el-text>
				</aside>
				<aside>
					<el-text class="position text-overflow-one">{{ item?.detectPositionName }}</el-text>
					<el-text class="number text-overflow-one">( {{ item?.files?.length || 0 }} )</el-text>
				</aside>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
@use './scss/order-item.scss';
</style>
