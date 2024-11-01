import type { BrowserWindow } from 'electron'
import { ModelWindowKey } from '@shared/dataModelTypes/windows'

export * from './main'
export * from './shot'
export * from './loading'

export function addWinodws(label: ModelWindowKey, value: BrowserWindow) {
	global.modelWindow = global.modelWindow || new Map<ModelWindowKey, BrowserWindow>()
	global.modelWindow.set(label, value)
}

export function getModelWindow(label: ModelWindowKey): BrowserWindow | undefined {
	return global?.modelWindow.get(label)
}
