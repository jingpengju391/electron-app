import { screen } from 'electron'

export const isMac = process.platform === 'darwin'

export const isWin = process.platform === 'win32'

export const isLinux = process.platform === 'linux'

export const isDev = process.env.NODE_ENV === 'development'

export function getScreenSize(){
    const primaryDisplay = screen.getPrimaryDisplay()
    return  primaryDisplay.workAreaSize
}