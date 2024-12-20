import { ipcRenderer } from 'electron'
import type { Api, ScreenData } from '@shared/dataModelTypes/api'

// Custom APIs for renderer
const api: Api = {
	isMac: process.platform === 'darwin',
	isDev: process.platform === 'win32',
	isLinux: process.platform === 'linux',
	isWin: process.env.NODE_ENV === 'development',

	db: {
		saveDb: () => ipcRenderer.invoke('db:insert'),
		queryDb: (id: number) => ipcRenderer.invoke('db:query', id)
	},
	process: {
		close: () => ipcRenderer.invoke('process:close'),
		restore: () => ipcRenderer.invoke('process:restore'),
		minimize: () => ipcRenderer.invoke('process:minimize'),
		maximize: () => ipcRenderer.invoke('process:maximize'),
		desktopCapturer: () => ipcRenderer.invoke('process:desktopCapturer'),
		screenshot: (params: ScreenData) => ipcRenderer.invoke('process:screenshot', params),
		closeScreenshotWindow: () => ipcRenderer.invoke('process:closeScreenshotWindow'),
		screenshotImage: (params: ScreenData) => ipcRenderer.invoke('process:screenshot-image', params),
		uploadPartialDischargeListData: (params: string) => ipcRenderer.invoke('process:uploadPartialDischargeListData', params)
	}
}

export default api
