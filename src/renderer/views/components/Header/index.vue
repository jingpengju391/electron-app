<script setup lang="ts">
import { computed } from 'vue'; 'vue'
import { useWindowStore } from '@stores'
import { process } from '@hooks/api'
import { SvgIcon } from '@components'

const windowStore = useWindowStore()
const minimize = computed(() => windowStore.$state.minimize)

// const getSignalLevel = score => score === 0 ? 0 : Math.ceil(score / 20)
const handleMize = () => {
    minimize.value ? process.maximize() : process.restore()
    windowStore.updatedMinimize()
}

</script>

<template>
    <div class="container">
        <i-ep-close class="margin close" color="#0d867f" @click="process.close" />
        <svg-icon class="margin" color="#0d867f" size="38" :name="minimize ? 'maximize' : 'restore'" @click="handleMize"/>
        <svg-icon class="margin" color="#0d867f" name="suoxiao" @click="process.minimize"/>
        <!-- <div class="margin upload">
            <i class="upload-icon"></i>
            <span>14</span>
        </div>
        <svg-icon class="margin wifi" :name="`wifi_${ getSignalLevel(42) }`"/>
        <div class="margin mobile">
            <svg-icon :name="`mobile_${ getSignalLevel(52) }`"/>
            <span>WAPI</span>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
@use "./header.scss"
</style>