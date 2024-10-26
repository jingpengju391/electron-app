import { ModelWindowKey, WindowConfig } from "@shared/dataModelTypes/windows"
import { join } from 'path'
import { shell } from 'electron'
import { getScreenSize } from "../utils"
import icon from '../../../resources/icon.png?asset'

export function mainWindow(): WindowConfig{
    const { width, height } = getScreenSize()
    return {
        sign: ModelWindowKey.mainWindow,
        loadURL: process.env['ELECTRON_RENDERER_URL'],
        loadFile: join(__dirname, '../../renderer/index.html'),
        options: {
            width: width * 0.6,
            height: height * 0.6,
            show: false,
            autoHideMenuBar: true,
            ...(process.platform === 'linux' ? { icon } : {}),
            webPreferences: {
              preload: join(__dirname, '../preload/index.js'),
              sandbox: false
            }
        },
        callback: async focusedWindow => {
            focusedWindow.setMinimumSize(800, 600)
            focusedWindow.once("ready-to-show", () => {
                focusedWindow.show()
            })
    
            focusedWindow.webContents.setWindowOpenHandler((details) => {
                shell.openExternal(details.url)
                return { action: 'deny' }
            })
    
            focusedWindow.on('resize', () => {  
                focusedWindow.webContents.send('window-change-resize')
            })
        }
    }
}