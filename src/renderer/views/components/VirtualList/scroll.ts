import { debounce } from '@/utils'
import { ClassNameVarType } from './type'
import { ref } from 'vue'
import performChunk from './poerformChunk'

let isFinishLoadData = false
let variableHeight = 0
let itemHeight = 0
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const currentRender = ref<any[]>([])

export async function initData<T>(arr: T[]) {
	currentRender.value.length = 0
	isFinishLoadData = false

	arr[0] && currentRender.value.push(arr[0])
	// view area height : variableHeight
	// scroll space in Y : scrollTop
	// document total list height : getScrollHeight
	const { container, containerItem } = getHeightAtEl()
	variableHeight = container
	itemHeight = containerItem
	const finishLoadDataNumber = currentRender.value.length
	// will reach bottom ?
	const isReachBottom = willReachBottom(finishLoadDataNumber, 0)
	if (!isReachBottom || isFinishLoadData) return
	const loadData = getWillLoadData(finishLoadDataNumber, 0, arr)
	currentRender.value.push(...loadData)
}

export const onScroll = debounce(<T>(scroll: { scrollLeft: number; scrollTop: number }, arr: T[]) => {
	const { scrollTop } = scroll
	// finish load data number
	const finishLoadDataNumber = currentRender.value.length
	// will reach bottom ?
	const isReachBottom = willReachBottom(finishLoadDataNumber, scrollTop)
	if (!isReachBottom || isFinishLoadData) return
	const loadData = getWillLoadData(finishLoadDataNumber, scrollTop, arr)
	performChunk(loadData, (item) => currentRender.value.push(item))
}, 100)

// get el height
function getHeightAtEl(): { container: number; containerItem: number } {
	const container = document.querySelectorAll(`.el-scrollbar.${ClassNameVarType.container}`)[0] as HTMLDivElement
	const containerItem = document.querySelectorAll(`.${ClassNameVarType.containerItem}`)[0] as HTMLDivElement
	return {
		container: container?.offsetHeight || 0,
		containerItem: containerItem?.offsetHeight || 0
	}
}

function willReachBottom(totalNumber: number, scrollTop: number) {
	// total height
	const totalHeight = itemHeight * totalNumber
	return scrollTop + variableHeight >= totalHeight - variableHeight
}

function getScrollSize() {
	return Math.ceil(variableHeight / itemHeight)
}

function getneedLoadNumber(scrollTop: number): number {
	const pageSize = getScrollSize()
	return (Math.ceil(scrollTop / variableHeight) + 2) * pageSize
}

function getWillLoadData<T>(finishLoadDataNumber: number, scrollTop: number, totalData: T[]) {
	const totalNumber = totalData.length
	const needLoadNumber = getneedLoadNumber(scrollTop)
	if (needLoadNumber >= totalNumber) {
		isFinishLoadData = true
		return totalData.slice(finishLoadDataNumber)
	}
	return totalData.slice(finishLoadDataNumber, needLoadNumber)
}
