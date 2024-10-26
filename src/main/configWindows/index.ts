import type { BrowserWindow } from 'electron'
import { ModelWindowKey } from '@shared/dataModelTypes/windows'

export * from './main'
export * from './shot'
export * from './loading'

const windows = new Map<ModelWindowKey, BrowserWindow>()

export function addWinodws(label: ModelWindowKey, value: BrowserWindow) {
    windows.set(label, value)
}

export function getWinodws(label: ModelWindowKey): BrowserWindow | undefined {
    return windows.get(label)
}
