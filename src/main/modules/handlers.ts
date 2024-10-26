import { ipcMain, app } from 'electron'
import { insertToDB, handleFromDb } from '@server'
import { getWinodws } from '../configWindows'
import { getDesktopCapturer, showScreenshotWindow, closeScreenshotWindow } from './screenshot'
import { ModelWindowKey } from '@shared/dataModelTypes/windows'

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
        const window = getWinodws(ModelWindowKey.mainWindow)
        window?.setFullScreen(false)
        window?.minimize()
    })
    ipcMain.handle('process:maximize', () => {
        const window = getWinodws(ModelWindowKey.mainWindow)
        window?.maximize()
        window?.setFullScreen(true)
    })

    ipcMain.handle('process:restore', () => {
        const window = getWinodws(ModelWindowKey.mainWindow)
        window?.setFullScreen(false)
        window?.restore()
    })
    ipcMain.handle('process:desktopCapturer', async () => {
        return await getDesktopCapturer()
    })
    ipcMain.handle('process:screenshot', async (_event, isOpen: boolean) => {
        isOpen ? showScreenshotWindow() : closeScreenshotWindow()
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

export function registerRenderCreateWindowMessageHandler() {}

export function unregisterRenderCreateWindowMessageHandler() {}
