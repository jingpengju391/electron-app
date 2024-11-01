import { ipcMain, app } from 'electron'
import { insertToDB, handleFromDb } from '@server'
import { getModelWindow } from '../configWindows'
import { getDesktopCapturer, showScreenshotWindow, closeScreenshotWindow } from './screenshot'
import { ModelWindowKey } from '@shared/dataModelTypes/windows'
import { ScreenData } from '@shared/index'
import { PointPartialDischarge } from '@shared/dataModelTypes/partialDischarge'
import { uploadPartialDischargeListData } from '@server/partialDischarge/socketPartialDischarge'

export function registerRenderMessageHandlers() {
	ipcMain.handle('db:insert', insertToDB)
	ipcMain.handle('db:query', handleFromDb)
}

export function unregisterRenderMessageHandlers() {
	ipcMain.removeHandler('db:insert')
	ipcMain.removeHandler('db:query')
}

export function registerRenderProcessMessageHandlers() {
	ipcMain.handle('process:close', () => app.quit())
	ipcMain.handle('process:minimize', () => {
		const window = getModelWindow(ModelWindowKey.mainWindow)
		window?.setFullScreen(false)
		window?.minimize()
	})
	ipcMain.handle('process:maximize', () => {
		const window = getModelWindow(ModelWindowKey.mainWindow)
		window?.maximize()
		window?.setFullScreen(true)
	})

	ipcMain.handle('process:restore', () => {
		const window = getModelWindow(ModelWindowKey.mainWindow)
		window?.setFullScreen(false)
		window?.restore()
	})
	ipcMain.handle('process:desktopCapturer', async () => {
		return await getDesktopCapturer()
	})
	ipcMain.handle('process:screenshot', async (_event, params: ScreenData) => {
		const window = getModelWindow(ModelWindowKey.shotWindow)
		window?.webContents.send('window-shot-param', params)
		params.screenshotStatus ? showScreenshotWindow() : closeScreenshotWindow()
		return params
	})
	ipcMain.handle('process:screenshot-image', async (_event, params: ScreenData) => {
		const window = getModelWindow(ModelWindowKey.mainWindow)
		window?.webContents.send('window-shot-param-params', params)
		return params
	})
	ipcMain.handle('process:uploadPartialDischargeListData', async (_event, params: string) => {
		const partialDischarge = JSON.parse(params) as PointPartialDischarge
		await uploadPartialDischargeListData(partialDischarge)
	})
}

export function unregisterRenderProcessMessageHandlers() {
	ipcMain.removeHandler('process:close')
	ipcMain.removeHandler('process:restore')
	ipcMain.removeHandler('process:minimize')
	ipcMain.removeHandler('process:maximize')
	ipcMain.removeHandler('process:desktopCapturer')
	ipcMain.removeHandler('process:screenshot')
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function registerRenderCreateWindowMessageHandler() {}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function unregisterRenderCreateWindowMessageHandler() {}
