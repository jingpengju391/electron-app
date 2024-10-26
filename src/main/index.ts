import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow } from './modules'
import { mainWindow, shotWindow } from './configWindows'
import {
    registerRenderMessageHandlers, unregisterRenderMessageHandlers, registerRenderProcessMessageHandlers, 
    unregisterRenderProcessMessageHandlers, registerRenderCreateWindowMessageHandler, unregisterRenderCreateWindowMessageHandler
} from './modules'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    // register all IPC handlers
    registerAllRenderMessageHandlers()

    await createWindow(mainWindow())
    await createWindow(shotWindow())

    app.on('activate', async function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        BrowserWindow.getAllWindows().length === 0 && 
        await createWindow(mainWindow()) && 
        await createWindow(shotWindow())
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    // unregister all IPC handlers
    unregisterAllRenderMessageHandlers
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// all ipcs register in here when window is open
// include message, process, create window
function registerAllRenderMessageHandlers() {
    registerRenderMessageHandlers()
    registerRenderProcessMessageHandlers()
    registerRenderCreateWindowMessageHandler()
}

// all ipcs unregister in here when window is closed
// include message, process, create window
function unregisterAllRenderMessageHandlers() {
    unregisterRenderMessageHandlers()
    unregisterRenderProcessMessageHandlers()
    unregisterRenderCreateWindowMessageHandler()
}