import type { BrowserWindow } from 'electron'
import { shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { initializeDBService } from './modules/initializeDBService'
import { ModelWindowType } from '@shared/dataModelTypes/windows'
import { createWindow } from './createWindow'
import { getScreenSize } from './utils'

export const windows: ModelWindowType | {} = {}

export const loadingWindow = {
    url: '../../public/loading.html',
    options: {
        width: 200, 
        height: 200,
        show: false,
        frame: false,
        transparent: true
    },
    callback: async (loadingWindow: BrowserWindow) => {
        loadingWindow.on('ready-to-show', () => {
            loadingWindow.show()
        })

        windows[ModelWindowType.loadingWindow] = loadingWindow
    }
}

export const shotWindow = {
    url: '../../src/renderer/index.html#showChart',
    options: {
        x: 0,
        y: 0,
        show: false,
        frame: false,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js')
        }
    },
    callback: async (shotWindow: BrowserWindow) => {
        shotWindow.on('ready-to-show', () => {
            const { width, height } = getScreenSize()
            shotWindow.setSize(width* 0.5, height* 0.5);
            shotWindow.show()
        })

        windows[ModelWindowType.shotWindow] = shotWindow
    }
}

export const mainWindow = {
    url: '../renderer/index.html',
    options: {
        width: 1400,
        height: 800,
        show: false,
        frame: false,
        transparent: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            enabbleRemoteModule:true,
        }
    },
    callback: async (mainWindow: BrowserWindow) => {
        await initializeDBService()

        mainWindow.minimize()

        mainWindow.setMinimumSize(800, 600)

        mainWindow.once("ready-to-show", () => {
            windows[ModelWindowType.loadingWindow]?.hide()
            windows[ModelWindowType.loadingWindow]?.close()
            mainWindow.show()
            const { url: shotUrl, options: shotOptions, callback: shotCallback } = shotWindow
            setTimeout(() => {
                createWindow(shotUrl, shotOptions, shotCallback, true, true, '/#/showChart')
            },1000)
         
        })

        mainWindow.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url)
            return { action: 'deny' }
        })

        mainWindow.on('resize', () => {  
            mainWindow.webContents.send('window-change-resize')
        })

        windows[ModelWindowType.mainWindow] = mainWindow
    }
}