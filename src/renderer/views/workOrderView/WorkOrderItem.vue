<script setup lang="ts">
import { ImageView } from '@components'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props = withDefaults(defineProps<{ currentData: any | undefined; index: number; isLast: boolean }>(), {
	currentData: undefined,
	index: 0,
	isLast: true
})

const handlerCurrentWorkOrder = () => {
	console.log(props.currentData, 9999)
}
</script>
<template>
	<div :class="{ paddingBottom: !isLast }" @click="handlerCurrentWorkOrder">
		<div :class="{ container: true, active: index === 3 }">
			<image-view class="container-image" src="https://picsum.photos/200/300" />
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
@use './scss/order-item.scss';
</style>
