export type Api = {
    isMac: boolean
    isDev: boolean
    isLinux: boolean
    isWin: boolean
    db: {
        saveDb: () => Promise<void>
        queryDb: (id: number) => Promise<void>
    }
    process: {
        close: () => Promise<void>
        restore: () => Promise<void>
        minimize: () => Promise<void>
        maximize: () => Promise<void>
        desktopCapturer: () => Promise<string>
    }
}

export type ElectronApi = {
    send: (channel: string, data: any) => void
    receive: (channel: string, data: any) => void
}