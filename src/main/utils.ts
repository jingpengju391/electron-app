import { screen } from 'electron'

export const isMac = process.platform === 'darwin'

export const isWin = process.platform === 'win32'

export const isLinux = process.platform === 'linux'

export const isDev = process.env.NODE_ENV === 'development'

export function getScreenSize(){
    const { size, scaleFactor } = screen.getPrimaryDisplay()
    return {
        width: size.width * scaleFactor,
        height: size.height * scaleFactor
    }
}