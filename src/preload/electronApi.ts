import { ElectronApi } from '@shared/index'
import { ipcRenderer } from 'electron'

const electronApi: ElectronApi = {
	send: (channel, data) => {
		ipcRenderer.send(channel, data)
	},
	receive: (channel, func) => {
		ipcRenderer.on(channel, (_event, ...args) => func(...args))
	}
}

export default electronApi
