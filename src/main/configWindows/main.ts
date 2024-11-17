import { ModelWindowKey, WindowConfig } from '@shared/dataModelTypes/windows'
import { join } from 'path'
import { shell } from 'electron'
import { getScreenSize, isMac } from '../utils'
import icon from '../../../resources/icon.png?asset'
import initDefaultWorkspace from '../modules/initDataBeforeCreateWindow'
import { getModelWindow } from '.'

export function mainWindow(): WindowConfig {
	const { width, height } = getScreenSize()
	const w = Math.floor(width * 0.7)
	const h = Math.floor(height * 0.7)
	return {
		sign: ModelWindowKey.mainWindow,
		loadURL: process.env['ELECTRON_RENDERER_URL'],
		loadFile: join(__dirname, '../renderer/index.html'),
		options: {
			width: w,
			height: h,
			show: false,
			frame: isMac,
			autoHideMenuBar: true,
			...(process.platform === 'linux' ? { icon } : {}),
			webPreferences: {
				preload: join(__dirname, '../preload/index.js'),
				sandbox: false
			}
		},
		callback: async (focusedWindow) => {
			await initDefaultWorkspace()

			focusedWindow.setMinimumSize(w, h)

			focusedWindow.once('ready-to-show', () => {
				const loadingWindow = getModelWindow(ModelWindowKey.loadingWindow)
				loadingWindow?.hide()
				loadingWindow?.close()
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
