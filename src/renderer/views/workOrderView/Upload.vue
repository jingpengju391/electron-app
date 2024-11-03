<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { SvgIcon } from '@components'
import { process, isMac } from '@hooks/api'
import { ImageView } from '@components'
import { electronAPI } from '@hooks/api'
import { ScreenData } from '@shared/index'
import { useWorkOrder } from '@stores'
import message from '@shared/dataModelConfig/message'
import { PointPartialDischarge } from '@shared/dataModelTypes/partialDischarge'
// import type { UploadProps } from 'element-plus'

const dialogVisible = ref<boolean>(false)
const clipboardContent = ref<string>('')
const hidePreview = computed(() => !clipboardContent.value)
const workOrder = useWorkOrder()
const currentPartialDischarge = computed<PointPartialDischarge | undefined>(() => workOrder.$state.currentPartialDischarge)
const files = computed<string[]>(() => currentPartialDischarge.value?.files || [])
const currentIndex = ref<number>(0)

const openScreenshot = async () => {
	if (clipboardContent.value || !currentPartialDischarge.value) return
	if (files.value.length >= 5) {
		ElMessage({
			message: message.order.exceedingQuantity,
			type: 'warning',
			plain: true,
			grouping: true
		})
		return
	}

	if(isMac){
		ElMessage({
			message: message.order.shotMac,
			type: 'warning',
			plain: true,
			grouping: true
		})
		return
	}
	process.minimize()
	const screenData = await process.desktopCapturer()
	await process.screenshot({
		src: screenData,
		screenshotStatus: true
	})
}

const rehandlerUpload = async (index: number) => {
	currentIndex.value = index
}

const handlerUpload = async () => {
	const tempFiles: string[] = [...files.value]
	tempFiles[currentIndex.value] = clipboardContent.value
	await workOrder.updatedCurrentPartialDischarge({
		...currentPartialDischarge.value!,
		files: tempFiles,
		file: clipboardContent.value
	})

	await process.uploadPartialDischargeListData(JSON.stringify(currentPartialDischarge.value!))
	clipboardContent.value = ''
	rehandlerUpload(files.value.length)
}

electronAPI.receive('shotcuts-control-shift-x', async () => openScreenshot())
electronAPI.receive('window-shot-param-params', async (params: ScreenData) => {
	process.restore()
	clipboardContent.value = params.src
})

watch(
	() => currentPartialDischarge.value?.workDetailId,
	() => {
		rehandlerUpload(files.value.length)
	},
	{ immediate: true }
)


// const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
//   console.log(uploadFile, uploadFiles, 555)
// }
</script>

<template>
	<div class="container">
		<div class="container-top">
			<h3>检测图谱上传</h3>
			<div class="upload-box">
				<div class="upload-box-way">
					<div :class="hidePreview ? 'clipboard-box active' : 'clipboard-box'" @click="openScreenshot">
						<svg-icon v-if="hidePreview" color="#0d867f" size="50" name="jianqie" />
						<el-text v-if="hidePreview" class="mx-1 text-overflow-one" type="info">单击 / control + shift + x</el-text>
						<div v-else class="upload-box-preview" :style="{ backgroundImage: `url(${clipboardContent})` }">
							<div class="upload-box-preview-tools">
								<i-ep-upload-filled @click.stop="handlerUpload" />
								<i-ep-delete @click.stop="clipboardContent = ''" />
							</div>
						</div>
					</div>
					<!-- <el-upload
						class="upload-choose"
						action="#"
						drag
						multiple
						:limit="2"
						:auto-upload="false"
						:show-file-list="false"
						:on-change="handleChange"
					>
						<svg-icon color="#0d867f" size="50" name="jianqie" />
						<div class="el-upload__text">
							<el-text class="mx-1 text-overflow-one" type="info">单击 / 拖拽</el-text>
						</div>
					</el-upload> -->
				</div>
				<el-text class="mx-1 text-overflow-one" type="info">{{ message.order.exceedingQuantity }}</el-text>
			</div>
		</div>
		<div class="container-btm">
			<h3>检测图谱上传</h3>
			<div class="img-list">
				<div v-for="(item, index) in files" :key="index" class="img-list-box">
					<image-view class="img-list-box-item" :src="item" :preview-src-list="[item]" :loading="!item" />
					<el-button :disabled="currentIndex === index" type="primary" @click="rehandlerUpload(index)">重测</el-button>
				</div>
				<el-empty v-if="!files.length" class="empty-box" :description="message.noData" />
			</div>
		</div>
	</div>
	<el-dialog v-model="dialogVisible">
		<img w-full :src="clipboardContent" alt="Preview Image" />
	</el-dialog>
</template>
<style scoped lang="scss">
@use './scss/upload.scss';
</style>
