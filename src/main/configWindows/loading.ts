import { ModelWindowKey, WindowConfig } from '@shared/dataModelTypes/windows'
import { join } from 'path'

export function loadingWindow(): WindowConfig {
    return {
        sign: ModelWindowKey.loadingWindow,
        loadFile: join(__dirname, '../../public/loading.html'),
        options: {
            width: 200,
            height: 200,
            show: false,
            frame: false,
            transparent: true
        },
        isOpenDevTools: false,
        callback: async (focusedWindow) => {
            focusedWindow.on('ready-to-show', () => {
                focusedWindow.show()
            })
        }
    }
}
