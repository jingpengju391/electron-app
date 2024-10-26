import { ipcMain, app } from 'electron'
import { insertToDB, handleFromDb } from '@server'
import { windows } from './config'
import getDesktopCapturer from './modules/desktopCapturer'
import { ModelWindowType } from '@shared/dataModelTypes/windows'

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
    ModelWindowType
    ipcMain.handle('process:minimize', () => {
        windows[ModelWindowType.mainWindow]?.setFullScreen(false)
        windows[ModelWindowType.mainWindow]?.minimize()
    })
    ipcMain.handle('process:maximize', () => {
        windows[ModelWindowType.mainWindow]?.maximize()
        windows[ModelWindowType.mainWindow]?.setFullScreen(true)
    })

    ipcMain.handle('process:restore', () => {
        windows[ModelWindowType.mainWindow]?.setFullScreen(false)
        windows[ModelWindowType.mainWindow]?.restore()
    })
    ipcMain.handle('process:desktopCapturer', async (_event) => {
        return await getDesktopCapturer()
    })
}
  
export function unregisterRenderProcessMessageHandlers() {
    ipcMain.removeHandler('process:close')
    ipcMain.removeHandler('process:restore')
    ipcMain.removeHandler('process:minimize')
    ipcMain.removeHandler('process:maximize')
    ipcMain.removeHandler('process:desktopCapturer')
}

export function registerRenderCreateWindowMessageHandler() {

}
  
export function unregisterRenderCreateWindowMessageHandler() {

}