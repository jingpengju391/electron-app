export type PointPartialDischarge = {
	workName: string
	workId: string
	subWorkId: string
	subWorkName: string
	partId: string
	partName: string
	deviceName: string
	type: string
	deviceType: string
	files?: string[]
	file?: string
}

export type PointPartialDischargeList = PointPartialDischarge[]

export enum FilterOrder {
	deviceType = 'type',
	voltageLevel = 'voltageLevel'
}
