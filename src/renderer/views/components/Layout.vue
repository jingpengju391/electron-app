<script setup lang="ts" name="layout">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Header } from '@components'

const route = useRoute()
const cachedComponents = computed(() => {
	const componentName = route.meta.keep ? (route.name as string) : null
	return componentName ? [componentName] : []
})
</script>

<template>
	<Header v-if="route.name !== 'shot'" />
	<router-view v-slot="{ Component }">
		<keep-alive :include="cachedComponents">
			<component :is="Component" />
		</keep-alive>
	</router-view>
</template>
