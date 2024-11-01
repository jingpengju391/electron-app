import { PointPartialDischargeList, PointPartialDischarge } from '@shared/dataModelTypes/partialDischarge'
import { ModelWindowKey } from '@shared/dataModelTypes/windows'

// receive data about dms or ec from socket server
export function receivePartialDischargeListData(data: PointPartialDischargeList) {
	data = [
		{
			workName: '1111',
			detectMethod: 1,
			detectMethodCn: '特高频局放',
			detectPositionName: '部件1',
			deviceName: '111GIS设备A相',
			deviceType: '2',
			deviceTypeName: 'GIS',
			dispatchNumber: 111,
			groupId: '552626862774366208',
			orderNumber: 1,
			status: 2,
			subWorkId: '557003757213265920',
			userId: '542475062138187776',
			voltageLevel: '220kV',
			workId: '557003552426373120',
			workDetailId: '1',
			detectPositionId: 'ss',
			deviceId: '',
			blockName: '',
			routeType: 0,
			reasonNotDetect: '2s'
		},
		{
			workName: '2222',
			detectMethod: 1,
			detectMethodCn: '特高频局放2222',
			detectPositionName: '部件1',
			deviceName: '111GIS设备A相',
			deviceType: '90990',
			deviceTypeName: 'GIS',
			dispatchNumber: 111,
			groupId: '552626862774366208',
			orderNumber: 1,
			status: 0,
			subWorkId: '557003757213265920',
			userId: '542475062138187776',
			voltageLevel: '220kV',
			workId: '557003552426373120',
			workDetailId: '2',
			detectPositionId: 'ss',
			deviceId: '',
			blockName: '',
			routeType: 0,
			reasonNotDetect: '2s'
		}
	]
	const window = global.modelWindow.get(ModelWindowKey.mainWindow)
	window?.webContents.send('receive-partial-discharge-list', data)
}

// update data about dms or ec for socket server
export function uploadPartialDischargeListData(data: PointPartialDischarge) {
	console.log(data, 'start upload')
}

// update server connect status
export function updateConnectServer(isConnectServer: boolean) {
	const window = global.modelWindow.get(ModelWindowKey.mainWindow)
	window?.webContents.send('socket-connect-server-status', isConnectServer)
}
