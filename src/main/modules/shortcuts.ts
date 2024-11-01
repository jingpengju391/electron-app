import { globalShortcut } from 'electron'
import keyCode from '@shared/dataModelConfig/keyCode'
import { getModelWindow } from '../configWindows'
import { ModelWindowKey } from '@shared/dataModelTypes/windows'

export function registerRenderProcessShortcutsHandlers() {
	globalShortcut.register(`${keyCode.COMMAND_OR_CONTROL}+${keyCode.SHIFT}+X`, () => {
		const window = getModelWindow(ModelWindowKey.mainWindow)
		window?.webContents.send('shotcuts-control-shift-x')
	})
}

export function unregisterRenderProcessShortcutsHandlers() {
	globalShortcut.unregisterAll()
}
