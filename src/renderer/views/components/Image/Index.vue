<script setup lang="ts" name="ImageView">
import { ref } from 'vue'
const props = withDefaults(defineProps<{ src: string; fit?: "fill" | "cover" | "contain" | "none" | "scale-down"; loading?: boolean }>(), {
	src: '',
	fit: 'cover',
	loading: true
})
const imageLoad = ref<boolean>(props.loading)
const closeLoad = () => (imageLoad.value = false)
</script>

<template>
	<el-image v-loading="imageLoad" class="container-image" :src="src" :fit="fit" @load="closeLoad" @error="closeLoad">
		<template #error>
			<i-ep-picture class="image-slot" />
		</template>
	</el-image>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
