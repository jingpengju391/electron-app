<script setup lang="ts" name="ScreenShot">
import { ref } from 'vue'
import { process } from '@hooks/api'
import { electronAPI } from '@hooks/api'
import { ScreenData } from '@shared/index'

const imageInfo = ref<string>('')
const screenshotStatus = ref<boolean>(false)

const getImg = async function (src: string) {
	await process.screenshotImage({
		src,
		screenshotStatus: false
	})
}

const destroyComponent = async function (status: boolean) {
	screenshotStatus.value = status
	await process.screenshot({
		src: '',
		screenshotStatus: false
	})
}

electronAPI.receive('window-shot-param', (param: ScreenData) => {
	imageInfo.value = param.src
	screenshotStatus.value = param.screenshotStatus
})
</script>

<template>
	<div class="screen-shot-container" :style="{ backgroundImage: `url(${imageInfo})` }">
		<screen-short v-if="screenshotStatus" :write-base64="false" @destroy-component="destroyComponent" @get-image-data="getImg"></screen-short>
	</div>
</template>
<style scoped lang="scss">
@use './index.scss';
</style>
<style lang="scss">
#toolPanel {
	height: auto !important;
}
</style>
