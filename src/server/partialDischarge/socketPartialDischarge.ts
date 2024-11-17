import { PointPartialDischargeList, PointPartialDischarge } from '@shared/dataModelTypes/partialDischarge'
import { ModelWindowKey } from '@shared/dataModelTypes/windows'
import { send2Client } from '../../service/socket'

// receive data about dms or ec from socket server
export function receivePartialDischargeListData(data: PointPartialDischargeList) {
	const window = global.modelWindow.get(ModelWindowKey.mainWindow)
	window?.webContents.send('receive-partial-discharge-list', data)
}

// update data about dms or ec for socket server
export function updatePartialDischargeListData(data: PointPartialDischarge) {
	send2Client(data)
}

// update server connect status
export function updateConnectServer(isConnectServer: boolean) {
	const window = global.modelWindow.get(ModelWindowKey.mainWindow)
	window?.webContents.send('socket-connect-server-status', isConnectServer)
}
