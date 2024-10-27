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
        screenshot: (isOpen: boolean) => Promise<void>
    }
}

export type ElectronApi = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send: (channel: string, data: any) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    receive: (channel: string, data: any) => void
}
