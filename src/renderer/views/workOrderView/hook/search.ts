import { ref } from 'vue'
import { OrderSelectOption } from '@shared'
import { FilterOrder, PointPartialDischargeList } from '@shared/dataModelTypes/partialDischarge'

export const searchTypeOption = ref<OrderSelectOption[]>([])
export const searchLevelOption = ref<OrderSelectOption[]>([])
export const searchStatusOption = ref<OrderSelectOption[]>([
	{
		label: '待上传',
		value: 0
	},
	{
		label: '已完成',
		value: 1
	}
])

export function handlerSearchOptionByPointPartialDischargeList(data: PointPartialDischargeList) {
	searchTypeOption.value.length = 0
	const optionMap = new Map<FilterOrder, Map<string, boolean>>([
		[FilterOrder.deviceType, new Map<string, boolean>()],
		[FilterOrder.voltageLevel, new Map<string, boolean>()]
	])
	for (const iterator of data) {
		if (!optionMap.get(FilterOrder.deviceType)?.get(iterator[FilterOrder.deviceType])) {
			optionMap.get(FilterOrder.deviceType)?.set(iterator[FilterOrder.deviceType], true)
			searchTypeOption.value.push({
				label: iterator.deviceName,
				value: iterator[FilterOrder.deviceType]
			})
		}
	}
}
