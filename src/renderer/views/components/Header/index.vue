<script setup lang="ts">
import { computed, ref } from 'vue'
;('vue')
import { useWindowStore } from '@stores'
import { process } from '@hooks/api'
import { SvgIcon } from '@components'
import { getNetWorkInfo } from '@utils/netWork'

const windowStore = useWindowStore()
const minimize = computed(() => windowStore.$state.minimize)

const netInfo = ref<NetworkInformationMode>({ type: '无服务', rtt: 0, downlink: 0 })

// const getSignalLevel = (score: number) => Math.min(score === 0 ? 0 : Math.ceil(score / 20), 5)
const signal = computed<number>(() => {
	if (!netInfo.value.rtt) return 0
	return {
		['2g']: 3,
		['3g']: 4,
		['4g']: 5,
		['slow-2g']: 1,
		['无服务']: 0
	}[netInfo.value.type]
})

const handleMize = () => {
	minimize.value ? process.maximize() : process.restore()
	windowStore.updatedMinimize()
}

const updateWithNetWork = () => (netInfo.value = getNetWorkInfo())

updateWithNetWork()
window.addEventListener('online', updateWithNetWork)
window.addEventListener('offline', updateWithNetWork)
navigator.connection?.addEventListener('change', updateWithNetWork)
</script>

<template>
	<div class="container">
		<i-ep-close class="margin close" color="#0d867f" @click="process.close" />
		<svg-icon
			class="margin"
			color="#0d867f"
			size="38"
			:name="minimize ? 'maximize' : 'restore'"
			@click="handleMize"
		/>
		<svg-icon
			class="margin minimize"
			color="#0d867f"
			name="suoxiao"
			@click="process.minimize"
		/>
		<!-- <div class="margin upload">
            <i class="upload-icon"></i>
            <span>14</span>
        </div> -->
		<!-- <svg-icon class="margin wifi" :name="`wifi_${ getSignalLevel(42) }`"/> -->
		<div class="margin mobile">
			<svg-icon :name="`mobile_${signal}`" />
			<span>{{ netInfo.type.toUpperCase() }}</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use './header.scss';
</style>
