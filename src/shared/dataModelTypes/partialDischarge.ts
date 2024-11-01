export type PointPartialDischarge = {
	workName: string
	workId: string
	subWorkId: string
	workDetailId: string
	userId: string
	detectPositionId: string
	groupId: string
	detectMethod: number
	detectMethodCn: string
	deviceType: string
	deviceTypeName: string
	voltageLevel: string
	detectPositionName: string
	orderNumber: number
	deviceId: string
	deviceName: string
	dispatchNumber: number
	blockName: string
	routeType: number
	status: number
	reasonNotDetect: string
	files?: string[]
	file?: string
}

export type PointPartialDischargeList = PointPartialDischarge[]

export enum FilterOrder {
	deviceType = 'deviceType',
	voltageLevel = 'voltageLevel'
}
