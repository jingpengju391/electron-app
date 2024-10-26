
import { BrowserWindow } from 'electron'
import type { BrowserWindowConstructorOptions } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { isDev } from './utils'

export async function createWindow(url: string, option: BrowserWindowConstructorOptions, callback: (...args: any[]) => Promise<void>, isOpenDevTools: boolean = false, isLoading: boolean = false, routePath: string = '') {
    const focusedWindow = new BrowserWindow(option)
    await callback(focusedWindow)

    if(isLoading){
        focusedWindow.loadFile(join(__dirname, url))
        focusedWindow.once("ready-to-show", () => isOpenDevTools && openDevTools(focusedWindow))
        return
    }
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && !!process.env['ELECTRON_RENDERER_URL']) {
        focusedWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + routePath)
    } else {
        console.log(33334444)
        focusedWindow.loadFile(join(__dirname, url))
    }

    focusedWindow.once("ready-to-show", () => isOpenDevTools && openDevTools(focusedWindow))
}

function openDevTools(focusedWindow: BrowserWindow) {
    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    // code: -32601 about Autofill.enable wasn't found
    // see https://github.com/electron/electron/issues/41614#issuecomment-2006678760
    (isDev || import.meta.env.MODE === 'test') &&
    focusedWindow.webContents.openDevTools({ mode: 'right' })
}