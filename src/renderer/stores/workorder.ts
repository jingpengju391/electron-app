import { PointPartialDischarge, PointPartialDischargeList } from '@shared/dataModelTypes/partialDischarge'
import { defineStore } from 'pinia'

interface State {
	partialDischargeList: PointPartialDischargeList
	currentPartialDischarge: PointPartialDischarge | undefined
	filterName: string | undefined
	filterType: string | undefined
	filterLevel: string | undefined
	filterStuts: number | undefined
	isConnectServer: boolean
}

export const useWorkOrder = defineStore('workorder', {
	state: (): State => ({
		partialDischargeList: [],
		currentPartialDischarge: undefined,
		filterName: undefined,
		filterType: undefined,
		filterLevel: undefined,
		filterStuts: undefined,
		isConnectServer: false
	}),
	getters: {
		checkprogress: (state): number => {
			return state.partialDischargeList.filter((item) => item.files?.length).length
		},
		filterPartialDischargeList(state): PointPartialDischargeList {
			return state.partialDischargeList.filter((item) => {
				return (
					(!state.filterName || item.deviceName.indexOf(state.filterName) >= 0) &&
					(!state.filterType || item.type === state.filterType) &&
					// (!state.filterLevel || item.voltageLevel === state.filterLevel) &&
					((!state.filterStuts && state.filterStuts !== 0) || !!state.filterStuts === !!item.files?.length)
				)
			})
		}
	},
	actions: {
		resetState() {
			this.$patch({
				partialDischargeList: [],
				currentPartialDischarge: undefined,
				filterName: undefined,
				filterType: undefined,
				filterLevel: undefined,
				filterStuts: undefined,
				isConnectServer: false
			})
		},
		updatedPartialDischargeList(partialDischargeList: PointPartialDischargeList): void {
			this.$patch({ partialDischargeList })
		},
		updatedPartialDischargeListByCurrentPartialDischarge(currentPartialDischarge: PointPartialDischarge): void {
			const findIndex = this.partialDischargeList.findIndex((item) => item.partId === currentPartialDischarge?.partId)
			const partialDischargeList = this.partialDischargeList
			partialDischargeList[findIndex] = currentPartialDischarge
			this.$patch({ partialDischargeList })
		},
		updatedCurrentPartialDischarge(currentPartialDischarge: PointPartialDischarge | undefined): void {
			this.$patch({ currentPartialDischarge })
			currentPartialDischarge && this.updatedPartialDischargeListByCurrentPartialDischarge(currentPartialDischarge!)
		},
		updatedFilterName(filterName: string | undefined): void {
			this.$patch({ filterName })
		},
		updatedFilterType(filterType: string | undefined): void {
			this.$patch({ filterType })
		},
		updatedFilterLevel(filterLevel: string | undefined): void {
			this.$patch({ filterLevel })
		},
		updatedFilterStatus(filterStuts: number | undefined): void {
			this.$patch({ filterStuts })
		},
		updatedFilter(filter: { filterName: string | undefined; filterType: string | undefined; filterStuts: number | undefined }): void {
			this.$patch({ ...filter })
		},
		updatedIsConnectServer(isConnectServer: boolean): void {
			this.$patch({ isConnectServer })
			!isConnectServer && this.resetState()
		}
	}
})
